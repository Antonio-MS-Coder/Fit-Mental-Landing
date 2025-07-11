//
//  ContentView.swift
//  StackRush
//
//  Created by Tono Murrieta  on 10/07/25.
//

import SwiftUI

struct ContentView: View {
    @StateObject private var gameState = GameState()
    
    var body: some View {
        ZStack {
            switch gameState.phase {
            case .menu:
                MenuView()
                    .environmentObject(gameState)
            case .playing, .paused:
                GameView()
                    .environmentObject(gameState)
            case .gameOver:
                GameView()
                    .environmentObject(gameState)
            }
        }
        .preferredColorScheme(.dark)
    }
}