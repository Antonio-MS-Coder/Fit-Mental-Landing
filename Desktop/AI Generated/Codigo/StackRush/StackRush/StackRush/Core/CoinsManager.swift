import Foundation

class CoinsManager: ObservableObject {
    static let shared = CoinsManager()
    
    @Published var coinBalance: Int = 0
    
    private let coinsKey = "StackRushCoins"
    
    private init() {
        loadCoins()
    }
    
    func addCoins(_ amount: Int) {
        // Apply power-up multiplier if active
        let multiplier = InventoryManager.shared.currentCoinMultiplier
        let finalAmount = Int(Double(amount) * multiplier)
        
        coinBalance += finalAmount
        saveCoins()
        
        // Play coin sound effect
        SoundManager.shared.playButtonTapSound() // We can add a specific coin sound later
    }
    
    func spendCoins(_ amount: Int) -> Bool {
        guard coinBalance >= amount else { return false }
        coinBalance -= amount
        saveCoins()
        return true
    }
    
    func canAfford(_ amount: Int) -> Bool {
        return coinBalance >= amount
    }
    
    private func loadCoins() {
        coinBalance = UserDefaults.standard.integer(forKey: coinsKey)
    }
    
    private func saveCoins() {
        UserDefaults.standard.set(coinBalance, forKey: coinsKey)
    }
    
    // Prize amounts
    static let minorPrizeCoins = 50
    static let majorPrizeCoins = 150
    
    // Future store prices (for reference)
    static let newSongPrice = 100
    static let newColorSchemePrice = 75
    static let powerUpPrice = 25
}