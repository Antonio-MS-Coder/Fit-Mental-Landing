import SwiftUI
#if os(iOS)
import UIKit
#endif

struct StackerGridView: View {
    @StateObject private var grid = StackerGrid.shared
    @StateObject private var gameController = StackRushGameController()
    @EnvironmentObject var gameState: GameState
    
    // Grid visual properties
    private let cellSize: CGFloat = 35
    private let cellSpacing: CGFloat = 2
    
    var body: some View {
        ZStack {
            // Authentic arcade background
            LinearGradient(
                colors: [
                    Color(red: 0.05, green: 0.05, blue: 0.2),
                    Color(red: 0.1, green: 0.1, blue: 0.3)
                ],
                startPoint: .top,
                endPoint: .bottom
            )
            .ignoresSafeArea()
            
            VStack(spacing: 20) {
                // Top HUD - authentic arcade style
                HStack {
                    // Score
                    VStack(alignment: .leading, spacing: 4) {
                        Text("SCORE")
                            .font(.system(size: 12, weight: .bold, design: .monospaced))
                            .foregroundColor(.cyan)
                        Text("\(max(0, (grid.currentRow - 1) * 10))")
                            .font(.system(size: 24, weight: .bold, design: .monospaced))
                            .foregroundColor(.white)
                    }
                    .padding(.horizontal, 16)
                    .padding(.vertical, 12)
                    .background(
                        RoundedRectangle(cornerRadius: 8)
                            .fill(Color.black.opacity(0.7))
                            .overlay(
                                RoundedRectangle(cornerRadius: 8)
                                    .stroke(Color.cyan, lineWidth: 1)
                            )
                    )
                    
                    Spacer()
                    
                    // Level indicator
                    VStack(spacing: 4) {
                        Text("LEVEL")
                            .font(.system(size: 12, weight: .bold, design: .monospaced))
                            .foregroundColor(.cyan)
                        
                        HStack(spacing: 4) {
                            Text("\(gameController.level)")
                                .font(.system(size: 20, weight: .bold, design: .monospaced))
                                .foregroundColor(.white)
                            
                            // Block count indicator
                            HStack(spacing: 2) {
                                ForEach(0..<gameController.blocksInCurrentRow, id: \.self) { _ in
                                    Rectangle()
                                        .fill(Color.cyan)
                                        .frame(width: 6, height: 6)
                                }
                            }
                        }
                    }
                    .padding(.horizontal, 16)
                    .padding(.vertical, 12)
                    .background(
                        RoundedRectangle(cornerRadius: 8)
                            .fill(Color.black.opacity(0.7))
                            .overlay(
                                RoundedRectangle(cornerRadius: 8)
                                    .stroke(Color.cyan, lineWidth: 1)
                            )
                    )
                }
                .padding(.horizontal, 20)
                
                Spacer()
                
                // Main Stacker Grid - authentic arcade style
                VStack(spacing: cellSpacing) {
                    // Build grid from top to bottom (visually), but array is bottom to top
                    ForEach((0..<grid.rows).reversed(), id: \.self) { row in
                        HStack(spacing: cellSpacing) {
                            ForEach(0..<grid.cols, id: \.self) { col in
                                StackerCell(
                                    isLit: grid.grid[row][col],
                                    row: row,
                                    col: col,
                                    isTarget: shouldHighlightAsTarget(row: row, col: col),
                                    isMoving: isCurrentMovingBlock(row: row, col: col),
                                    hasBlockBelow: hasBlockBelow(row: row, col: col)
                                )
                                .frame(width: cellSize, height: cellSize)
                            }
                        }
                    }
                }
                .padding(16)
                .background(
                    RoundedRectangle(cornerRadius: 12)
                        .fill(Color.black.opacity(0.8))
                        .overlay(
                            RoundedRectangle(cornerRadius: 12)
                                .stroke(
                                    LinearGradient(
                                        colors: [.cyan, .blue],
                                        startPoint: .topLeading,
                                        endPoint: .bottomTrailing
                                    ),
                                    lineWidth: 3
                                )
                        )
                )
                
                Spacer()
                
                // Instructions - simplified without distracting perfect popup
                if grid.gameActive {
                    VStack(spacing: 8) {
                        Image(systemName: "hand.tap.fill")
                            .font(.title2)
                            .foregroundColor(.cyan)
                        
                        Text("TAP TO DROP BLOCKS")
                            .font(.system(size: 16, weight: .bold, design: .monospaced))
                            .foregroundColor(.white)
                    }
                    .padding(.bottom, 40)
                }
                
            }
            
            // Prize notifications - full screen overlay
            if gameController.prizeState != .none {
                PrizeEventView(
                    prizeState: gameController.prizeState,
                    onContinue: {
                        gameController.acknowledgePrize()
                        if grid.currentRow < grid.rows {
                            grid.spawnNewRow()
                        }
                    },
                    onCollect: {
                        gameController.acknowledgePrize()
                        gameState.endGame(score: max(0, (grid.currentRow - 1) * 10))
                    }
                )
            }
            
            // Game Over overlay - full screen
            if gameState.phase == .gameOver {
                ArcadeGameOverView(
                    score: gameState.currentScore, // Use the score stored in GameState
                    level: gameController.level,
                    blocksPlaced: max(0, grid.currentRow - 1), // Actual blocks placed successfully
                    onRestart: {
                        // Properly restart the game
                        gameState.startGame()
                        DispatchQueue.main.async {
                            startNewGame()
                        }
                    },
                    onMenu: {
                        gameState.returnToMenu()
                    }
                )
            }
        }
        .onAppear {
            startNewGame()
        }
        .onTapGesture {
            handleTap()
        }
    }
    
    private func shouldHighlightAsTarget(row: Int, col: Int) -> Bool {
        // Highlight cells that would be hit by current moving blocks
        guard grid.gameActive && row == grid.currentRow - 1 else { return false }
        return grid.currentBlocks.contains(col)
    }
    
    private func isCurrentMovingBlock(row: Int, col: Int) -> Bool {
        // Check if this is a currently moving block
        guard grid.gameActive && row == grid.currentRow else { return false }
        return grid.currentBlocks.contains(col)
    }
    
    private func hasBlockBelow(row: Int, col: Int) -> Bool {
        // Check if there's a block in the row below
        guard row > 0 else { return true } // Bottom row always has "support"
        return grid.grid[row - 1][col]
    }
    
    private func isPerfectAlignment() -> Bool {
        // Check if current moving blocks would create perfect alignment
        guard grid.gameActive && grid.currentRow > 0 else { return false }
        
        let previousRow = grid.currentRow - 1
        var perfectMatch = true
        
        // Check if all current blocks align with blocks below
        for col in grid.currentBlocks {
            if !grid.grid[previousRow][col] {
                perfectMatch = false
                break
            }
        }
        
        // Also check that no extra blocks are hanging over
        let previousRowBlocks = grid.grid[previousRow].enumerated().compactMap { index, isLit in
            isLit ? index : nil
        }
        
        return perfectMatch && Set(grid.currentBlocks) == Set(previousRowBlocks)
    }
    
    private func startNewGame() {
        gameController.startNewGame(mode: gameState.currentGameMode)
        grid.startGame(with: gameController)
        // Start background music for gameplay
        SoundManager.shared.startBackgroundMusic()
    }
    
    private func handleTap() {
        // Only handle taps during active gameplay
        guard grid.gameActive else { return }
        
        let success = grid.dropBlocks()
        if !success {
            // Game over - strong haptic feedback
            #if os(iOS)
            let haptic = UINotificationFeedbackGenerator()
            haptic.notificationOccurred(.error)
            #endif
            gameState.endGame(score: max(0, (grid.currentRow - 1) * 10))
        } else {
            // Success - light haptic feedback
            #if os(iOS)
            let haptic = UIImpactFeedbackGenerator(style: .light)
            haptic.impactOccurred()
            #endif
            
            // Check for prize events
            if gameController.level == GameConstants.minorPrizeLevel {
                gameController.prizeState = .minorPrize
                #if os(iOS)
                let successHaptic = UINotificationFeedbackGenerator()
                successHaptic.notificationOccurred(.success)
                #endif
            } else if gameController.level == GameConstants.majorPrizeLevel {
                gameController.prizeState = .majorPrize
                #if os(iOS)
                let successHaptic = UINotificationFeedbackGenerator()
                successHaptic.notificationOccurred(.success)
                #endif
            }
        }
    }
}

struct StackerCell: View {
    let isLit: Bool
    let row: Int
    let col: Int
    let isTarget: Bool
    let isMoving: Bool
    let hasBlockBelow: Bool
    
    @State private var animationAmount: CGFloat = 1.0
    
    var body: some View {
        Rectangle()
            .fill(cellColor)
            .overlay(
                Rectangle()
                    .stroke(borderColor, lineWidth: strokeWidth)
            )
            .overlay(
                // Enhanced glow effect
                Rectangle()
                    .fill(glowGradient)
                    .blendMode(.overlay)
            )
            .overlay(
                // Moving block animation overlay - no scale effect
                Rectangle()
                    .stroke(
                        isMoving ? Color.white.opacity(0.8) : Color.clear,
                        lineWidth: 2
                    )
                    .opacity(isMoving ? 0.6 : 0)
            )
            .shadow(color: shadowColor, radius: shadowRadius)
            .animation(.easeInOut(duration: 0.2), value: isLit)
    }
    
    private var cellColor: Color {
        if isLit {
            return blockColor
        } else {
            return Color(red: 0.1, green: 0.1, blue: 0.2).opacity(0.8)
        }
    }
    
    private var borderColor: Color {
        if isMoving {
            return Color.white
        } else if isLit {
            return Color.white.opacity(0.8)
        } else if isTarget {
            return Color.cyan.opacity(0.8)
        } else {
            return Color.white.opacity(0.2)
        }
    }
    
    private var strokeWidth: CGFloat {
        if isMoving {
            return 3
        } else if isLit {
            return 2
        } else if isTarget {
            return 2
        } else {
            return 1
        }
    }
    
    
    private var shadowColor: Color {
        if isMoving {
            return blockColor.opacity(0.8)
        } else if isLit {
            return blockColor.opacity(0.4)
        } else {
            return Color.clear
        }
    }
    
    private var shadowRadius: CGFloat {
        if isMoving {
            return 8
        } else if isLit {
            return 4
        } else {
            return 0
        }
    }
    
    private var glowGradient: LinearGradient {
        if isLit || isMoving {
            return LinearGradient(
                colors: [
                    blockColor.opacity(0.8),
                    blockColor.opacity(0.3),
                    Color.clear
                ],
                startPoint: .center,
                endPoint: .bottom
            )
        } else {
            return LinearGradient(colors: [Color.clear], startPoint: .top, endPoint: .bottom)
        }
    }
    
    private var blockColor: Color {
        // Authentic arcade colors - warm at bottom, cool at top
        let normalizedRow = Double(row) / 15.0
        
        if normalizedRow < 0.3 {
            // Bottom rows - warm colors (red/orange/yellow)
            return Color(red: 1.0, green: 0.3 + normalizedRow, blue: 0.1)
        } else if normalizedRow < 0.7 {
            // Middle rows - green
            return Color(red: 0.2, green: 1.0, blue: 0.3)
        } else {
            // Top rows - cool colors (blue/cyan)
            return Color(red: 0.1, green: 0.7, blue: 1.0)
        }
    }
}

#Preview {
    StackerGridView()
        .environmentObject(GameState())
}