import SpriteKit
import SwiftUI
#if os(iOS)
import UIKit
#endif

class GameScene: SKScene {
    var stack: Stack?
    var blockNodes: [UUID: SKShapeNode] = [:]
    var currentBlockNode: SKShapeNode?
    var ghostBlockNode: SKShapeNode?
    var overlapIndicators: [SKShapeNode] = []
    var cameraNode: SKCameraNode?
    private var initialCameraY: CGFloat = 0
    
    override func didMove(to view: SKView) {
        backgroundColor = UIColor(red: 0.05, green: 0.05, blue: 0.15, alpha: 1.0) // Dark blue background
        setupPhysics()
        setupCamera()
        setupBackground()
        PerformanceOptimizer.shared.optimizeScene(self)
    }
    
    private func setupPhysics() {
        physicsWorld.gravity = CGVector(dx: 0, dy: 0)
        physicsBody = SKPhysicsBody(edgeLoopFrom: frame)
    }
    
    private func setupCamera() {
        cameraNode = SKCameraNode()
        if let camera = cameraNode {
            camera.position = CGPoint(x: size.width / 2, y: size.height / 2)
            initialCameraY = camera.position.y
            addChild(camera)
            self.camera = camera
        }
    }
    
    private func setupBackground() {
        // Create a game area outline similar to classic Stacker
        let gameAreaWidth: CGFloat = min(size.width * 0.8, 300)
        let gameAreaHeight: CGFloat = size.height * 0.8
        
        let gameArea = SKShapeNode(rect: CGRect(
            x: -gameAreaWidth / 2,
            y: -gameAreaHeight / 2,
            width: gameAreaWidth,
            height: gameAreaHeight
        ))
        
        gameArea.strokeColor = UIColor.cyan
        gameArea.lineWidth = 4
        gameArea.fillColor = UIColor.black.withAlphaComponent(0.3)
        gameArea.position = CGPoint(x: size.width / 2, y: size.height / 2)
        gameArea.zPosition = -2
        gameArea.glowWidth = 2
        
        addChild(gameArea)
        
        // Add horizontal grid lines for visual reference
        for i in 1..<25 {
            let y = gameArea.position.y - gameAreaHeight/2 + (gameAreaHeight / 25) * CGFloat(i)
            let gridLine = SKShapeNode(rect: CGRect(x: -gameAreaWidth/2, y: -0.5, width: gameAreaWidth, height: 1))
            gridLine.fillColor = UIColor.cyan.withAlphaComponent(0.15)
            gridLine.strokeColor = .clear
            gridLine.position = CGPoint(x: gameArea.position.x, y: y)
            gridLine.zPosition = -1
            addChild(gridLine)
        }
        
        // Add center line for alignment reference
        let centerLine = SKShapeNode(rect: CGRect(x: -1, y: -gameAreaHeight/2, width: 2, height: gameAreaHeight))
        centerLine.fillColor = UIColor.cyan.withAlphaComponent(0.4)
        centerLine.strokeColor = .clear
        centerLine.position = CGPoint(x: size.width / 2, y: size.height / 2)
        centerLine.zPosition = -1
        addChild(centerLine)
        
        // Add corner decorations
        let cornerSize: CGFloat = 20
        let corners = [
            CGPoint(x: gameArea.position.x - gameAreaWidth/2, y: gameArea.position.y + gameAreaHeight/2),
            CGPoint(x: gameArea.position.x + gameAreaWidth/2, y: gameArea.position.y + gameAreaHeight/2),
            CGPoint(x: gameArea.position.x - gameAreaWidth/2, y: gameArea.position.y - gameAreaHeight/2),
            CGPoint(x: gameArea.position.x + gameAreaWidth/2, y: gameArea.position.y - gameAreaHeight/2)
        ]
        
        for corner in corners {
            let cornerDecoration = SKShapeNode(rect: CGRect(x: -cornerSize/2, y: -cornerSize/2, width: cornerSize, height: cornerSize))
            cornerDecoration.fillColor = .clear
            cornerDecoration.strokeColor = UIColor.yellow
            cornerDecoration.lineWidth = 3
            cornerDecoration.position = corner
            cornerDecoration.zPosition = -1
            addChild(cornerDecoration)
        }
    }
    
    func updateBlocks() {
        guard let stack = stack else { return }
        
        for block in stack.blocks {
            if blockNodes[block.id] == nil {
                let node = createBlockNode(block)
                blockNodes[block.id] = node
                addChild(node)
            }
        }
        
        if let currentBlock = stack.currentBlock {
            if currentBlockNode == nil || currentBlockNode?.name != currentBlock.id.uuidString {
                currentBlockNode?.removeFromParent()
                currentBlockNode = createBlockNode(currentBlock)
                addChild(currentBlockNode!)
            }
            
            currentBlockNode?.position = CGPoint(x: currentBlock.position.x + currentBlock.width / 2,
                                               y: currentBlock.position.y + currentBlock.height / 2)
        } else {
            currentBlockNode?.removeFromParent()
            currentBlockNode = nil
        }
        
        updateGhostBlock()
        updateOverlapIndicators()
        updateCamera()
    }
    
    private func createBlockNode(_ block: Block) -> SKShapeNode {
        let rect = CGRect(x: -block.width / 2, y: -block.height / 2,
                         width: block.width, height: block.height)
        let node = SKShapeNode(rect: rect, cornerRadius: 2)
        
        let blockColor = UIColor(hex: block.colorHex) ?? .cyan
        node.fillColor = blockColor
        node.strokeColor = UIColor.white
        node.lineWidth = 2
        
        // Add a glow effect
        node.glowWidth = 5
        
        // Fix coordinate system - SpriteKit origin is at bottom-left
        node.position = CGPoint(x: block.position.x + block.width / 2,
                              y: block.position.y + block.height / 2)
        node.name = block.id.uuidString
        node.zPosition = 1
        
        // Add subtle animation for current block
        if block.isMoving {
            let pulseAction = SKAction.sequence([
                SKAction.scale(to: 1.05, duration: 0.5),
                SKAction.scale(to: 1.0, duration: 0.5)
            ])
            node.run(SKAction.repeatForever(pulseAction))
        }
        
        return node
    }
    
    private func updateGhostBlock() {
        guard let stack = stack,
              let currentBlock = stack.currentBlock,
              !stack.blocks.isEmpty else {
            ghostBlockNode?.removeFromParent()
            ghostBlockNode = nil
            return
        }
        
        // Calculate where the block would land
        guard let targetBlock = stack.blocks.last else { return }
        let targetY = targetBlock.position.y + targetBlock.height + GameConstants.blockSpacing
        
        // Calculate alignment for visual feedback
        let (leftOverhang, rightOverhang, overlap) = currentBlock.overlapWith(targetBlock)
        let isPerfectAlignment = leftOverhang < 1 && rightOverhang < 1
        
        // Create or update ghost block
        if ghostBlockNode == nil {
            ghostBlockNode = createGhostBlockNode(for: currentBlock, targetY: targetY, isPerfect: isPerfectAlignment)
            addChild(ghostBlockNode!)
        } else {
            // Update position and color based on alignment
            ghostBlockNode?.position = CGPoint(
                x: currentBlock.position.x + currentBlock.width / 2,
                y: targetY + currentBlock.height / 2
            )
            
            // Update color based on alignment
            if isPerfectAlignment {
                ghostBlockNode?.strokeColor = UIColor.green.withAlphaComponent(0.8)
                ghostBlockNode?.fillColor = UIColor.green.withAlphaComponent(0.2)
            } else if overlap > 0 {
                ghostBlockNode?.strokeColor = UIColor.yellow.withAlphaComponent(0.8)
                ghostBlockNode?.fillColor = UIColor.yellow.withAlphaComponent(0.1)
            } else {
                ghostBlockNode?.strokeColor = UIColor.red.withAlphaComponent(0.8)
                ghostBlockNode?.fillColor = UIColor.red.withAlphaComponent(0.1)
            }
        }
    }
    
    private func createGhostBlockNode(for block: Block, targetY: CGFloat, isPerfect: Bool) -> SKShapeNode {
        let rect = CGRect(x: -block.width / 2, y: -block.height / 2,
                         width: block.width, height: block.height)
        let node = SKShapeNode(rect: rect, cornerRadius: 2)
        
        // Ghost block styling based on alignment
        if isPerfect {
            node.fillColor = UIColor.green.withAlphaComponent(0.2)
            node.strokeColor = UIColor.green.withAlphaComponent(0.8)
        } else {
            node.fillColor = UIColor.cyan.withAlphaComponent(0.1)
            node.strokeColor = UIColor.cyan.withAlphaComponent(0.6)
        }
        
        node.lineWidth = 2
        
        // Create dashed line effect
        let dashPattern: [NSNumber] = [4, 4]
        if let path = node.path {
            let dashedPath = path.copy(dashingWithPhase: 0, lengths: dashPattern.map { CGFloat($0.floatValue) })
            node.path = dashedPath
        }
        
        node.position = CGPoint(x: block.position.x + block.width / 2,
                              y: targetY + block.height / 2)
        node.zPosition = 0.5
        node.alpha = 0.7
        
        return node
    }
    
    private func updateOverlapIndicators() {
        // Clear existing indicators
        overlapIndicators.forEach { $0.removeFromParent() }
        overlapIndicators.removeAll()
        
        guard let stack = stack,
              let currentBlock = stack.currentBlock,
              !stack.blocks.isEmpty,
              let targetBlock = stack.blocks.last else { return }
        
        let (leftOverhang, rightOverhang, overlap) = currentBlock.overlapWith(targetBlock)
        let targetY = targetBlock.position.y + targetBlock.height + GameConstants.blockSpacing
        
        // Show overlap area in green
        if overlap > 0 {
            let overlapX = max(currentBlock.position.x, targetBlock.position.x)
            let overlapIndicator = SKShapeNode(rect: CGRect(
                x: -overlap / 2,
                y: -GameConstants.blockHeight / 2,
                width: overlap,
                height: GameConstants.blockHeight
            ))
            
            overlapIndicator.fillColor = UIColor.green.withAlphaComponent(0.3)
            overlapIndicator.strokeColor = UIColor.green.withAlphaComponent(0.6)
            overlapIndicator.lineWidth = 1
            overlapIndicator.position = CGPoint(
                x: overlapX + overlap / 2,
                y: targetY + GameConstants.blockHeight / 2
            )
            overlapIndicator.zPosition = 0.3
            
            addChild(overlapIndicator)
            overlapIndicators.append(overlapIndicator)
        }
        
        // Show overhang areas in red
        if leftOverhang > 0 {
            let leftOverhangIndicator = SKShapeNode(rect: CGRect(
                x: -leftOverhang / 2,
                y: -GameConstants.blockHeight / 2,
                width: leftOverhang,
                height: GameConstants.blockHeight
            ))
            
            leftOverhangIndicator.fillColor = UIColor.red.withAlphaComponent(0.3)
            leftOverhangIndicator.strokeColor = UIColor.red.withAlphaComponent(0.6)
            leftOverhangIndicator.lineWidth = 1
            leftOverhangIndicator.position = CGPoint(
                x: currentBlock.position.x + leftOverhang / 2,
                y: targetY + GameConstants.blockHeight / 2
            )
            leftOverhangIndicator.zPosition = 0.3
            
            addChild(leftOverhangIndicator)
            overlapIndicators.append(leftOverhangIndicator)
        }
        
        if rightOverhang > 0 {
            let rightOverhangIndicator = SKShapeNode(rect: CGRect(
                x: -rightOverhang / 2,
                y: -GameConstants.blockHeight / 2,
                width: rightOverhang,
                height: GameConstants.blockHeight
            ))
            
            rightOverhangIndicator.fillColor = UIColor.red.withAlphaComponent(0.3)
            rightOverhangIndicator.strokeColor = UIColor.red.withAlphaComponent(0.6)
            rightOverhangIndicator.lineWidth = 1
            rightOverhangIndicator.position = CGPoint(
                x: currentBlock.position.x + currentBlock.width - rightOverhang / 2,
                y: targetY + GameConstants.blockHeight / 2
            )
            rightOverhangIndicator.zPosition = 0.3
            
            addChild(rightOverhangIndicator)
            overlapIndicators.append(rightOverhangIndicator)
        }
    }
    
    func animateBlockDrop(completion: @escaping () -> Void) {
        guard let currentBlockNode = currentBlockNode else {
            completion()
            return
        }
        
        // Remove ghost block and overlap indicators when dropping
        ghostBlockNode?.removeFromParent()
        ghostBlockNode = nil
        
        overlapIndicators.forEach { $0.removeFromParent() }
        overlapIndicators.removeAll()
        
        let dropAction = SKAction.moveBy(x: 0, y: -5, duration: 0.05)
        currentBlockNode.run(dropAction) {
            completion()
        }
    }
    
    func animatePerfectStack() {
        guard let currentBlockNode = currentBlockNode else { return }
        
        let scaleUp = SKAction.scale(to: 1.1, duration: 0.1)
        let scaleDown = SKAction.scale(to: 1.0, duration: 0.1)
        let sequence = SKAction.sequence([scaleUp, scaleDown])
        
        currentBlockNode.run(sequence)
        
        // Add particle effect
        createPerfectStackParticles(at: currentBlockNode.position)
    }
    
    private func createPerfectStackParticles(at position: CGPoint) {
        for _ in 0..<20 {
            let particle = SKShapeNode(circleOfRadius: 3)
            particle.fillColor = .yellow
            particle.strokeColor = .clear
            particle.position = position
            particle.alpha = 1.0
            
            addChild(particle)
            
            let angle = CGFloat.random(in: 0...(2 * .pi))
            let distance = CGFloat.random(in: 50...100)
            let moveX = cos(angle) * distance
            let moveY = sin(angle) * distance
            
            let moveAction = SKAction.moveBy(x: moveX, y: moveY, duration: 0.6)
            let fadeOut = SKAction.fadeOut(withDuration: 0.6)
            let scale = SKAction.scale(to: 0.1, duration: 0.6)
            let group = SKAction.group([moveAction, fadeOut, scale])
            let remove = SKAction.removeFromParent()
            
            particle.run(SKAction.sequence([group, remove]))
        }
    }
    
    func animateBlockChop(leftOverhang: CGFloat, rightOverhang: CGFloat, block: Block) {
        guard let blockNode = currentBlockNode else { return }
        
        if leftOverhang > 0 {
            createChoppedPiece(
                width: leftOverhang,
                position: CGPoint(x: blockNode.position.x - blockNode.frame.width/2 - leftOverhang/2,
                                y: blockNode.position.y),
                direction: -1,
                color: UIColor(hex: block.colorHex) ?? .white
            )
        }
        
        if rightOverhang > 0 {
            createChoppedPiece(
                width: rightOverhang,
                position: CGPoint(x: blockNode.position.x + blockNode.frame.width/2 + rightOverhang/2,
                                y: blockNode.position.y),
                direction: 1,
                color: UIColor(hex: block.colorHex) ?? .white
            )
        }
    }
    
    private func createChoppedPiece(width: CGFloat, position: CGPoint, direction: CGFloat, color: UIColor) {
        let rect = CGRect(x: -width/2, y: -GameConstants.blockHeight/2,
                         width: width, height: GameConstants.blockHeight)
        let choppedPiece = SKShapeNode(rect: rect, cornerRadius: 4)
        choppedPiece.fillColor = color
        choppedPiece.strokeColor = .clear
        choppedPiece.position = position
        
        addChild(choppedPiece)
        
        let rotate = SKAction.rotate(byAngle: direction * .pi/4, duration: 0.5)
        let moveX = SKAction.moveBy(x: direction * 100, y: -300, duration: 0.5)
        let fadeOut = SKAction.fadeOut(withDuration: 0.5)
        let group = SKAction.group([rotate, moveX, fadeOut])
        let remove = SKAction.removeFromParent()
        
        choppedPiece.run(SKAction.sequence([group, remove]))
    }
    
    private func updateCamera() {
        guard let camera = cameraNode, let stack = stack else { return }
        
        let blockCount = CGFloat(stack.blocks.count)
        if blockCount > 5 {
            let targetY = initialCameraY - (blockCount - 5) * (GameConstants.blockHeight + GameConstants.blockSpacing)
            let moveAction = SKAction.moveTo(y: targetY, duration: 0.3)
            moveAction.timingMode = .easeInEaseOut
            camera.run(moveAction)
        }
    }
    
    func reset() {
        removeAllChildren()
        blockNodes.removeAll()
        currentBlockNode = nil
        ghostBlockNode = nil
        overlapIndicators.removeAll()
        cameraNode = nil
        setupPhysics()
        setupCamera()
        setupBackground()
    }
}

extension UIColor {
    convenience init?(hex: String) {
        var hexSanitized = hex.trimmingCharacters(in: .whitespacesAndNewlines)
        hexSanitized = hexSanitized.replacingOccurrences(of: "#", with: "")
        
        var rgb: UInt64 = 0
        Scanner(string: hexSanitized).scanHexInt64(&rgb)
        
        let red = CGFloat((rgb & 0xFF0000) >> 16) / 255.0
        let green = CGFloat((rgb & 0x00FF00) >> 8) / 255.0
        let blue = CGFloat(rgb & 0x0000FF) / 255.0
        
        self.init(red: red, green: green, blue: blue, alpha: 1.0)
    }
}