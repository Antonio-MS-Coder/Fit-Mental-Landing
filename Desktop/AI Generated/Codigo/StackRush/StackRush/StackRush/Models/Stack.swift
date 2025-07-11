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
    
    private var currentSpeed: CGFloat = GameConstants.initialSpeed
    private var colorIndex: Int = 0
    private var perfectStackCount: Int = 0
    private var highestCombo: Int = 0
    
    func startNewGame() {
        blocks.removeAll()
        currentBlock = nil
        score = 0
        combo = 0
        gameOver = false
        currentSpeed = GameConstants.initialSpeed
        colorIndex = 0
        perfectStackCount = 0
        highestCombo = 0
        lastChopInfo = nil
        
        let firstBlock = Block(
            position: CGPoint(x: 200 - GameConstants.initialBlockWidth / 2, // Center position
                            y: GameConstants.stackStartY),
            width: GameConstants.initialBlockWidth,
            velocity: 0,
            colorHex: GameConstants.blockColors[colorIndex]
        )
        blocks.append(firstBlock)
        spawnNextBlock()
    }
    
    func spawnNextBlock() {
        guard let lastBlock = blocks.last else { return }
        
        colorIndex = (colorIndex + 1) % GameConstants.blockColors.count
        
        let newBlock = Block(
            position: CGPoint(x: 0, y: lastBlock.position.y + GameConstants.blockHeight + GameConstants.blockSpacing),
            width: lastBlock.width,
            velocity: currentSpeed,
            colorHex: GameConstants.blockColors[colorIndex]
        )
        
        currentBlock = newBlock
        increaseSpeed()
    }
    
    func stopCurrentBlock() -> Bool {
        guard var current = currentBlock, !blocks.isEmpty else { return false }
        
        current.stop()
        
        if blocks.count == 1 {
            blocks.append(current)
            score += GameConstants.normalStackScore
            currentBlock = nil
            return true
        }
        
        guard let previousBlock = blocks.last else { return false }
        
        let (leftOverhang, rightOverhang, overlap) = current.overlapWith(previousBlock)
        
        if overlap <= 0 {
            gameOver = true
            return false
        }
        
        if leftOverhang < 1 && rightOverhang < 1 {
            score += GameConstants.perfectStackBonus
            combo += 1
            perfectStackCount += 1
            highestCombo = max(highestCombo, combo)
            
            if combo > 2 {
                current.width = min(current.width * 1.1, GameConstants.initialBlockWidth)
            }
        } else {
            score += GameConstants.normalStackScore
            combo = 0
            
            current.position.x = previousBlock.position.x + leftOverhang
            current.width = overlap
            lastChopInfo = (leftOverhang, rightOverhang)
        }
        
        if current.width < GameConstants.minBlockWidth {
            gameOver = true
            return false
        }
        
        blocks.append(current)
        currentBlock = nil
        
        return true
    }
    
    private func increaseSpeed() {
        currentSpeed = min(currentSpeed + GameConstants.speedIncrement, GameConstants.maxSpeed)
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