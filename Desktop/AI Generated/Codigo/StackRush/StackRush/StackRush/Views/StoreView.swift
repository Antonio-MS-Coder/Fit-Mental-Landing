import SwiftUI

struct StoreView: View {
    @EnvironmentObject var gameState: GameState
    @StateObject private var storeManager = StoreManager.shared
    @Environment(\.dismiss) private var dismiss
    @State private var selectedCategory: StoreItemType = .colorTheme
    @State private var showPurchaseSuccess = false
    @State private var purchasedItem: StoreItem?
    
    var body: some View {
        NavigationView {
            storeContent
        }
        .navigationViewStyle(StackNavigationViewStyle())
        .alert("Purchase Successful!", isPresented: $showPurchaseSuccess) {
            Button("OK") { }
        } message: {
            if let item = purchasedItem {
                Text("You bought \(item.name)! It's now equipped and ready to use.")
            }
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
        guard storeManager.isOwned(item.itemId) else { return }
        
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
            break // Power-ups will be handled differently
        }
    }
}

struct StoreItemCard: View {
    let item: StoreItem
    let isOwned: Bool
    let isSelected: Bool
    let onPurchase: () -> Void
    let onSelect: () -> Void
    
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
                Text(item.name)
                    .font(DesignSystem.Typography.bodyMedium(weight: .bold))
                    .foregroundColor(DesignSystem.Colors.textPrimary)
                    .multilineTextAlignment(.center)
                
                Text(item.description)
                    .font(DesignSystem.Typography.bodySmall(weight: .medium))
                    .foregroundColor(DesignSystem.Colors.textSecondary)
                    .multilineTextAlignment(.center)
                    .lineLimit(2)
            }
            
            // Action button
            if isOwned {
                if item.type == .powerUp {
                    // Power-ups show use button
                    Button(action: onSelect) {
                        Text("USE")
                            .font(DesignSystem.Typography.bodySmall(weight: .bold))
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 8)
                            .background(
                                RoundedRectangle(cornerRadius: DesignSystem.Radius.small)
                                    .fill(DesignSystem.Colors.brandTeal)
                            )
                    }
                } else if isSelected {
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
                // Show purchase button with price
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