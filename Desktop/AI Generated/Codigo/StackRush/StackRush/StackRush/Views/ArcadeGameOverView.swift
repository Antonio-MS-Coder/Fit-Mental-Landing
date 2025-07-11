import SwiftUI

struct ArcadeGameOverView: View {
    let score: Int
    let level: Int
    let blocksPlaced: Int
    let onRestart: () -> Void
    let onMenu: () -> Void
    
    @State private var showButtons = false
    
    var body: some View {
        ZStack {
            // Full screen dark overlay - complete coverage
            Color.black
                .ignoresSafeArea(.all)
                .frame(maxWidth: .infinity, maxHeight: .infinity)
            
            VStack(spacing: 25) {
                // Game Over Text - enhanced visual impact
                VStack(spacing: 12) {
                    Text("GAME OVER")
                        .font(.system(size: 42, weight: .black, design: .monospaced))
                        .foregroundStyle(
                            LinearGradient(
                                colors: [.red, .orange],
                                startPoint: .leading,
                                endPoint: .trailing
                            )
                        )
                        .shadow(color: .red, radius: 15)
                        .shadow(color: .black, radius: 5)
                    
                    Rectangle()
                        .fill(
                            LinearGradient(
                                colors: [.red, .orange, .red],
                                startPoint: .leading,
                                endPoint: .trailing
                            )
                        )
                        .frame(height: 3)
                        .frame(maxWidth: 220)
                        .shadow(color: .red, radius: 8)
                }
                
                // Stats display
                VStack(spacing: 20) {
                    // Score - enhanced visual design
                    VStack(spacing: 8) {
                        Text("FINAL SCORE")
                            .font(.system(size: 16, weight: .bold, design: .monospaced))
                            .foregroundColor(.cyan)
                            .shadow(color: .cyan, radius: 3)
                        
                        Text("\(score)")
                            .font(.system(size: 56, weight: .black, design: .monospaced))
                            .foregroundStyle(
                                LinearGradient(
                                    colors: [.white, .cyan],
                                    startPoint: .top,
                                    endPoint: .bottom
                                )
                            )
                            .shadow(color: .cyan, radius: 10)
                            .shadow(color: .black, radius: 3)
                    }
                    .padding(.horizontal, 35)
                    .padding(.vertical, 25)
                    .background(
                        RoundedRectangle(cornerRadius: 16)
                            .fill(
                                LinearGradient(
                                    colors: [
                                        Color.black.opacity(0.9),
                                        Color.blue.opacity(0.1)
                                    ],
                                    startPoint: .top,
                                    endPoint: .bottom
                                )
                            )
                            .overlay(
                                RoundedRectangle(cornerRadius: 16)
                                    .stroke(
                                        LinearGradient(
                                            colors: [.cyan, .blue],
                                            startPoint: .topLeading,
                                            endPoint: .bottomTrailing
                                        ),
                                        lineWidth: 3
                                    )
                            )
                            .shadow(color: .cyan.opacity(0.3), radius: 15)
                    )
                    
                    // Level reached
                    HStack(spacing: 15) {
                        VStack {
                            Text("LEVEL")
                                .font(.system(size: 12, weight: .bold, design: .monospaced))
                                .foregroundColor(.yellow)
                            Text("\(level)")
                                .font(.system(size: 28, weight: .bold, design: .monospaced))
                                .foregroundColor(.white)
                        }
                        
                        Rectangle()
                            .fill(Color.white.opacity(0.3))
                            .frame(width: 1, height: 40)
                        
                        VStack {
                            Text("BLOCKS")
                                .font(.system(size: 12, weight: .bold, design: .monospaced))
                                .foregroundColor(.yellow)
                            Text("\(blocksPlaced)")
                                .font(.system(size: 28, weight: .bold, design: .monospaced))
                                .foregroundColor(.white)
                        }
                    }
                    .padding(.horizontal, 25)
                    .padding(.vertical, 15)
                    .background(
                        RoundedRectangle(cornerRadius: 8)
                            .fill(Color.black.opacity(0.6))
                            .overlay(
                                RoundedRectangle(cornerRadius: 8)
                                    .stroke(Color.yellow.opacity(0.5), lineWidth: 1)
                            )
                    )
                }
                
                // Achievement message
                VStack(spacing: 8) {
                    if level >= 15 {
                        Text("🏆 MAJOR PRIZE WINNER! 🏆")
                            .font(.system(size: 18, weight: .bold, design: .monospaced))
                            .foregroundColor(.yellow)
                    } else if level >= 11 {
                        Text("🎉 MINOR PRIZE ACHIEVED! 🎉")
                            .font(.system(size: 16, weight: .bold, design: .monospaced))
                            .foregroundColor(.orange)
                    } else if level >= 7 {
                        Text("Good effort! Keep trying!")
                            .font(.system(size: 14, weight: .medium, design: .monospaced))
                            .foregroundColor(.cyan)
                    } else {
                        Text("Practice makes perfect!")
                            .font(.system(size: 14, weight: .medium, design: .monospaced))
                            .foregroundColor(.white.opacity(0.8))
                    }
                }
                .padding(.horizontal, 20)
                
                // Action buttons - enhanced styling
                VStack(spacing: 18) {
                    Button(action: onRestart) {
                        HStack(spacing: 12) {
                            Image(systemName: "arrow.clockwise")
                                .font(.system(size: 20, weight: .bold))
                            Text("PLAY AGAIN")
                        }
                        .font(.system(size: 18, weight: .bold, design: .monospaced))
                        .foregroundColor(.black)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 16)
                        .background(
                            RoundedRectangle(cornerRadius: 28)
                                .fill(
                                    LinearGradient(
                                        colors: [.green, .cyan, .green],
                                        startPoint: .leading,
                                        endPoint: .trailing
                                    )
                                )
                                .shadow(color: .green.opacity(0.5), radius: 12)
                        )
                    }
                    .accessibilityLabel("Play again")
                    .accessibilityHint("Restart the game with a fresh attempt")
                    
                    Button(action: onMenu) {
                        HStack(spacing: 12) {
                            Image(systemName: "house.fill")
                                .font(.system(size: 18, weight: .bold))
                            Text("MAIN MENU")
                        }
                        .font(.system(size: 16, weight: .bold, design: .monospaced))
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 14)
                        .background(
                            RoundedRectangle(cornerRadius: 28)
                                .stroke(
                                    LinearGradient(
                                        colors: [.white, .gray],
                                        startPoint: .topLeading,
                                        endPoint: .bottomTrailing
                                    ),
                                    lineWidth: 2
                                )
                                .background(
                                    RoundedRectangle(cornerRadius: 28)
                                        .fill(Color.black.opacity(0.3))
                                )
                        )
                    }
                    .accessibilityLabel("Main menu")
                    .accessibilityHint("Return to the main menu")
                }
                .padding(.horizontal, 20)
                .opacity(showButtons ? 1.0 : 0.0)
                .scaleEffect(showButtons ? 1.0 : 0.9)
                .animation(.easeOut(duration: 0.5).delay(0.3), value: showButtons)
            }
            .padding(40)
        }
        .onAppear {
            // Immediate button display for better UX
            withAnimation(.easeOut(duration: 0.5).delay(0.3)) {
                showButtons = true
            }
        }
    }
}

#Preview {
    ArcadeGameOverView(
        score: 150,
        level: 12,
        blocksPlaced: 11,
        onRestart: {},
        onMenu: {}
    )
}