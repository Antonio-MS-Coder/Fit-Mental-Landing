import SwiftUI
import SpriteKit
#if os(iOS)
import UIKit
#endif

struct GameView: View {
    @StateObject private var stack = Stack()
    @StateObject private var gameLoop = GameLoop()
    @EnvironmentObject var gameState: GameState
    @State private var scene: GameScene?
    @State private var screenWidth: CGFloat = 400 // Default width, will be updated in GeometryReader
    @State private var isPaused = false
    
    var body: some View {
        ZStack {
            // Sophisticated gradient background inspired by logo
            DesignSystem.Colors.backgroundPrimary
                .ignoresSafeArea()
            
            GeometryReader { geometry in
                SpriteView(scene: makeScene(size: geometry.size))
                    .ignoresSafeArea()
                    .allowsHitTesting(true)
                    .focusable(false)
                    .onAppear {
                        screenWidth = geometry.size.width
                    }
            }
            
            VStack {
                // Redesigned top HUD with better spacing
                HStack {
                    // Minimalist score display
                    HStack(spacing: DesignSystem.Spacing.sm) {
                        Text("SCORE")
                            .font(DesignSystem.Typography.monoSmall(weight: .medium))
                            .foregroundColor(DesignSystem.Colors.textSecondary)
                        Text("\(stack.score)")
                            .font(DesignSystem.Typography.monoLarge(weight: .bold))
                            .foregroundColor(DesignSystem.Colors.textPrimary)
                    }
                    .padding(.horizontal, DesignSystem.Spacing.md)
                    .padding(.vertical, DesignSystem.Spacing.sm)
                    .background(
                        Capsule()
                            .fill(Color.black.opacity(0.3))
                            .overlay(
                                Capsule()
                                    .stroke(Color.white.opacity(0.15), lineWidth: 1)
                            )
                    )
                    
                    Spacer()
                    
                    // Minimalist pause button
                    Button(action: {
                        isPaused.toggle()
                        if isPaused {
                            gameLoop.pause()
                        } else {
                            gameLoop.resume()
                        }
                    }) {
                        Image(systemName: isPaused ? "play.fill" : "pause.fill")
                            .font(.system(size: 18, weight: .medium))
                            .foregroundColor(DesignSystem.Colors.textPrimary)
                            .frame(width: 40, height: 40)
                            .background(
                                Circle()
                                    .fill(Color.black.opacity(0.3))
                                    .overlay(
                                        Circle()
                                            .stroke(Color.white.opacity(0.15), lineWidth: 1)
                                    )
                            )
                    }
                    
                    Spacer()
                    
                    if stack.combo > 0 {
                        HStack(spacing: DesignSystem.Spacing.xs) {
                            Text("×\(stack.combo)")
                                .font(DesignSystem.Typography.monoLarge(weight: .bold))
                                .foregroundColor(DesignSystem.Colors.accentGold)
                            Text("COMBO")
                                .font(DesignSystem.Typography.monoSmall(weight: .medium))
                                .foregroundColor(DesignSystem.Colors.textSecondary)
                        }
                        .padding(.horizontal, DesignSystem.Spacing.md)
                        .padding(.vertical, DesignSystem.Spacing.sm)
                        .background(
                            Capsule()
                                .fill(DesignSystem.Colors.accentGold.opacity(0.1))
                                .overlay(
                                    Capsule()
                                        .stroke(DesignSystem.Colors.accentGold.opacity(0.3), lineWidth: 1)
                                )
                        )
                        .transition(.asymmetric(
                            insertion: .scale(scale: 0.8).combined(with: .opacity),
                            removal: .scale(scale: 1.2).combined(with: .opacity)
                        ))
                        .animation(.spring(response: 0.4, dampingFraction: 0.7), value: stack.combo)
                    }
                }
                .padding(DesignSystem.Spacing.lg)
                
                Spacer()
                
                // Redesigned bottom area with better spacing
                if !stack.gameOver {
                    if stack.blocks.count <= 2 {
                        // Minimal floating instruction
                        VStack(spacing: DesignSystem.Spacing.xs) {
                            Image(systemName: "hand.tap")
                                .font(.system(size: 20, weight: .light))
                                .foregroundColor(DesignSystem.Colors.textSecondary)
                            
                            Text("TAP TO DROP")
                                .font(DesignSystem.Typography.monoSmall(weight: .medium))
                                .foregroundColor(DesignSystem.Colors.textSecondary)
                        }
                        .padding(.horizontal, DesignSystem.Spacing.lg)
                        .padding(.vertical, DesignSystem.Spacing.md)
                        .background(
                            RoundedRectangle(cornerRadius: DesignSystem.Radius.medium)
                                .fill(Color.black.opacity(0.4))
                                .overlay(
                                    RoundedRectangle(cornerRadius: DesignSystem.Radius.medium)
                                        .stroke(Color.white.opacity(0.1), lineWidth: 1)
                                )
                        )
                        .padding(.bottom, 60) // Safe distance from bottom
                    } else {
                        // Horizontal alignment indicators
                        HStack(spacing: DesignSystem.Spacing.md) {
                            AlignmentDot(
                                isActive: isCurrentAlignmentPerfect(),
                                color: DesignSystem.Colors.success,
                                label: "PERFECT"
                            )
                            
                            AlignmentDot(
                                isActive: isCurrentAlignmentGood() && !isCurrentAlignmentPerfect(),
                                color: DesignSystem.Colors.warning,
                                label: "GOOD"
                            )
                            
                            AlignmentDot(
                                isActive: !isCurrentAlignmentGood(),
                                color: DesignSystem.Colors.error,
                                label: "MISS"
                            )
                        }
                        .padding(.bottom, 60) // Safe distance from bottom
                    }
                }
            }
            
            if stack.gameOver {
                GameOverView(score: stack.score) {
                    Task { @MainActor in
                        stack.startNewGame()
                        scene?.reset()
                        isPaused = false
                        gameLoop.start(stack: stack, scene: scene)
                    }
                } onMenu: {
                    Task { @MainActor in
                        gameLoop.stop()
                        gameState.returnToMenu()
                    }
                }
            }
        }
        .onAppear {
            gameLoop.screenWidth = screenWidth
            stack.startNewGame()
        }
        .onDisappear {
            gameLoop.stop()
        }
        .onChange(of: screenWidth) { _, newWidth in
            gameLoop.screenWidth = newWidth
        }
        .contentShape(Rectangle())
        .onTapGesture {
            handleTap()
        }
    }
    
    private func makeScene(size: CGSize) -> GameScene {
        if let existingScene = scene {
            return existingScene
        }
        
        let newScene = GameScene()
        newScene.size = size
        newScene.scaleMode = .fill
        newScene.stack = stack
        
        // Use a task to avoid state modification during view update
        Task { @MainActor in
            scene = newScene
            gameLoop.start(stack: stack, scene: newScene)
        }
        
        return newScene
    }
    
    private func handleTap() {
        guard !stack.gameOver && !isPaused else { return }
        
        let currentBlock = stack.currentBlock
        scene?.animateBlockDrop {
            // Use a task to handle state changes properly
            Task { @MainActor in
                if stack.stopCurrentBlock() {
                    if stack.combo > 2 {
                        scene?.animatePerfectStack()
                        SoundManager.shared.playPerfectStackSound()
                    } else {
                        SoundManager.shared.playStackSound()
                        if let chopInfo = stack.lastChopInfo, let block = currentBlock {
                            scene?.animateBlockChop(leftOverhang: chopInfo.leftOverhang,
                                                  rightOverhang: chopInfo.rightOverhang,
                                                  block: block)
                            stack.lastChopInfo = nil
                        }
                    }
                    stack.spawnNextBlock()
                } else {
                    SoundManager.shared.playGameOverSound()
                    stack.recordStats()
                    gameLoop.stop()
                    gameState.endGame(score: stack.score)
                }
            }
        }
    }
    
    private func isCurrentAlignmentPerfect() -> Bool {
        guard let currentBlock = stack.currentBlock,
              !stack.blocks.isEmpty,
              let targetBlock = stack.blocks.last else { return false }
        
        let (leftOverhang, rightOverhang, _) = currentBlock.overlapWith(targetBlock)
        return leftOverhang < 1 && rightOverhang < 1
    }
    
    private func isCurrentAlignmentGood() -> Bool {
        guard let currentBlock = stack.currentBlock,
              !stack.blocks.isEmpty,
              let targetBlock = stack.blocks.last else { return false }
        
        let (_, _, overlap) = currentBlock.overlapWith(targetBlock)
        return overlap > 0
    }
}

// MARK: - Supporting Components
struct AlignmentDot: View {
    let isActive: Bool
    let color: Color
    let label: String
    
    var body: some View {
        VStack(spacing: DesignSystem.Spacing.xs) {
            Circle()
                .fill(isActive ? color : Color.white.opacity(0.2))
                .frame(width: 12, height: 12)
                .overlay(
                    Circle()
                        .stroke(color.opacity(isActive ? 1.0 : 0.3), lineWidth: 1)
                )
                .scaleEffect(isActive ? 1.2 : 1.0)
                .animation(.easeInOut(duration: 0.2), value: isActive)
            
            Text(label)
                .font(.system(size: 10, weight: .medium, design: .monospaced))
                .foregroundColor(isActive ? color : DesignSystem.Colors.textTertiary)
                .opacity(isActive ? 1.0 : 0.6)
        }
    }
}

struct StatusIndicator: View {
    let text: String
    let color: Color
    let isActive: Bool
    
    var body: some View {
        Text(text)
            .font(DesignSystem.Typography.monoSmall(weight: .semibold))
            .foregroundColor(isActive ? color : DesignSystem.Colors.textTertiary)
            .padding(.horizontal, DesignSystem.Spacing.sm)
            .padding(.vertical, DesignSystem.Spacing.xs)
            .background(
                RoundedRectangle(cornerRadius: DesignSystem.Radius.small)
                    .fill(isActive ? color.opacity(0.2) : Color.clear)
            )
            .overlay(
                RoundedRectangle(cornerRadius: DesignSystem.Radius.small)
                    .stroke(isActive ? color.opacity(0.6) : Color.white.opacity(0.1), lineWidth: 1)
            )
            .scaleEffect(isActive ? 1.05 : 1.0)
            .animation(.easeInOut(duration: 0.2), value: isActive)
    }
}