import Foundation

enum GamePhase {
    case menu
    case playing
    case paused
    case gameOver
}

enum GameMode: String, CaseIterable {
    case classic = "Classic"
    case infinite = "Infinite"
    
    var description: String {
        return self.rawValue
    }
}

class GameState: ObservableObject {
    @Published var phase: GamePhase = .menu
    @Published var currentGameMode: GameMode = .classic
    @Published var highScore: Int = 0
    @Published var currentScore: Int = 0
    
    // Coins integration
    @Published var coinsManager = CoinsManager.shared
    
    init() {
        loadHighScores()
    }
    
    func setGameMode(_ mode: GameMode) {
        currentGameMode = mode
        updateDisplayedHighScore()
    }
    
    func startGame() {
        currentScore = 0
        phase = .playing
    }
    
    func pauseGame() {
        guard phase == .playing else { return }
        phase = .paused
    }
    
    func resumeGame() {
        guard phase == .paused else { return }
        phase = .playing
    }
    
    func endGame(score: Int) {
        currentScore = score
        phase = .gameOver
        
        let currentHighScore = getHighScore(for: currentGameMode)
        if score > currentHighScore {
            saveHighScore(score, for: currentGameMode)
            updateDisplayedHighScore()
        }
    }
    
    func returnToMenu() {
        phase = .menu
    }
    
    private func loadHighScores() {
        updateDisplayedHighScore()
    }
    
    private func updateDisplayedHighScore() {
        highScore = getHighScore(for: currentGameMode)
    }
    
    private func getHighScore(for mode: GameMode) -> Int {
        let key = "StackRushHighScore_\(mode.rawValue)"
        return UserDefaults.standard.integer(forKey: key)
    }
    
    private func saveHighScore(_ score: Int, for mode: GameMode) {
        let key = "StackRushHighScore_\(mode.rawValue)"
        UserDefaults.standard.set(score, forKey: key)
    }
}