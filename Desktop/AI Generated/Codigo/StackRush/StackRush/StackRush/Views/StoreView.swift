import SwiftUI

struct StoreView: View {
    @EnvironmentObject var gameState: GameState
    @StateObject private var storeManager = StoreManager.shared
    @Environment(\.dismiss) private var dismiss
    @State private var selectedCategory: StoreItemType = .colorTheme
    @State private var showPurchaseSuccess = false
    @State private var purchasedItem: StoreItem?
    @State private var showThemeChangeAlert = false
    
    var body: some View {
        NavigationView {
            storeContent
        }
        .navigationViewStyle(StackNavigationViewStyle())
        .alert("Success!", isPresented: $showPurchaseSuccess) {
            Button("OK") { }
        } message: {
            if let item = purchasedItem {
                if item.type == .powerUp {
                    Text("You used \(item.name)! Check your active power-ups during gameplay.")
                } else {
                    Text("You bought \(item.name)! It's now equipped and ready to use.")
                }
            }
        }
        .alert("Theme Changed", isPresented: $showThemeChangeAlert) {
            Button("OK") { }
        } message: {
            Text("Your new theme has been applied! Some visual changes may require restarting the app to fully take effect.")
        }
        .onReceive(NotificationCenter.default.publisher(for: NSNotification.Name("ColorThemeChanged"))) { _ in
            showThemeChangeAlert = true
        }
    }
    
    private var storeContent: some View {
        ZStack {
                // Background
                DesignSystem.Colors.backgroundPrimary
                    .ignoresSafeArea()
                
                VStack(spacing: 0) {
                    // Header with coins
                    HStack {
                        VStack(alignment: .leading, spacing: 4) {
                            Text("ARCADE STORE")
                                .font(DesignSystem.Typography.displayMedium(weight: .bold))
                                .foregroundStyle(
                                    LinearGradient(
                                        gradient: Gradient(colors: [
                                            DesignSystem.Colors.brandTeal,
                                            DesignSystem.Colors.accentCyan
                                        ]),
                                        startPoint: .leading,
                                        endPoint: .trailing
                                    )
                                )
                        }
                        
                        Spacer()
                        
                        // Coins display
                        HStack(spacing: DesignSystem.Spacing.xs) {
                            Image(systemName: "dollarsign.circle.fill")
                                .font(.system(size: 24, weight: .bold))
                                .foregroundColor(DesignSystem.Colors.brandTeal)
                            
                            Text("\(gameState.coinsManager.coinBalance)")
                                .font(DesignSystem.Typography.bodyLarge(weight: .bold))
                                .foregroundColor(DesignSystem.Colors.textPrimary)
                        }
                        .padding(.horizontal, 16)
                        .padding(.vertical, 8)
                        .background(
                            RoundedRectangle(cornerRadius: DesignSystem.Radius.medium)
                                .fill(Color.black.opacity(0.5))
                                .overlay(
                                    RoundedRectangle(cornerRadius: DesignSystem.Radius.medium)
                                        .stroke(DesignSystem.Colors.brandTeal, lineWidth: 1)
                                )
                        )
                    }
                    .padding(.horizontal, DesignSystem.Spacing.lg)
                    .padding(.top, DesignSystem.Spacing.md)
                    
                    // Category selector
                    HStack(spacing: DesignSystem.Spacing.sm) {
                        ForEach(StoreItemType.allCases, id: \.self) { category in
                            Button(action: {
                                selectedCategory = category
                                SoundManager.shared.playButtonTapSound()
                            }) {
                                HStack(spacing: DesignSystem.Spacing.xs) {
                                    Image(systemName: category.icon)
                                        .font(.system(size: 14, weight: .semibold))
                                    Text(category.rawValue)
                                        .font(DesignSystem.Typography.bodySmall(weight: .semibold))
                                }
                                .foregroundColor(selectedCategory == category ? .black : DesignSystem.Colors.textPrimary)
                                .padding(.horizontal, 12)
                                .padding(.vertical, 8)
                                .background(
                                    selectedCategory == category ?
                                    LinearGradient(
                                        gradient: Gradient(colors: [
                                            DesignSystem.Colors.brandTeal,
                                            DesignSystem.Colors.accentCyan
                                        ]),
                                        startPoint: .top,
                                        endPoint: .bottom
                                    ) :
                                    LinearGradient(
                                        gradient: Gradient(colors: [Color.clear]),
                                        startPoint: .top,
                                        endPoint: .bottom
                                    )
                                )
                                .overlay(
                                    RoundedRectangle(cornerRadius: DesignSystem.Radius.small)
                                        .stroke(selectedCategory == category ? Color.clear : DesignSystem.Colors.textTertiary.opacity(0.3), lineWidth: 1)
                                )
                                .clipShape(RoundedRectangle(cornerRadius: DesignSystem.Radius.small))
                            }
                        }
                    }
                    .padding(.horizontal, DesignSystem.Spacing.lg)
                    .padding(.vertical, DesignSystem.Spacing.md)
                    
                    // Items grid
                    ScrollView {
                        LazyVGrid(columns: [
                            GridItem(.flexible()),
                            GridItem(.flexible())
                        ], spacing: DesignSystem.Spacing.md) {
                            ForEach(itemsForSelectedCategory) { item in
                                StoreItemCard(
                                    item: item,
                                    isOwned: storeManager.isOwned(item.itemId),
                                    isSelected: isItemSelected(item),
                                    onPurchase: {
                                        if storeManager.purchaseItem(item) {
                                            purchasedItem = item
                                            showPurchaseSuccess = true
                                            SoundManager.shared.playButtonTapSound()
                                        }
                                    },
                                    onSelect: {
                                        selectItem(item)
                                        SoundManager.shared.playButtonTapSound()
                                    }
                                )
                            }
                        }
                        .padding(.horizontal, DesignSystem.Spacing.lg)
                        .padding(.bottom, DesignSystem.Spacing.xl)
                    }
                }
            }
            .navigationBarHidden(true)
            .overlay(
                // Close button
                VStack {
                    HStack {
                        Spacer()
                        Button(action: { dismiss() }) {
                            Image(systemName: "xmark.circle.fill")
                                .font(.system(size: 30))
                                .foregroundColor(DesignSystem.Colors.textTertiary)
                                .background(Circle().fill(Color.black.opacity(0.5)))
                        }
                        .padding(.trailing, DesignSystem.Spacing.lg)
                        .padding(.top, DesignSystem.Spacing.md)
                    }
                    Spacer()
                }
            )
    }
    
    private var itemsForSelectedCategory: [StoreItem] {
        switch selectedCategory {
        case .colorTheme:
            return storeManager.colorThemeItems
        case .soundPack:
            return storeManager.soundPackItems
        case .powerUp:
            return storeManager.powerUpItems
        }
    }
    
    private func isItemSelected(_ item: StoreItem) -> Bool {
        switch item.type {
        case .colorTheme:
            return storeManager.selectedColorTheme.id == item.itemId
        case .soundPack:
            return storeManager.selectedSoundPack.id == item.itemId
        case .powerUp:
            return false // Power-ups are consumable, not selectable
        }
    }
    
    private func selectItem(_ item: StoreItem) {
        switch item.type {
        case .colorTheme:
            if let theme = ColorTheme.allCases.first(where: { $0.id == item.itemId }) {
                storeManager.setSelectedColorTheme(theme)
            }
        case .soundPack:
            if let pack = SoundPack.allCases.first(where: { $0.id == item.itemId }) {
                storeManager.setSelectedSoundPack(pack)
            }
        case .powerUp:
            // Use power-up from inventory
            if let powerUp = PowerUp.allCases.first(where: { $0.id == item.itemId }) {
                if InventoryManager.shared.usePowerUp(powerUp) {
                    // Show usage feedback
                    showPowerUpUsage(powerUp)
                }
            }
        }
    }
    
    private func showPowerUpUsage(_ powerUp: PowerUp) {
        // You can add usage feedback here
        // For now, we'll just show a success message
        purchasedItem = StoreItem.powerUpItem(powerUp)
        showPurchaseSuccess = true
    }
}

struct StoreItemCard: View {
    let item: StoreItem
    let isOwned: Bool
    let isSelected: Bool
    let onPurchase: () -> Void
    let onSelect: () -> Void
    
    @StateObject private var inventoryManager = InventoryManager.shared
    
    var body: some View {
        VStack(spacing: DesignSystem.Spacing.sm) {
            // Icon
            ZStack {
                Circle()
                    .fill(
                        LinearGradient(
                            gradient: Gradient(colors: [
                                DesignSystem.Colors.brandTeal.opacity(0.3),
                                DesignSystem.Colors.accentCyan.opacity(0.3)
                            ]),
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .frame(width: 60, height: 60)
                
                Image(systemName: item.icon)
                    .font(.system(size: 24, weight: .bold))
                    .foregroundColor(isSelected ? DesignSystem.Colors.brandTeal : DesignSystem.Colors.textPrimary)
            }
            
            // Name and description
            VStack(spacing: 4) {
                HStack {
                    Text(item.name)
                        .font(DesignSystem.Typography.bodyMedium(weight: .bold))
                        .foregroundColor(DesignSystem.Colors.textPrimary)
                        .multilineTextAlignment(.center)
                    
                    // Show inventory count for power-ups
                    if item.type == .powerUp {
                        let powerUp = PowerUp.allCases.first { $0.id == item.itemId }
                        let count = powerUp.map { inventoryManager.getPowerUpCount($0) } ?? 0
                        
                        if count > 0 {
                            Text("×\(count)")
                                .font(DesignSystem.Typography.bodySmall(weight: .bold))
                                .foregroundColor(DesignSystem.Colors.brandTeal)
                                .padding(.horizontal, 6)
                                .padding(.vertical, 2)
                                .background(
                                    RoundedRectangle(cornerRadius: 8)
                                        .fill(DesignSystem.Colors.brandTeal.opacity(0.2))
                                )
                        }
                    }
                }
                
                Text(item.description)
                    .font(DesignSystem.Typography.bodySmall(weight: .medium))
                    .foregroundColor(DesignSystem.Colors.textSecondary)
                    .multilineTextAlignment(.center)
                    .lineLimit(2)
            }
            
            // Action button
            if item.type == .powerUp {
                // Power-ups show inventory count and purchase button
                let powerUp = PowerUp.allCases.first { $0.id == item.itemId }
                let count = powerUp.map { inventoryManager.getPowerUpCount($0) } ?? 0
                
                if count > 0 {
                    // Show use button if player has this power-up
                    Button(action: onSelect) {
                        HStack(spacing: 4) {
                            Image(systemName: "bolt.fill")
                                .font(.system(size: 12, weight: .bold))
                            Text("USE")
                                .font(DesignSystem.Typography.bodySmall(weight: .bold))
                        }
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 8)
                        .background(
                            RoundedRectangle(cornerRadius: DesignSystem.Radius.small)
                                .fill(DesignSystem.Colors.brandTeal)
                        )
                    }
                } else {
                    // Show buy button for power-ups
                    Button(action: onPurchase) {
                        HStack(spacing: 4) {
                            Image(systemName: "dollarsign.circle.fill")
                                .font(.system(size: 12, weight: .bold))
                            Text("\(item.price)")
                                .font(DesignSystem.Typography.bodySmall(weight: .bold))
                        }
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 8)
                        .background(
                            RoundedRectangle(cornerRadius: DesignSystem.Radius.small)
                                .fill(CoinsManager.shared.canAfford(item.price) ? DesignSystem.Colors.brandTeal : DesignSystem.Colors.textTertiary)
                        )
                    }
                    .disabled(!CoinsManager.shared.canAfford(item.price))
                }
            } else if isOwned {
                // Themes and sound packs show owned/equipped status
                if isSelected {
                    // Selected themes show equipped
                    HStack(spacing: 4) {
                        Image(systemName: "checkmark.circle.fill")
                            .font(.system(size: 12, weight: .bold))
                        Text("EQUIPPED")
                            .font(DesignSystem.Typography.bodySmall(weight: .bold))
                    }
                    .foregroundColor(DesignSystem.Colors.brandTeal)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 8)
                } else {
                    // Owned but not selected - show select button
                    Button(action: onSelect) {
                        Text("SELECT")
                            .font(DesignSystem.Typography.bodySmall(weight: .bold))
                            .foregroundColor(DesignSystem.Colors.brandTeal)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 8)
                            .background(
                                RoundedRectangle(cornerRadius: DesignSystem.Radius.small)
                                    .stroke(DesignSystem.Colors.brandTeal, lineWidth: 1)
                            )
                    }
                }
            } else {
                // Show purchase button for themes/sound packs (one-time purchase)
                Button(action: onPurchase) {
                    HStack(spacing: 4) {
                        Image(systemName: "dollarsign.circle.fill")
                            .font(.system(size: 12, weight: .bold))
                        Text("\(item.price)")
                            .font(DesignSystem.Typography.bodySmall(weight: .bold))
                    }
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 8)
                    .background(
                        RoundedRectangle(cornerRadius: DesignSystem.Radius.small)
                            .fill(CoinsManager.shared.canAfford(item.price) ? DesignSystem.Colors.brandTeal : DesignSystem.Colors.textTertiary)
                    )
                }
                .disabled(!CoinsManager.shared.canAfford(item.price))
            }
        }
        .padding(DesignSystem.Spacing.md)
        .background(
            RoundedRectangle(cornerRadius: DesignSystem.Radius.medium)
                .fill(Color.black.opacity(0.3))
                .overlay(
                    RoundedRectangle(cornerRadius: DesignSystem.Radius.medium)
                        .stroke(isSelected ? DesignSystem.Colors.brandTeal : DesignSystem.Colors.textTertiary.opacity(0.3), lineWidth: isSelected ? 2 : 1)
                )
        )
    }
}

#Preview {
    StoreView()
        .environmentObject(GameState())
}