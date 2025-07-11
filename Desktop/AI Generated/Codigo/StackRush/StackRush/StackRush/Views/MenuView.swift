import SwiftUI

struct MenuView: View {
    @EnvironmentObject var gameState: GameState
    @State private var titleScale: CGFloat = 0.5
    @State private var titleOpacity: Double = 0
    @State private var buttonOffset: CGFloat = 50
    @State private var buttonOpacity: Double = 0
    
    var body: some View {
        ZStack {
            // Sophisticated brand background
            DesignSystem.Colors.backgroundPrimary
                .ignoresSafeArea()
            
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
                                    DesignSystem.Colors.accentGold,
                                    DesignSystem.Colors.brandPurple
                                ]),
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                        .neonGlow(color: DesignSystem.Colors.accentGold, radius: 12)
                }
                .scaleEffect(titleScale)
                .opacity(titleOpacity)
                
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
                                        DesignSystem.Colors.accentGold,
                                        DesignSystem.Colors.accentGold.opacity(0.8)
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
                            .neonGlow(color: DesignSystem.Colors.accentGold, radius: 8)
                    }
                    .scaleEffect(buttonOpacity > 0 ? 1.0 : 0.9)
                    .animation(.spring(response: 0.5, dampingFraction: 0.8), value: buttonOpacity)
                    
                    // Elegant high score display
                    if gameState.highScore > 0 {
                        VStack(spacing: DesignSystem.Spacing.xs) {
                            Text("HIGH SCORE")
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
            withAnimation(.spring(response: 0.8, dampingFraction: 0.6)) {
                titleScale = 1.0
                titleOpacity = 1.0
            }
            
            withAnimation(.easeOut(duration: 0.6).delay(0.3)) {
                buttonOffset = 0
                buttonOpacity = 1.0
            }
        }
    }
}