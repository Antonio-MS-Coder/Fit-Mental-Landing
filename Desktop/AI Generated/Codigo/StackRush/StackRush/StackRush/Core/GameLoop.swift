import Foundation
import Combine
import QuartzCore

class GameLoop: ObservableObject {
    private var displayLink: CADisplayLink?
    private weak var stack: Stack?
    private weak var scene: GameScene?
    
    var isRunning = false
    var screenWidth: CGFloat = 400
    
    func start(stack: Stack, scene: GameScene?) {
        self.stack = stack
        self.scene = scene
        
        guard !isRunning else { return }
        
        displayLink = CADisplayLink(target: self, selector: #selector(gameUpdate))
        displayLink?.add(to: .main, forMode: .common)
        isRunning = true
    }
    
    func stop() {
        displayLink?.invalidate()
        displayLink = nil
        isRunning = false
    }
    
    func pause() {
        displayLink?.isPaused = true
    }
    
    func resume() {
        displayLink?.isPaused = false
    }
    
    @objc private func gameUpdate() {
        guard let stack = stack,
              !stack.gameOver,
              displayLink?.isPaused == false else { 
            // Stop the loop if game is over to prevent unnecessary updates
            if stack?.gameOver == true {
                stop()
            }
            return 
        }
        
        // Update game state
        stack.update(screenWidth: screenWidth)
        
        // Update scene
        scene?.updateBlocks()
    }
    
    deinit {
        stop()
    }
}