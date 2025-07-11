import SwiftUI

struct PrizeEventView: View {
    let prizeState: PrizeState
    let onContinue: () -> Void
    let onCollect: () -> Void
    
    @State private var pulseScale: CGFloat = 1.0
    @State private var showContent = false
    
    var body: some View {
        ZStack {
            Color.black.opacity(0.8)
                .ignoresSafeArea()
            
            VStack(spacing: 30) {
                // Prize Icon
                ZStack {
                    Circle()
                        .fill(prizeGradient)
                        .frame(width: 120, height: 120)
                        .shadow(color: prizeColor, radius: 20)
                    
                    Image(systemName: prizeIcon)
                        .font(.system(size: 50, weight: .bold))
                        .foregroundColor(.white)
                }
                .scaleEffect(pulseScale)
                .onAppear {
                    withAnimation(.easeInOut(duration: 1.0).repeatForever(autoreverses: true)) {
                        pulseScale = 1.2
                    }
                }
                
                // Prize Text
                VStack(spacing: 12) {
                    Text(prizeState.title)
                        .font(.largeTitle)
                        .fontWeight(.bold)
                        .foregroundColor(prizeColor)
                        .multilineTextAlignment(.center)
                    
                    // Coins reward display
                    HStack(spacing: 8) {
                        Image(systemName: "dollarsign.circle.fill")
                            .font(.system(size: 24, weight: .bold))
                            .foregroundColor(.yellow)
                        
                        Text("+\(prizeState.coinReward)")
                            .font(.system(size: 28, weight: .bold))
                            .foregroundColor(.yellow)
                    }
                    .padding(.vertical, 8)
                    .padding(.horizontal, 16)
                    .background(
                        RoundedRectangle(cornerRadius: 20)
                            .fill(Color.black.opacity(0.6))
                            .overlay(
                                RoundedRectangle(cornerRadius: 20)
                                    .stroke(Color.yellow.opacity(0.8), lineWidth: 2)
                            )
                    )
                    
                    Text(prizeState.message)
                        .font(.body)
                        .foregroundColor(.white)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 20)
                }
                
                // Action Buttons
                VStack(spacing: 16) {
                    if prizeState == .minorPrize {
                        // Minor prize offers continue or collect - improved hierarchy
                        VStack(spacing: 12) {
                            // Primary action: Collect Prize (more prominent)
                            Button(action: onCollect) {
                                HStack(spacing: 8) {
                                    Image(systemName: "gift.fill")
                                        .font(.system(size: 18, weight: .bold))
                                    Text("Collect Prize")
                                        .font(.system(size: 18, weight: .bold))
                                }
                                .foregroundColor(.white)
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, 16)
                                .background(
                                    RoundedRectangle(cornerRadius: 25)
                                        .fill(prizeGradient)
                                        .shadow(color: prizeColor.opacity(0.6), radius: 8)
                                )
                            }
                            .accessibilityLabel("Collect minor prize")
                            .accessibilityHint("Tap to collect your prize and end the game")
                            
                            // Secondary action: Continue (less prominent)
                            Button(action: onContinue) {
                                HStack(spacing: 8) {
                                    Image(systemName: "play.fill")
                                        .font(.system(size: 16, weight: .medium))
                                    Text("Continue Playing")
                                        .font(.system(size: 16, weight: .semibold))
                                }
                                .foregroundColor(prizeColor)
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, 14)
                                .background(
                                    RoundedRectangle(cornerRadius: 25)
                                        .stroke(prizeColor, lineWidth: 2)
                                        .background(
                                            RoundedRectangle(cornerRadius: 25)
                                                .fill(Color.black.opacity(0.3))
                                        )
                                )
                            }
                            .accessibilityLabel("Continue playing")
                            .accessibilityHint("Tap to continue playing and try for the major prize")
                        }
                        .padding(.horizontal, 20)
                    } else {
                        // Major prize - only collect option with enhanced styling
                        Button(action: onCollect) {
                            HStack(spacing: 10) {
                                Image(systemName: "crown.fill")
                                    .font(.system(size: 22, weight: .bold))
                                Text("Collect Major Prize!")
                                    .font(.system(size: 20, weight: .bold))
                            }
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 18)
                            .background(
                                RoundedRectangle(cornerRadius: 25)
                                    .fill(prizeGradient)
                                    .shadow(color: prizeColor.opacity(0.8), radius: 15)
                            )
                        }
                        .accessibilityLabel("Collect major prize")
                        .accessibilityHint("Tap to collect your major prize")
                        .padding(.horizontal, 20)
                    }
                }
                .padding(.top, 10)
            }
            .padding(40)
            .opacity(showContent ? 1.0 : 0.0)
            .scaleEffect(showContent ? 1.0 : 0.9)
            .onAppear {
                withAnimation(.easeOut(duration: 0.6).delay(0.1)) {
                    showContent = true
                }
            }
        }
    }
    
    private var prizeColor: Color {
        switch prizeState {
        case .minorPrize:
            return .orange
        case .majorPrize:
            return .yellow
        default:
            return .clear
        }
    }
    
    private var prizeGradient: LinearGradient {
        switch prizeState {
        case .minorPrize:
            return LinearGradient(
                colors: [.orange, .red],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        case .majorPrize:
            return LinearGradient(
                colors: [.yellow, .orange, .red],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        default:
            return LinearGradient(colors: [.clear], startPoint: .top, endPoint: .bottom)
        }
    }
    
    private var prizeIcon: String {
        switch prizeState {
        case .minorPrize:
            return "gift"
        case .majorPrize:
            return "crown"
        default:
            return ""
        }
    }
}

#Preview {
    VStack {
        PrizeEventView(
            prizeState: .minorPrize,
            onContinue: {},
            onCollect: {}
        )
    }
}