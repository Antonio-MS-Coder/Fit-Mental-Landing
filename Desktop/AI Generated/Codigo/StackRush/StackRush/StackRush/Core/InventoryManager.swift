import Foundation

class InventoryManager: ObservableObject {
    static let shared = InventoryManager()
    
    @Published var powerUpInventory: [PowerUp: Int] = [:]
    
    private let inventoryKey = "StackRushPowerUpInventory"
    
    private init() {
        loadInventory()
    }
    
    // MARK: - Inventory Management
    
    func addPowerUp(_ powerUp: PowerUp, quantity: Int = 1) {
        let currentAmount = powerUpInventory[powerUp] ?? 0
        powerUpInventory[powerUp] = currentAmount + quantity
        saveInventory()
    }
    
    func usePowerUp(_ powerUp: PowerUp) -> Bool {
        guard let currentAmount = powerUpInventory[powerUp], currentAmount > 0 else {
            return false
        }
        
        powerUpInventory[powerUp] = currentAmount - 1
        saveInventory()
        
        // Play usage sound
        SoundManager.shared.playButtonTapSound()
        
        return true
    }
    
    func getPowerUpCount(_ powerUp: PowerUp) -> Int {
        return powerUpInventory[powerUp] ?? 0
    }
    
    func hasPowerUp(_ powerUp: PowerUp) -> Bool {
        return getPowerUpCount(powerUp) > 0
    }
    
    // MARK: - Active Power-ups Tracking
    
    @Published var activePowerUps: Set<PowerUp> = []
    
    func activatePowerUp(_ powerUp: PowerUp) {
        guard usePowerUp(powerUp) else { return }
        
        // Extra Life is handled differently - it's consumed immediately when used
        if powerUp == .extraLife {
            // Don't add to active power-ups, it's used instantly
            return
        }
        
        activePowerUps.insert(powerUp)
        
        // Set timer to deactivate power-up after duration
        DispatchQueue.main.asyncAfter(deadline: .now() + powerUp.duration) {
            self.deactivatePowerUp(powerUp)
        }
    }
    
    private func deactivatePowerUp(_ powerUp: PowerUp) {
        activePowerUps.remove(powerUp)
    }
    
    func isPowerUpActive(_ powerUp: PowerUp) -> Bool {
        return activePowerUps.contains(powerUp)
    }
    
    // MARK: - Power-up Effects
    
    var currentSpeedMultiplier: Double {
        if isPowerUpActive(.slowMotion) {
            return 0.5 // 50% slower
        }
        return 1.0
    }
    
    var currentCoinMultiplier: Double {
        if isPowerUpActive(.doubleCoins) {
            return 2.0
        }
        return 1.0
    }
    
    var perfectStackerActive: Bool {
        return isPowerUpActive(.perfectStacker)
    }
    
    // MARK: - Extra Life Management
    
    func useExtraLife() -> Bool {
        return usePowerUp(.extraLife)
    }
    
    func hasExtraLife() -> Bool {
        return hasPowerUp(.extraLife)
    }
    
    // MARK: - Persistence
    
    private func loadInventory() {
        if let data = UserDefaults.standard.data(forKey: inventoryKey),
           let decoded = try? JSONDecoder().decode([String: Int].self, from: data) {
            
            // Convert string keys back to PowerUp enum
            for (key, value) in decoded {
                if let powerUp = PowerUp(rawValue: key) {
                    powerUpInventory[powerUp] = value
                }
            }
        }
    }
    
    private func saveInventory() {
        // Convert PowerUp keys to strings for JSON encoding
        let stringKeyed = Dictionary(uniqueKeysWithValues: 
            powerUpInventory.map { (key, value) in (key.rawValue, value) }
        )
        
        if let encoded = try? JSONEncoder().encode(stringKeyed) {
            UserDefaults.standard.set(encoded, forKey: inventoryKey)
        }
    }
    
    // MARK: - Debug/Testing
    
    func resetInventory() {
        powerUpInventory.removeAll()
        activePowerUps.removeAll()
        saveInventory()
    }
}

// MARK: - PowerUp Extensions

extension PowerUp {
    var duration: TimeInterval {
        switch self {
        case .slowMotion: return 10.0 // 10 seconds
        case .perfectStacker: return 15.0 // 15 seconds
        case .doubleCoins: return 20.0 // 20 seconds
        case .extraLife: return 0.0 // Instant use - no duration
        }
    }
    
    var effectDescription: String {
        switch self {
        case .slowMotion: return "Slows blocks for \(Int(duration)) seconds"
        case .perfectStacker: return "Makes perfect stacks easier for \(Int(duration)) seconds"
        case .doubleCoins: return "Doubles coin rewards for \(Int(duration)) seconds"
        case .extraLife: return "Continue playing after one missed drop"
        }
    }
    
    var usageInstructions: String {
        switch self {
        case .slowMotion: return "Tap to activate during gameplay"
        case .perfectStacker: return "Tap to activate during gameplay"
        case .doubleCoins: return "Tap to activate during gameplay"
        case .extraLife: return "Automatically used when you miss"
        }
    }
}