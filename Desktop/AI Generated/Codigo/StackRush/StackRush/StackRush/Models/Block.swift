import Foundation
import CoreGraphics

struct Block: Identifiable {
    let id = UUID()
    var position: CGPoint
    var width: CGFloat
    let height: CGFloat = GameConstants.blockHeight
    var velocity: CGFloat
    var isMoving: Bool
    var colorHex: String
    var level: Int
    
    init(position: CGPoint, width: CGFloat, velocity: CGFloat, colorHex: String, level: Int = 1) {
        self.position = position
        self.width = width
        self.velocity = velocity
        self.isMoving = true
        self.colorHex = colorHex
        self.level = level
    }
    
    mutating func stop() {
        isMoving = false
        velocity = 0
    }
    
    mutating func updatePosition(screenWidth: CGFloat) {
        guard isMoving else { return }
        
        position.x += velocity
        
        if position.x <= 0 || position.x + width >= screenWidth {
            velocity = -velocity
            position.x = max(0, min(position.x, screenWidth - width))
        }
    }
    
    // Enhanced overlap calculation with precision tolerance
    func calculateAlignment(with previousBlock: Block, tolerance: CGFloat = 2.0) -> StackAlignment {
        let currentLeft = position.x
        let currentRight = position.x + width
        let previousLeft = previousBlock.position.x
        let previousRight = previousBlock.position.x + previousBlock.width
        
        // Calculate overlap
        let overlapLeft = max(currentLeft, previousLeft)
        let overlapRight = min(currentRight, previousRight)
        let overlapWidth = max(0, overlapRight - overlapLeft)
        
        // Check for perfect alignment within tolerance
        let leftDiff = abs(currentLeft - previousLeft)
        let rightDiff = abs(currentRight - previousRight)
        let isPerfect = leftDiff <= tolerance && rightDiff <= tolerance
        
        // Calculate overhangs
        let leftOverhang = max(0, previousLeft - currentLeft)
        let rightOverhang = max(0, currentRight - previousRight)
        
        return StackAlignment(
            overlapWidth: overlapWidth,
            leftOverhang: leftOverhang,
            rightOverhang: rightOverhang,
            isPerfect: isPerfect,
            alignedPosition: CGPoint(x: overlapLeft, y: position.y),
            alignedWidth: overlapWidth
        )
    }
    
    // Apply forced drop reduction
    mutating func applyForcedDrop() {
        let reductionAmount: CGFloat = 5.0
        let newWidth = max(width - reductionAmount, GameConstants.minBlockWidth)
        let centerX = position.x + width / 2
        
        width = newWidth
        position.x = centerX - newWidth / 2
    }
    
    // Legacy method for compatibility
    func overlapWith(_ other: Block) -> (leftOverhang: CGFloat, rightOverhang: CGFloat, overlap: CGFloat) {
        let alignment = calculateAlignment(with: other)
        return (alignment.leftOverhang, alignment.rightOverhang, alignment.overlapWidth)
    }
}

struct StackAlignment {
    let overlapWidth: CGFloat
    let leftOverhang: CGFloat
    let rightOverhang: CGFloat
    let isPerfect: Bool
    let alignedPosition: CGPoint
    let alignedWidth: CGFloat
    
    var hasOverlap: Bool {
        return overlapWidth > 0
    }
    
    var isValid: Bool {
        return overlapWidth >= GameConstants.minBlockWidth
    }
}