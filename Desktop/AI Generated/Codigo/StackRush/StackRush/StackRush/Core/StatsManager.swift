import Foundation

class StatsManager {
    static let shared = StatsManager()
    
    private let userDefaults = UserDefaults.standard
    
    private init() {}
    
    // Stats keys
    private let totalGamesKey = "StackRushTotalGames"
    private let totalScoreKey = "StackRushTotalScore"
    private let perfectStacksKey = "StackRushPerfectStacks"
    private let highestComboKey = "StackRushHighestCombo"
    private let totalBlocksKey = "StackRushTotalBlocks"
    
    // Get stats
    var totalGames: Int {
        userDefaults.integer(forKey: totalGamesKey)
    }
    
    var totalScore: Int {
        userDefaults.integer(forKey: totalScoreKey)
    }
    
    var perfectStacks: Int {
        userDefaults.integer(forKey: perfectStacksKey)
    }
    
    var highestCombo: Int {
        userDefaults.integer(forKey: highestComboKey)
    }
    
    var totalBlocks: Int {
        userDefaults.integer(forKey: totalBlocksKey)
    }
    
    var averageScore: Int {
        totalGames > 0 ? totalScore / totalGames : 0
    }
    
    // Update stats
    func recordGame(score: Int, blocks: Int, perfectStacks: Int, highestCombo: Int) {
        userDefaults.set(totalGames + 1, forKey: totalGamesKey)
        userDefaults.set(totalScore + score, forKey: totalScoreKey)
        userDefaults.set(self.perfectStacks + perfectStacks, forKey: perfectStacksKey)
        userDefaults.set(totalBlocks + blocks, forKey: totalBlocksKey)
        
        if highestCombo > self.highestCombo {
            userDefaults.set(highestCombo, forKey: highestComboKey)
        }
    }
    
    func reset() {
        userDefaults.removeObject(forKey: totalGamesKey)
        userDefaults.removeObject(forKey: totalScoreKey)
        userDefaults.removeObject(forKey: perfectStacksKey)
        userDefaults.removeObject(forKey: highestComboKey)
        userDefaults.removeObject(forKey: totalBlocksKey)
    }
}