import Foundation
import CoreGraphics

enum GameConstants {
    static let initialBlockWidth: CGFloat = 100
    static let blockHeight: CGFloat = 30
    static let initialSpeed: CGFloat = 2.0
    static let speedIncrement: CGFloat = 0.2
    static let maxSpeed: CGFloat = 8.0
    
    static let stackStartY: CGFloat = 50
    static let blockSpacing: CGFloat = 2
    
    static let perfectStackBonus = 10
    static let normalStackScore = 1
    
    static let screenPadding: CGFloat = 20
    static let minBlockWidth: CGFloat = 40
    
    static let blockColors = [
        "#00FFFF", "#00CCFF", "#0099FF", "#0066FF", "#0033FF",
        "#3300FF", "#6600FF", "#9900FF", "#CC00FF", "#FF00FF",
        "#FF0099", "#FF0066", "#FF0033", "#FF0000", "#FF3300",
        "#FF6600", "#FF9900", "#FFCC00", "#FFFF00", "#CCFF00"
    ]
}