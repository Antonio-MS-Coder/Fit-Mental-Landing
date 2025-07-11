import SwiftUI

struct MenuView: View {
    @EnvironmentObject var gameState: GameState
    @StateObject private var soundManager = SoundManager.shared
    @StateObject private var inventoryManager = InventoryManager.shared
    @State private var titleScale: CGFloat = 0.5
    @State private var titleOpacity: Double = 0
    @State private var buttonOffset: CGFloat = 50
    @State private var buttonOpacity: Double = 0
    @State private var showStore = false
    
    var body: some View {
        ZStack {
            // Sophisticated brand background
            DesignSystem.Colors.backgroundPrimary
                .ignoresSafeArea()
            
            // Top UI elements - coins and music toggle
            VStack {
                HStack {
                    // Coins display - top left corner
                    HStack(spacing: DesignSystem.Spacing.xs) {
                        Image(systemName: "dollarsign.circle.fill")
                            .font(.system(size: 20, weight: .medium))
                            .foregroundColor(DesignSystem.Colors.brandTeal)
                        
                        Text("\(gameState.coinsManager.coinBalance)")
                            .font(DesignSystem.Typography.bodyMedium(weight: .bold))
                            .foregroundColor(DesignSystem.Colors.textPrimary)
                    }
                    .padding(.horizontal, 16)
                    .padding(.vertical, 8)
                    .background(
                        RoundedRectangle(cornerRadius: DesignSystem.Radius.medium)
                            .fill(Color.black.opacity(0.5))
                            .overlay(
                                RoundedRectangle(cornerRadius: DesignSystem.Radius.medium)
                                    .stroke(DesignSystem.Colors.brandTeal, lineWidth: 1)
                            )
                    )
                    
                    
                    Spacer()
                    
                    // Music toggle button - top right corner
                    Button(action: {
                        soundManager.toggleMusic()
                        SoundManager.shared.playButtonTapSound()
                    }) {
                        Image(systemName: soundManager.isMusicEnabled ? "speaker.wave.2.fill" : "speaker.slash.fill")
                            .font(.system(size: 24, weight: .medium))
                            .foregroundColor(soundManager.isMusicEnabled ? DesignSystem.Colors.brandTeal : DesignSystem.Colors.textTertiary)
                            .frame(width: 50, height: 50)
                            .background(
                                Circle()
                                    .fill(Color.black.opacity(0.5))
                                    .overlay(
                                        Circle()
                                            .stroke(soundManager.isMusicEnabled ? DesignSystem.Colors.brandTeal : DesignSystem.Colors.textTertiary, lineWidth: 1)
                                    )
                            )
                    }
                    .accessibilityLabel(soundManager.isMusicEnabled ? "Mute music" : "Unmute music")
                }
                .padding(.horizontal, 20)
                .padding(.top, 10)
                Spacer()
            }
            
            VStack(spacing: DesignSystem.Spacing.xxl) {
                // Premium title with brand-consistent styling
                VStack(spacing: DesignSystem.Spacing.sm) {
                    Text("STACK")
                        .font(DesignSystem.Typography.displayLarge(weight: .heavy))
                        .foregroundStyle(
                            LinearGradient(
                                gradient: Gradient(colors: [
                                    DesignSystem.Colors.brandTeal,
                                    DesignSystem.Colors.accentCyan
                                ]),
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                        .neonGlow(color: DesignSystem.Colors.brandTeal, radius: 12)
                    
                    Text("RUSH")
                        .font(DesignSystem.Typography.displayLarge(weight: .heavy))
                        .foregroundStyle(
                            LinearGradient(
                                gradient: Gradient(colors: [
                                    DesignSystem.Colors.brandPurple,
                                    DesignSystem.Colors.accentCyan
                                ]),
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                        .neonGlow(color: DesignSystem.Colors.brandPurple, radius: 12)
                }
                .scaleEffect(titleScale)
                .opacity(titleOpacity)
                
                // Game Mode Selector
                VStack(spacing: DesignSystem.Spacing.sm) {
                    Text("GAME MODE")
                        .font(DesignSystem.Typography.monoSmall(weight: .semibold))
                        .foregroundColor(DesignSystem.Colors.textTertiary)
                    
                    HStack(spacing: DesignSystem.Spacing.md) {
                        ForEach(GameMode.allCases, id: \.self) { mode in
                            Button(action: {
                                SoundManager.shared.playButtonTapSound()
                                gameState.setGameMode(mode)
                            }) {
                                Text(mode.description)
                                    .font(DesignSystem.Typography.bodyMedium(weight: .semibold))
                                    .foregroundColor(gameState.currentGameMode == mode ? .black : DesignSystem.Colors.textPrimary)
                                    .frame(width: 100, height: 40)
                                    .background(
                                        gameState.currentGameMode == mode ? 
                                        LinearGradient(
                                            gradient: Gradient(colors: [
                                                DesignSystem.Colors.brandTeal,
                                                DesignSystem.Colors.accentCyan
                                            ]),
                                            startPoint: .top,
                                            endPoint: .bottom
                                        ) :
                                        LinearGradient(
                                            gradient: Gradient(colors: [Color.clear]),
                                            startPoint: .top,
                                            endPoint: .bottom
                                        )
                                    )
                                    .overlay(
                                        RoundedRectangle(cornerRadius: DesignSystem.Radius.medium)
                                            .stroke(gameState.currentGameMode == mode ? Color.clear : DesignSystem.Colors.textTertiary.opacity(0.3), lineWidth: 1)
                                    )
                                    .clipShape(RoundedRectangle(cornerRadius: DesignSystem.Radius.medium))
                            }
                        }
                    }
                }
                .padding(.top, DesignSystem.Spacing.lg)
                .offset(y: buttonOffset)
                .opacity(buttonOpacity)
                
                VStack(spacing: DesignSystem.Spacing.lg) {
                    // Premium play button with sophisticated styling
                    Button(action: {
                        SoundManager.shared.playButtonTapSound()
                        gameState.startGame()
                    }) {
                        Text("PLAY")
                            .font(DesignSystem.Typography.bodyLarge(weight: .bold))
                            .foregroundColor(.black)
                            .frame(width: 220, height: 64)
                            .background(
                                LinearGradient(
                                    gradient: Gradient(colors: [
                                        DesignSystem.Colors.brandTeal,
                                        DesignSystem.Colors.accentCyan
                                    ]),
                                    startPoint: .top,
                                    endPoint: .bottom
                                )
                            )
                            .clipShape(RoundedRectangle(cornerRadius: DesignSystem.Radius.xlarge))
                            .overlay(
                                RoundedRectangle(cornerRadius: DesignSystem.Radius.xlarge)
                                    .stroke(Color.white.opacity(0.3), lineWidth: 1)
                            )
                            .neonGlow(color: DesignSystem.Colors.brandTeal, radius: 8)
                    }
                    .scaleEffect(buttonOpacity > 0 ? 1.0 : 0.9)
                    .animation(.spring(response: 0.5, dampingFraction: 0.8), value: buttonOpacity)
                    
                    // Store button
                    Button(action: {
                        SoundManager.shared.playButtonTapSound()
                        showStore = true
                    }) {
                        HStack(spacing: DesignSystem.Spacing.sm) {
                            Image(systemName: "cart.fill")
                                .font(.system(size: 16, weight: .bold))
                            Text("STORE")
                                .font(DesignSystem.Typography.bodyMedium(weight: .bold))
                        }
                        .foregroundColor(DesignSystem.Colors.brandTeal)
                        .frame(width: 140, height: 44)
                        .background(
                            RoundedRectangle(cornerRadius: DesignSystem.Radius.large)
                                .stroke(DesignSystem.Colors.brandTeal, lineWidth: 2)
                                .background(
                                    RoundedRectangle(cornerRadius: DesignSystem.Radius.large)
                                        .fill(Color.black.opacity(0.3))
                                )
                        )
                    }
                    .scaleEffect(buttonOpacity > 0 ? 1.0 : 0.9)
                    .animation(.spring(response: 0.5, dampingFraction: 0.8), value: buttonOpacity)
                    
                    // Elegant high score display
                    if gameState.highScore > 0 {
                        VStack(spacing: DesignSystem.Spacing.xs) {
                            Text("\(gameState.currentGameMode.description.uppercased()) HIGH SCORE")
                                .font(DesignSystem.Typography.monoSmall(weight: .semibold))
                                .foregroundColor(DesignSystem.Colors.textTertiary)
                            Text("\(gameState.highScore)")
                                .font(DesignSystem.Typography.displaySmall(weight: .bold))
                                .foregroundColor(DesignSystem.Colors.textPrimary)
                                .neonGlow(color: DesignSystem.Colors.brandTeal, radius: 6)
                        }
                        .padding(DesignSystem.Spacing.lg)
                        .glassCard()
                    }
                }
                .padding(.top, DesignSystem.Spacing.xxl)
                .offset(y: buttonOffset)
                .opacity(buttonOpacity)
            }
        }
        .onAppear {
            // Start background music
            soundManager.startBackgroundMusic()
            
            withAnimation(.spring(response: 0.8, dampingFraction: 0.6)) {
                titleScale = 1.0
                titleOpacity = 1.0
            }
            
            withAnimation(.easeOut(duration: 0.6).delay(0.3)) {
                buttonOffset = 0
                buttonOpacity = 1.0
            }
        }
        .sheet(isPresented: $showStore) {
            StoreView()
                .environmentObject(gameState)
        }
    }
    
}