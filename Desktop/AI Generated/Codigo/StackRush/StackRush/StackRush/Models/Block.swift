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
    
    init(position: CGPoint, width: CGFloat, velocity: CGFloat, colorHex: String) {
        self.position = position
        self.width = width
        self.velocity = velocity
        self.isMoving = true
        self.colorHex = colorHex
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
    
    func overlapWith(_ other: Block) -> (leftOverhang: CGFloat, rightOverhang: CGFloat, overlap: CGFloat) {
        let leftEdge = max(position.x, other.position.x)
        let rightEdge = min(position.x + width, other.position.x + other.width)
        let overlap = max(0, rightEdge - leftEdge)
        
        let leftOverhang = max(0, other.position.x - position.x)
        let rightOverhang = max(0, (position.x + width) - (other.position.x + other.width))
        
        return (leftOverhang, rightOverhang, overlap)
    }
}