import SwiftUI

struct GameOverView: View {
    let score: Int
    let onRestart: () -> Void
    let onMenu: () -> Void
    
    var body: some View {
        ZStack {
            // Sophisticated overlay with blur effect
            DesignSystem.Colors.backgroundPrimary
                .opacity(0.95)
                .background(.ultraThinMaterial)
                .ignoresSafeArea()
            
            VStack(spacing: DesignSystem.Spacing.xl) {
                // Premium game over title
                Text("GAME OVER")
                    .font(DesignSystem.Typography.displayMedium(weight: .heavy))
                    .foregroundStyle(
                        LinearGradient(
                            gradient: Gradient(colors: [
                                DesignSystem.Colors.error,
                                DesignSystem.Colors.accentRose
                            ]),
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .neonGlow(color: DesignSystem.Colors.error, radius: 10)
                
                // Elegant score card
                VStack(spacing: DesignSystem.Spacing.sm) {
                    Text("FINAL SCORE")
                        .font(DesignSystem.Typography.monoMedium(weight: .semibold))
                        .foregroundColor(DesignSystem.Colors.textTertiary)
                    Text("\(score)")
                        .font(DesignSystem.Typography.displayMedium(weight: .heavy))
                        .foregroundColor(DesignSystem.Colors.textPrimary)
                        .neonGlow(color: DesignSystem.Colors.brandTeal, radius: 8)
                }
                .padding(DesignSystem.Spacing.xl)
                .glassCard()
                
                VStack(spacing: DesignSystem.Spacing.lg) {
                    // Premium restart button
                    Button(action: {
                        SoundManager.shared.playButtonTapSound()
                        onRestart()
                    }) {
                        Text("TRY AGAIN")
                            .font(DesignSystem.Typography.bodyLarge(weight: .bold))
                            .foregroundColor(.black)
                            .frame(width: 200, height: 56)
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
                            .clipShape(RoundedRectangle(cornerRadius: DesignSystem.Radius.large))
                            .overlay(
                                RoundedRectangle(cornerRadius: DesignSystem.Radius.large)
                                    .stroke(Color.white.opacity(0.3), lineWidth: 1)
                            )
                            .neonGlow(color: DesignSystem.Colors.accentGold, radius: 6)
                    }
                    
                    // Sophisticated menu button
                    Button(action: {
                        SoundManager.shared.playButtonTapSound()
                        onMenu()
                    }) {
                        Text("MENU")
                            .font(DesignSystem.Typography.bodyLarge(weight: .semibold))
                            .foregroundColor(DesignSystem.Colors.textPrimary)
                            .frame(width: 200, height: 56)
                            .background(DesignSystem.Colors.cardBackground)
                            .clipShape(RoundedRectangle(cornerRadius: DesignSystem.Radius.large))
                            .overlay(
                                RoundedRectangle(cornerRadius: DesignSystem.Radius.large)
                                    .stroke(Color.white.opacity(0.4), lineWidth: 1.5)
                            )
                    }
                }
                .padding(.top, DesignSystem.Spacing.lg)
            }
            .padding(DesignSystem.Spacing.xl)
        }
    }
}