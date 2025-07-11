import Foundation
import SwiftUI

enum StoreItemType: String, CaseIterable {
    case colorTheme = "Color Theme"
    case soundPack = "Sound Pack"
    case powerUp = "Power-Up"
    
    var icon: String {
        switch self {
        case .colorTheme: return "paintpalette.fill"
        case .soundPack: return "music.note"
        case .powerUp: return "bolt.fill"
        }
    }
}

enum ColorTheme: String, CaseIterable, Equatable {
    case defaultTheme = "Default"
    case neonPink = "Neon Pink"
    case oceanBlue = "Ocean Blue"
    case sunsetOrange = "Sunset Orange"
    case purpleHaze = "Purple Haze"
    case emeraldGreen = "Emerald Green"
    
    var id: String { rawValue }
    
    var price: Int {
        switch self {
        case .defaultTheme: return 0 // Free default theme
        case .neonPink: return 75
        case .oceanBlue: return 100
        case .sunsetOrange: return 75
        case .purpleHaze: return 125
        case .emeraldGreen: return 100
        }
    }
    
    var colors: ThemeColors {
        switch self {
        case .defaultTheme:
            return ThemeColors(
                brandTeal: Color(hex: "#00D4AA"),
                brandPurple: Color(hex: "#6366F1"),
                accentCyan: Color(hex: "#06B6D4")
            )
        case .neonPink:
            return ThemeColors(
                brandTeal: Color(hex: "#FF1493"),
                brandPurple: Color(hex: "#FF69B4"),
                accentCyan: Color(hex: "#FF20B2")
            )
        case .oceanBlue:
            return ThemeColors(
                brandTeal: Color(hex: "#0077BE"),
                brandPurple: Color(hex: "#003F7F"),
                accentCyan: Color(hex: "#00A8CC")
            )
        case .sunsetOrange:
            return ThemeColors(
                brandTeal: Color(hex: "#FF6B35"),
                brandPurple: Color(hex: "#F7931E"),
                accentCyan: Color(hex: "#FFB700")
            )
        case .purpleHaze:
            return ThemeColors(
                brandTeal: Color(hex: "#8A2BE2"),
                brandPurple: Color(hex: "#4B0082"),
                accentCyan: Color(hex: "#9370DB")
            )
        case .emeraldGreen:
            return ThemeColors(
                brandTeal: Color(hex: "#00C851"),
                brandPurple: Color(hex: "#007E33"),
                accentCyan: Color(hex: "#39FF14")
            )
        }
    }
    
    var description: String {
        switch self {
        case .defaultTheme: return "Classic StackRush colors"
        case .neonPink: return "Electric pink vibes"
        case .oceanBlue: return "Deep ocean depths"
        case .sunsetOrange: return "Warm sunset glow"
        case .purpleHaze: return "Mystical purple energy"
        case .emeraldGreen: return "Nature's green power"
        }
    }
}

struct ThemeColors {
    let brandTeal: Color
    let brandPurple: Color
    let accentCyan: Color
}

enum SoundPack: String, CaseIterable {
    case defaultSounds = "Default"
    case retroArcade = "Retro Arcade"
    case futuristic = "Futuristic"
    
    var id: String { rawValue }
    
    var price: Int {
        switch self {
        case .defaultSounds: return 0
        case .retroArcade: return 150
        case .futuristic: return 200
        }
    }
    
    var description: String {
        switch self {
        case .defaultSounds: return "Classic game sounds"
        case .retroArcade: return "8-bit nostalgic beeps"
        case .futuristic: return "Sci-fi sound effects"
        }
    }
}

enum PowerUp: String, CaseIterable {
    case slowMotion = "Slow Motion"
    case perfectStacker = "Perfect Stacker"
    case doubleCoins = "Double Coins"
    case extraLife = "Extra Life"
    
    var id: String { rawValue }
    
    var price: Int {
        switch self {
        case .slowMotion: return 25
        case .perfectStacker: return 50
        case .doubleCoins: return 35
        case .extraLife: return 75
        }
    }
    
    var description: String {
        switch self {
        case .slowMotion: return "Slows down block movement"
        case .perfectStacker: return "Easier perfect stacks"
        case .doubleCoins: return "Double coin rewards"
        case .extraLife: return "Continue after missing once"
        }
    }
    
    var icon: String {
        switch self {
        case .slowMotion: return "tortoise.fill"
        case .perfectStacker: return "target"
        case .doubleCoins: return "dollarsign.circle.fill"
        case .extraLife: return "heart.fill"
        }
    }
}

struct StoreItem: Identifiable {
    let id = UUID()
    let type: StoreItemType
    let name: String
    let description: String
    let price: Int
    let itemId: String
    let icon: String
    
    static func colorThemeItem(_ theme: ColorTheme) -> StoreItem {
        StoreItem(
            type: .colorTheme,
            name: theme.rawValue,
            description: theme.description,
            price: theme.price,
            itemId: theme.id,
            icon: StoreItemType.colorTheme.icon
        )
    }
    
    static func soundPackItem(_ pack: SoundPack) -> StoreItem {
        StoreItem(
            type: .soundPack,
            name: pack.rawValue,
            description: pack.description,
            price: pack.price,
            itemId: pack.id,
            icon: StoreItemType.soundPack.icon
        )
    }
    
    static func powerUpItem(_ powerUp: PowerUp) -> StoreItem {
        StoreItem(
            type: .powerUp,
            name: powerUp.rawValue,
            description: powerUp.description,
            price: powerUp.price,
            itemId: powerUp.id,
            icon: powerUp.icon
        )
    }
}

class StoreManager: ObservableObject {
    static let shared = StoreManager()
    
    @Published var ownedItems: Set<String> = []
    @Published var selectedColorTheme: ColorTheme = .defaultTheme
    @Published var selectedSoundPack: SoundPack = .defaultSounds
    
    private let ownedItemsKey = "StackRushOwnedItems"
    private let selectedThemeKey = "StackRushSelectedTheme"
    private let selectedSoundPackKey = "StackRushSelectedSoundPack"
    
    var allItems: [StoreItem] {
        var items: [StoreItem] = []
        
        // Color themes
        items.append(contentsOf: ColorTheme.allCases.map { StoreItem.colorThemeItem($0) })
        
        // Sound packs
        items.append(contentsOf: SoundPack.allCases.map { StoreItem.soundPackItem($0) })
        
        // Power-ups
        items.append(contentsOf: PowerUp.allCases.map { StoreItem.powerUpItem($0) })
        
        return items
    }
    
    var colorThemeItems: [StoreItem] {
        ColorTheme.allCases.map { StoreItem.colorThemeItem($0) }
    }
    
    var soundPackItems: [StoreItem] {
        SoundPack.allCases.map { StoreItem.soundPackItem($0) }
    }
    
    var powerUpItems: [StoreItem] {
        PowerUp.allCases.map { StoreItem.powerUpItem($0) }
    }
    
    private init() {
        loadOwnedItems()
        loadSelectedItems()
        
        // Default theme and sounds are always owned
        ownedItems.insert(ColorTheme.defaultTheme.id)
        ownedItems.insert(SoundPack.defaultSounds.id)
    }
    
    func purchaseItem(_ item: StoreItem) -> Bool {
        // Handle power-ups differently - they go to inventory
        if item.type == .powerUp {
            return purchasePowerUp(item)
        }
        
        // Handle themes and sound packs as before
        guard !isOwned(item.itemId) else { return false }
        guard CoinsManager.shared.spendCoins(item.price) else { return false }
        
        ownedItems.insert(item.itemId)
        saveOwnedItems()
        
        // Auto-select purchased themes
        if item.type == .colorTheme {
            if let theme = ColorTheme.allCases.first(where: { $0.id == item.itemId }) {
                setSelectedColorTheme(theme)
            }
        } else if item.type == .soundPack {
            if let pack = SoundPack.allCases.first(where: { $0.id == item.itemId }) {
                setSelectedSoundPack(pack)
            }
        }
        
        return true
    }
    
    private func purchasePowerUp(_ item: StoreItem) -> Bool {
        guard CoinsManager.shared.spendCoins(item.price) else { return false }
        
        // Add power-up to inventory
        if let powerUp = PowerUp.allCases.first(where: { $0.id == item.itemId }) {
            InventoryManager.shared.addPowerUp(powerUp, quantity: 1)
        }
        
        return true
    }
    
    func isOwned(_ itemId: String) -> Bool {
        // For power-ups, check if they have any in inventory
        if let powerUp = PowerUp.allCases.first(where: { $0.id == itemId }) {
            return InventoryManager.shared.getPowerUpCount(powerUp) > 0
        }
        
        // For themes and sound packs, check ownership as before
        return ownedItems.contains(itemId)
    }
    
    func canPurchase(_ item: StoreItem) -> Bool {
        // Power-ups can always be purchased if you have coins
        if item.type == .powerUp {
            return CoinsManager.shared.canAfford(item.price)
        }
        
        // Themes and sound packs can only be purchased once
        return !isOwned(item.itemId) && CoinsManager.shared.canAfford(item.price)
    }
    
    func setSelectedColorTheme(_ theme: ColorTheme) {
        guard isOwned(theme.id) else { return }
        let previousTheme = selectedColorTheme
        selectedColorTheme = theme
        saveSelectedItems()
        
        // Notify about theme change if it's different
        if previousTheme != theme {
            NotificationCenter.default.post(name: NSNotification.Name("ColorThemeChanged"), object: nil)
        }
    }
    
    func setSelectedSoundPack(_ pack: SoundPack) {
        guard isOwned(pack.id) else { return }
        selectedSoundPack = pack
        saveSelectedItems()
        // Notify SoundManager of the change
        NotificationCenter.default.post(name: NSNotification.Name("SoundPackChanged"), object: nil)
    }
    
    private func loadOwnedItems() {
        if let data = UserDefaults.standard.array(forKey: ownedItemsKey) as? [String] {
            ownedItems = Set(data)
        }
    }
    
    private func saveOwnedItems() {
        UserDefaults.standard.set(Array(ownedItems), forKey: ownedItemsKey)
    }
    
    private func loadSelectedItems() {
        if let themeRawValue = UserDefaults.standard.string(forKey: selectedThemeKey),
           let theme = ColorTheme(rawValue: themeRawValue) {
            selectedColorTheme = theme
        }
        
        if let packRawValue = UserDefaults.standard.string(forKey: selectedSoundPackKey),
           let pack = SoundPack(rawValue: packRawValue) {
            selectedSoundPack = pack
        }
    }
    
    private func saveSelectedItems() {
        UserDefaults.standard.set(selectedColorTheme.rawValue, forKey: selectedThemeKey)
        UserDefaults.standard.set(selectedSoundPack.rawValue, forKey: selectedSoundPackKey)
    }
}

// Extension for Color hex initialization
extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }

        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}