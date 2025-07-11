import Foundation
import CoreGraphics
import SwiftUI

class StackRushGameController: ObservableObject {
    @Published var level: Int = 1
    @Published var blocksInCurrentRow: Int = 3
    @Published var currentSpeed: CGFloat = 1.5
    @Published var gamePhase: StackRushPhase = .awaitingFirstBlock
    @Published var prizeState: PrizeState = .none
    @Published var hitWindowTolerance: CGFloat = 2.0
    @Published var basePosition: CGFloat? = nil
    @Published var currentGameMode: GameMode = .classic
    
    private var forcedDropCounter: Int = 0
    private let forcedDropInterval: Int = 5 // Every 5 levels
    private var lastForcedDropLevel: Int = 0
    
    func setGameMode(_ mode: GameMode) {
        currentGameMode = mode
    }
    
    func startNewGame(mode: GameMode) {
        currentGameMode = mode
        level = 1
        blocksInCurrentRow = 3
        currentSpeed = 1.5
        gamePhase = .awaitingFirstBlock
        prizeState = .none
        hitWindowTolerance = 2.0
        basePosition = nil
        forcedDropCounter = 0
        lastForcedDropLevel = 0
        
        // Reset music speed to normal
        SoundManager.shared.setMusicSpeed(multiplier: 1.0)
    }
    
    func setBasePosition(_ position: CGFloat) {
        guard basePosition == nil else { return }
        basePosition = position
        gamePhase = .normalPlay
    }
    
    func completeLevel() {
        level += 1
        updateBlockCountForLevel()
        updateSpeedForLevel()
        updateHitWindowForLevel()
        checkForPrizeEvents()
        checkForForcedDrop()
    }
    
    private func updateBlockCountForLevel() {
        switch currentGameMode {
        case .classic:
            if level <= 3 {
                blocksInCurrentRow = 3
            } else if level <= 9 {
                blocksInCurrentRow = 2
            } else {
                blocksInCurrentRow = 1
            }
        case .infinite:
            // More forgiving progression for infinite mode
            if level <= 5 {
                blocksInCurrentRow = 3
            } else if level <= 15 {
                blocksInCurrentRow = 2
            } else {
                blocksInCurrentRow = 1
            }
        }
    }
    
    private func updateSpeedForLevel() {
        let baseSpeed: CGFloat = 1.5
        let speedIncrement: CGFloat
        let maxSpeed: CGFloat
        
        switch currentGameMode {
        case .classic:
            speedIncrement = 0.15
            maxSpeed = 6.0
        case .infinite:
            // Slower speed increase for infinite mode
            speedIncrement = 0.10
            maxSpeed = 4.5
        }
        
        let speedMultiplier: CGFloat = 1.0 + (CGFloat(level - 1) * speedIncrement)
        currentSpeed = min(baseSpeed * speedMultiplier, maxSpeed)
        
        // Update music speed to match game speed
        let musicSpeedMultiplier = Float(speedMultiplier)
        SoundManager.shared.setMusicSpeed(multiplier: musicSpeedMultiplier)
    }
    
    private func updateHitWindowForLevel() {
        let baseWindow: CGFloat = 2.0
        let windowReduction: CGFloat
        let minWindow: CGFloat
        
        switch currentGameMode {
        case .classic:
            windowReduction = CGFloat(level / 3) * 0.3
            minWindow = 0.5
        case .infinite:
            // More forgiving hit window reduction for infinite mode
            windowReduction = CGFloat(level / 5) * 0.2
            minWindow = 0.8
        }
        
        hitWindowTolerance = max(baseWindow - windowReduction, minWindow)
    }
    
    private func checkForPrizeEvents() {
        // Only enable prize events for classic mode
        guard currentGameMode == .classic else { return }
        
        if level == 11 {
            prizeState = .minorPrize
        } else if level == 15 {
            prizeState = .majorPrize
        }
    }
    
    private func checkForForcedDrop() {
        if level - lastForcedDropLevel >= forcedDropInterval {
            lastForcedDropLevel = level
            // Trigger forced drop logic in the next block placement
        }
    }
    
    func shouldApplyForcedDrop() -> Bool {
        return level - lastForcedDropLevel >= forcedDropInterval
    }
    
    func acknowledgePrize() {
        // Award coins based on prize type
        switch prizeState {
        case .minorPrize:
            CoinsManager.shared.addCoins(CoinsManager.minorPrizeCoins)
        case .majorPrize:
            CoinsManager.shared.addCoins(CoinsManager.majorPrizeCoins)
        case .none:
            break
        }
        prizeState = .none
    }
    
    func getBlockWidthForLevel(previousWidth: CGFloat) -> CGFloat {
        let baseWidth: CGFloat = 90.0 // Slightly smaller than original
        
        switch blocksInCurrentRow {
        case 3:
            return baseWidth
        case 2:
            return min(previousWidth, baseWidth * 0.9)
        case 1:
            return min(previousWidth, baseWidth * 0.8)
        default:
            return previousWidth
        }
    }
}

enum StackRushPhase {
    case awaitingFirstBlock
    case normalPlay
    case gameOver
}

enum PrizeState {
    case none
    case minorPrize
    case majorPrize
    
    var title: String {
        switch self {
        case .none: return ""
        case .minorPrize: return "Minor Prize!"
        case .majorPrize: return "MAJOR PRIZE!"
        }
    }
    
    var message: String {
        switch self {
        case .none: return ""
        case .minorPrize: return "Great job reaching level 11! You earned \(CoinsManager.minorPrizeCoins) coins!"
        case .majorPrize: return "CONGRATULATIONS! You've reached level 15 and earned \(CoinsManager.majorPrizeCoins) coins!"
        }
    }
    
    var coinReward: Int {
        switch self {
        case .none: return 0
        case .minorPrize: return CoinsManager.minorPrizeCoins
        case .majorPrize: return CoinsManager.majorPrizeCoins
        }
    }
}