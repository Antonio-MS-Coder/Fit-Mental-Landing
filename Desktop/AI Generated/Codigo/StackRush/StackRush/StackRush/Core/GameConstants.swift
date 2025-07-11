import Foundation
import CoreGraphics

enum GameConstants {
    // Block dimensions
    static let initialBlockWidth: CGFloat = 90
    static let blockHeight: CGFloat = 25
    static let minBlockWidth: CGFloat = 15
    
    // Speed and timing
    static let initialSpeed: CGFloat = 1.5
    static let speedIncrement: CGFloat = 0.15
    static let maxSpeed: CGFloat = 6.0
    
    // Layout - positioned from bottom of screen for better visibility
    static let stackStartY: CGFloat = 100
    static let blockSpacing: CGFloat = 1
    static let screenPadding: CGFloat = 20
    
    // Scoring - level-based multipliers
    static let perfectStackBonus = 10
    static let normalStackScore = 1
    
    // Authentic arcade progression
    static let threeBlockLevels = 1...3
    static let twoBlockLevels = 4...9
    static let singleBlockLevels = 10...
    
    // Prize levels
    static let minorPrizeLevel = 11
    static let majorPrizeLevel = 15
    
    // Forced drop mechanics
    static let forcedDropInterval = 5
    static let forcedDropAmount: CGFloat = 5.0
    
    // Hit window tolerances
    static let baseHitWindow: CGFloat = 2.0
    static let minHitWindow: CGFloat = 0.5
    
    // Visual effects
    static let blockColors = [
        "#FF0080", "#FF0040", "#FF8000", "#FFBF00", "#FFFF00",
        "#BFFF00", "#80FF00", "#40FF00", "#00FF00", "#00FF40",
        "#00FF80", "#00FFBF", "#00FFFF", "#00BFFF", "#0080FF",
        "#0040FF", "#0000FF", "#4000FF", "#8000FF", "#BF00FF"
    ]
}