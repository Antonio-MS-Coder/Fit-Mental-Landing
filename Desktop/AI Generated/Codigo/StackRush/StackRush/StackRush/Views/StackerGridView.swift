import SwiftUI
#if os(iOS)
import UIKit
#endif

struct StackerGridView: View {
    @StateObject private var grid = StackerGrid.shared
    @StateObject private var gameController = StackRushGameController()
    @StateObject private var inventoryManager = InventoryManager.shared
    @EnvironmentObject var gameState: GameState
    
    // Grid visual properties
    private let cellSize: CGFloat = 35
    private let cellSpacing: CGFloat = 2
    
    var body: some View {
        ZStack {
            // Dynamic theme background
            DesignSystem.Colors.backgroundPrimary
                .ignoresSafeArea()
            
            VStack(spacing: 20) {
                // Top HUD - authentic arcade style
                HStack {
                    // Score
                    VStack(alignment: .leading, spacing: 4) {
                        Text("SCORE")
                            .font(.system(size: 12, weight: .bold, design: .monospaced))
                            .foregroundColor(DesignSystem.Colors.brandTeal)
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
                                    .stroke(DesignSystem.Colors.brandTeal, lineWidth: 1)
                            )
                    )
                    
                    Spacer()
                    
                    // Coins display
                    VStack(alignment: .center, spacing: 4) {
                        Text("COINS")
                            .font(.system(size: 12, weight: .bold, design: .monospaced))
                            .foregroundColor(DesignSystem.Colors.brandTeal)
                        HStack(spacing: 4) {
                            Image(systemName: "dollarsign.circle.fill")
                                .font(.system(size: 16, weight: .bold))
                                .foregroundColor(.yellow)
                            Text("\(gameState.coinsManager.coinBalance)")
                                .font(.system(size: 20, weight: .bold, design: .monospaced))
                                .foregroundColor(.white)
                        }
                    }
                    .padding(.horizontal, 16)
                    .padding(.vertical, 12)
                    .background(
                        RoundedRectangle(cornerRadius: 8)
                            .fill(Color.black.opacity(0.7))
                            .overlay(
                                RoundedRectangle(cornerRadius: 8)
                                    .stroke(DesignSystem.Colors.brandTeal, lineWidth: 1)
                            )
                    )
                    
                    Spacer()
                    
                    // Level indicator  
                    VStack(spacing: 4) {
                        Text("LEVEL")
                            .font(.system(size: 12, weight: .bold, design: .monospaced))
                            .foregroundColor(DesignSystem.Colors.brandTeal)
                        
                        HStack(spacing: 4) {
                            Text("\(gameController.level)")
                                .font(.system(size: 20, weight: .bold, design: .monospaced))
                                .foregroundColor(.white)
                            
                            // Block count indicator
                            HStack(spacing: 2) {
                                ForEach(0..<gameController.blocksInCurrentRow, id: \.self) { _ in
                                    Circle()
                                        .fill(DesignSystem.Colors.brandTeal)
                                        .frame(width: 8, height: 8)
                                }
                            }
                        }
                    }
                    .padding(.horizontal, 16)
                    .padding(.vertical, 12)
                    .background(
                        Circle()
                            .fill(Color.black.opacity(0.7))
                            .overlay(
                                Circle()
                                    .stroke(DesignSystem.Colors.brandTeal, lineWidth: 1)
                            )
                    )
                    
                    Spacer()
                    
                    // Pause button in corner
                    Button(action: {
                        SoundManager.shared.playButtonTapSound()
                        gameState.pauseGame()
                    }) {
                        Image(systemName: "pause.fill")
                            .font(.system(size: 18, weight: .bold))
                            .foregroundColor(DesignSystem.Colors.brandTeal)
                            .frame(width: 40, height: 40)
                            .background(
                                Circle()
                                    .fill(Color.black.opacity(0.7))
                                    .overlay(
                                        Circle()
                                            .stroke(Color.cyan, lineWidth: 1)
                                    )
                            )
                    }
                }
                .padding(.horizontal, 20)
                
                Spacer()
                
                // Main Stacker Grid - authentic arcade style with scrolling for infinite mode
                stackerGridContent
                .background(
                    RoundedRectangle(cornerRadius: 12)
                        .fill(Color.black.opacity(0.8))
                        .overlay(
                            RoundedRectangle(cornerRadius: 12)
                                .stroke(
                                    LinearGradient(
                                        colors: [DesignSystem.Colors.brandTeal, DesignSystem.Colors.brandPurple],
                                        startPoint: .topLeading,
                                        endPoint: .bottomTrailing
                                    ),
                                    lineWidth: 3
                                )
                        )
                )
                
                Spacer()
                
                // Power-up buttons during gameplay
                if grid.gameActive {
                    VStack(spacing: 8) {
                        HStack(spacing: 16) {
                            ForEach(PowerUp.allCases, id: \.self) { powerUp in
                                PowerUpButton(
                                    powerUp: powerUp,
                                    count: inventoryManager.getPowerUpCount(powerUp),
                                    isActive: inventoryManager.isPowerUpActive(powerUp),
                                    onActivate: {
                                        inventoryManager.activatePowerUp(powerUp)
                                    }
                                )
                            }
                        }
                        .padding(.horizontal, 20)
                        
                        // Active power-up indicators
                        if !inventoryManager.activePowerUps.isEmpty {
                            HStack(spacing: 12) {
                                ForEach(Array(inventoryManager.activePowerUps), id: \.self) { activePowerUp in
                                    HStack(spacing: 4) {
                                        Image(systemName: activePowerUp.icon)
                                            .font(.system(size: 12, weight: .bold))
                                            .foregroundColor(DesignSystem.Colors.brandTeal)
                                        Text("ACTIVE")
                                            .font(.system(size: 10, weight: .bold, design: .monospaced))
                                            .foregroundColor(DesignSystem.Colors.brandTeal)
                                    }
                                    .padding(.horizontal, 8)
                                    .padding(.vertical, 4)
                                    .background(
                                        RoundedRectangle(cornerRadius: 8)
                                            .fill(DesignSystem.Colors.brandTeal.opacity(0.2))
                                            .overlay(
                                                RoundedRectangle(cornerRadius: 8)
                                                    .stroke(DesignSystem.Colors.brandTeal, lineWidth: 1)
                                            )
                                    )
                                    .scaleEffect(1.05)
                                    .animation(.easeInOut(duration: 0.6).repeatForever(autoreverses: true), value: inventoryManager.isPowerUpActive(activePowerUp))
                                }
                            }
                        }
                    }
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
            
            // Pause overlay - full screen
            if gameState.phase == .paused {
                Color.black.opacity(0.8)
                    .ignoresSafeArea()
                    .onTapGesture {
                        // Prevent tap through
                    }
                
                VStack(spacing: 30) {
                    Text("PAUSED")
                        .font(.system(size: 48, weight: .bold, design: .monospaced))
                        .foregroundColor(DesignSystem.Colors.brandTeal)
                        .neonGlow(color: DesignSystem.Colors.brandTeal, radius: 12)
                    
                    VStack(spacing: 20) {
                        // Resume button
                        Button(action: {
                            SoundManager.shared.playButtonTapSound()
                            gameState.resumeGame()
                        }) {
                            Text("RESUME")
                                .font(.system(size: 18, weight: .bold, design: .monospaced))
                                .foregroundColor(.black)
                                .frame(width: 200, height: 50)
                                .background(
                                    LinearGradient(
                                        colors: [DesignSystem.Colors.brandTeal, DesignSystem.Colors.accentCyan],
                                        startPoint: .top,
                                        endPoint: .bottom
                                    )
                                )
                                .clipShape(RoundedRectangle(cornerRadius: 12))
                        }
                        
                        // Menu button
                        Button(action: {
                            SoundManager.shared.playButtonTapSound()
                            gameState.returnToMenu()
                        }) {
                            Text("MENU")
                                .font(.system(size: 18, weight: .bold, design: .monospaced))
                                .foregroundColor(DesignSystem.Colors.brandTeal)
                                .frame(width: 200, height: 50)
                                .background(
                                    RoundedRectangle(cornerRadius: 12)
                                        .stroke(DesignSystem.Colors.brandTeal, lineWidth: 2)
                                        .background(
                                            RoundedRectangle(cornerRadius: 12)
                                                .fill(Color.black.opacity(0.3))
                                        )
                                )
                        }
                    }
                }
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
        .onChange(of: gameState.phase) { _, newPhase in
            switch newPhase {
            case .paused:
                grid.pauseGame()
            case .playing:
                grid.resumeGame()
            default:
                break
            }
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
        // Only handle taps during active gameplay and when not paused
        guard grid.gameActive && gameState.phase == .playing else { return }
        
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
    
    @ViewBuilder
    private var stackerGridContent: some View {
        if gameState.currentGameMode == .infinite {
            ScrollViewReader { proxy in
                ScrollView(.vertical, showsIndicators: false) {
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
                            .id(row)
                        }
                    }
                    .padding(16)
                }
                .onChange(of: grid.currentRow) { _, newRow in
                    // Auto-scroll to keep current action visible
                    withAnimation(.easeInOut(duration: 0.3)) {
                        proxy.scrollTo(newRow, anchor: .center)
                    }
                }
            }
        } else {
            // Classic mode - fixed grid view
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
        }
    }
}

struct PowerUpButton: View {
    let powerUp: PowerUp
    let count: Int
    let isActive: Bool
    let onActivate: () -> Void
    
    var body: some View {
        Button(action: {
            // Extra Life can't be manually activated - it's automatic
            if powerUp != .extraLife && count > 0 && !isActive {
                onActivate()
            }
        }) {
            VStack(spacing: 4) {
                ZStack {
                    Circle()
                        .fill(backgroundColor)
                        .frame(width: 50, height: 50)
                        .overlay(
                            Circle()
                                .stroke(borderColor, lineWidth: 2)
                        )
                    
                    Image(systemName: powerUp.icon)
                        .font(.system(size: 20, weight: .bold))
                        .foregroundColor(iconColor)
                }
                
                // Count badge or price
                if count > 0 {
                    Text("\(count)")
                        .font(.system(size: 12, weight: .bold))
                        .foregroundColor(.white)
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(
                            RoundedRectangle(cornerRadius: 8)
                                .fill(Color.black.opacity(0.7))
                        )
                } else {
                    // Show price when user has 0 in inventory
                    HStack(spacing: 2) {
                        Image(systemName: "dollarsign.circle.fill")
                            .font(.system(size: 10, weight: .bold))
                            .foregroundColor(.yellow)
                        Text("\(powerUp.price)")
                            .font(.system(size: 10, weight: .bold))
                            .foregroundColor(.yellow)
                    }
                    .padding(.horizontal, 6)
                    .padding(.vertical, 2)
                    .background(
                        RoundedRectangle(cornerRadius: 8)
                            .fill(Color.black.opacity(0.5))
                            .overlay(
                                RoundedRectangle(cornerRadius: 8)
                                    .stroke(Color.yellow.opacity(0.6), lineWidth: 1)
                            )
                    )
                }
            }
        }
        .disabled(count == 0 || isActive || powerUp == .extraLife)
        .opacity(isActive ? 0.5 : (powerUp == .extraLife ? 0.8 : 1.0))
        .scaleEffect(isActive ? 0.9 : 1.0)
        .animation(.easeInOut(duration: 0.2), value: isActive)
    }
    
    private var backgroundColor: Color {
        if isActive {
            return DesignSystem.Colors.brandTeal.opacity(0.3)
        } else if powerUp == .extraLife && count > 0 {
            return Color.red.opacity(0.3) // Different color for Extra Life
        } else if count > 0 {
            return Color.black.opacity(0.5)
        } else {
            return Color.black.opacity(0.2)
        }
    }
    
    private var borderColor: Color {
        if isActive {
            return DesignSystem.Colors.brandTeal
        } else if powerUp == .extraLife && count > 0 {
            return Color.red.opacity(0.8) // Red border for Extra Life
        } else if count > 0 {
            return DesignSystem.Colors.accentCyan
        } else {
            return Color.gray.opacity(0.5)
        }
    }
    
    private var iconColor: Color {
        if isActive {
            return DesignSystem.Colors.brandTeal
        } else if powerUp == .extraLife && count > 0 {
            return Color.red // Red icon for Extra Life
        } else if count > 0 {
            return .white
        } else {
            return .gray
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
            return DesignSystem.Colors.brandTeal.opacity(0.8)
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