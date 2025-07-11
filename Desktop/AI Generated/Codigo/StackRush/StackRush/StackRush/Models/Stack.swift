import Foundation
import CoreGraphics
import SwiftUI
#if os(iOS)
import UIKit
#endif

class Stack: ObservableObject {
    @Published var blocks: [Block] = []
    @Published var currentBlock: Block?
    @Published var score: Int = 0
    @Published var combo: Int = 0
    @Published var gameOver: Bool = false
    @Published var lastChopInfo: (leftOverhang: CGFloat, rightOverhang: CGFloat)?
    
    private var gameController: StackRushGameController
    private var colorIndex: Int = 0
    private var perfectStackCount: Int = 0
    private var highestCombo: Int = 0
    
    init(gameController: StackRushGameController) {
        self.gameController = gameController
    }
    
    func startNewGame(mode: GameMode = .classic) {
        blocks.removeAll()
        currentBlock = nil
        score = 0
        combo = 0
        gameOver = false
        colorIndex = 0
        perfectStackCount = 0
        highestCombo = 0
        lastChopInfo = nil
        
        gameController.startNewGame(mode: mode)
        
        // Wait for first block placement to determine base position
        spawnNextBlock()
    }
    
    func spawnNextBlock() {
        colorIndex = (colorIndex + 1) % GameConstants.blockColors.count
        
        let level = gameController.level
        let speed = gameController.currentSpeed
        
        if blocks.isEmpty {
            // First block - player determines base position
            // Start block from left edge but ensure it's visible
            let firstBlock = Block(
                position: CGPoint(x: -GameConstants.initialBlockWidth/2, y: GameConstants.stackStartY),
                width: gameController.getBlockWidthForLevel(previousWidth: GameConstants.initialBlockWidth),
                velocity: speed,
                colorHex: GameConstants.blockColors[colorIndex],
                level: level
            )
            currentBlock = firstBlock
        } else {
            guard let lastBlock = blocks.last else { return }
            
            let newWidth = gameController.getBlockWidthForLevel(previousWidth: lastBlock.width)
            let newBlock = Block(
                position: CGPoint(x: 0, y: lastBlock.position.y + GameConstants.blockHeight + GameConstants.blockSpacing),
                width: newWidth,
                velocity: speed,
                colorHex: GameConstants.blockColors[colorIndex],
                level: level
            )
            
            currentBlock = newBlock
        }
    }
    
    func stopCurrentBlock() -> Bool {
        guard var current = currentBlock else { return false }
        
        current.stop()
        
        // Handle first block placement - establishes base position
        if blocks.isEmpty {
            gameController.setBasePosition(current.position.x + current.width / 2)
            blocks.append(current)
            score += GameConstants.normalStackScore
            currentBlock = nil
            gameController.completeLevel()
            return true
        }
        
        guard let previousBlock = blocks.last else { return false }
        
        // Use enhanced alignment calculation
        let alignment = current.calculateAlignment(with: previousBlock, tolerance: gameController.hitWindowTolerance)
        
        if !alignment.hasOverlap {
            gameOver = true
            return false
        }
        
        // Apply forced drop if needed
        if gameController.shouldApplyForcedDrop() {
            current.applyForcedDrop()
        }
        
        // Handle perfect vs imperfect stacks
        if alignment.isPerfect {
            score += GameConstants.perfectStackBonus * gameController.level
            combo += 1
            perfectStackCount += 1
            highestCombo = max(highestCombo, combo)
            
            // Perfect stack growth bonus
            if combo > 2 {
                current.width = min(current.width * 1.05, GameConstants.initialBlockWidth)
            }
        } else {
            score += GameConstants.normalStackScore * gameController.level
            combo = 0
            
            // Trim the block to the overlapping area
            current.position.x = alignment.alignedPosition.x
            current.width = alignment.alignedWidth
            lastChopInfo = (alignment.leftOverhang, alignment.rightOverhang)
        }
        
        // Check if block is still valid after trimming/forced drop
        if !alignment.isValid || current.width < GameConstants.minBlockWidth {
            gameOver = true
            return false
        }
        
        blocks.append(current)
        currentBlock = nil
        gameController.completeLevel()
        
        return true
    }
    
    // Legacy method - speed is now handled by game controller
    private func increaseSpeed() {
        // Speed management moved to StackRushGameController
    }
    
    func update(screenWidth: CGFloat) {
        currentBlock?.updatePosition(screenWidth: screenWidth)
    }
    
    func recordStats() {
        StatsManager.shared.recordGame(
            score: score,
            blocks: blocks.count,
            perfectStacks: perfectStackCount,
            highestCombo: highestCombo
        )
    }
}