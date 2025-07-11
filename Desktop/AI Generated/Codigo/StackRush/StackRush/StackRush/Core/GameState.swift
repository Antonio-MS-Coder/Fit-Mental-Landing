import Foundation

enum GamePhase {
    case menu
    case playing
    case paused
    case gameOver
}

class GameState: ObservableObject {
    @Published var phase: GamePhase = .menu
    @Published var highScore: Int = 0
    
    init() {
        loadHighScore()
    }
    
    func startGame() {
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
        phase = .gameOver
        if score > highScore {
            highScore = score
            saveHighScore()
        }
    }
    
    func returnToMenu() {
        phase = .menu
    }
    
    private func loadHighScore() {
        highScore = UserDefaults.standard.integer(forKey: "StackRushHighScore")
    }
    
    private func saveHighScore() {
        UserDefaults.standard.set(highScore, forKey: "StackRushHighScore")
    }
}