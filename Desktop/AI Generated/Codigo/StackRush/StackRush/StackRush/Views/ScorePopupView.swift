import SwiftUI

struct ScorePopupView: View {
    let score: Int
    let isPerfect: Bool
    @State private var opacity: Double = 1
    @State private var offset: CGFloat = 0
    
    var body: some View {
        Text(isPerfect ? "+\(score) PERFECT!" : "+\(score)")
            .font(.system(size: isPerfect ? 24 : 18, weight: .bold))
            .foregroundColor(isPerfect ? .yellow : .white)
            .opacity(opacity)
            .offset(y: offset)
            .onAppear {
                withAnimation(.easeOut(duration: 1.0)) {
                    opacity = 0
                    offset = -50
                }
            }
    }
}