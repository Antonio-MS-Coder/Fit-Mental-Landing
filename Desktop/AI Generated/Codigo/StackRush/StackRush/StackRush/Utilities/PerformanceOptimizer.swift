import SpriteKit
import SwiftUI

class PerformanceOptimizer {
    static let shared = PerformanceOptimizer()
    
    private init() {}
    
    func optimizeScene(_ scene: SKScene) {
        // Enable view culling for better performance
        scene.view?.ignoresSiblingOrder = true
        scene.view?.showsFPS = false
        scene.view?.showsNodeCount = false
        
        // Reduce memory usage
        scene.view?.preferredFramesPerSecond = 60
        
        // Enable texture atlasing for better batching
        SKTextureAtlas.preloadTextureAtlases([]) { }
    }
    
    func cleanupNodes(in scene: SKScene, keepLast: Int = 20) {
        // Remove old block nodes that are far below the visible area
        let nodes = scene.children.filter { $0 is SKShapeNode }
        
        if nodes.count > keepLast {
            let nodesToRemove = nodes.count - keepLast
            for i in 0..<nodesToRemove {
                if let node = nodes[safe: i],
                   node.position.y > scene.frame.height + 200 {
                    node.removeFromParent()
                }
            }
        }
    }
    
    func shouldReduceQuality() -> Bool {
        // Check device capabilities
        let processor = ProcessInfo.processInfo
        return processor.activeProcessorCount < 4 || 
               processor.physicalMemory < 3_000_000_000 // Less than 3GB RAM
    }
}

extension Array {
    subscript(safe index: Int) -> Element? {
        return index >= 0 && index < count ? self[index] : nil
    }
}