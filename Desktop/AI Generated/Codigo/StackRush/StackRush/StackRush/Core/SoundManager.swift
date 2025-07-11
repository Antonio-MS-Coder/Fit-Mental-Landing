import AVFoundation
import AudioToolbox
import SwiftUI
#if os(iOS)
import UIKit
#endif

class SoundManager {
    static let shared = SoundManager()
    
    private var audioPlayers: [String: AVAudioPlayer] = [:]
    
    private init() {
        setupSounds()
    }
    
    private func setupSounds() {
        // In a real implementation, you would load actual sound files
        // For now, we'll use system sounds
    }
    
    func playStackSound() {
        // Play a click/pop sound
        AudioServicesPlaySystemSound(1104)
        #if os(iOS)
        let hapticEngine = UIImpactFeedbackGenerator(style: .medium)
        hapticEngine.impactOccurred()
        #endif
    }
    
    func playPerfectStackSound() {
        // Play a success sound
        AudioServicesPlaySystemSound(1025)
        
        #if os(iOS)
        let successHaptic = UINotificationFeedbackGenerator()
        successHaptic.notificationOccurred(.success)
        #endif
    }
    
    func playGameOverSound() {
        // Play a failure sound
        AudioServicesPlaySystemSound(1053)
        
        #if os(iOS)
        let failureHaptic = UINotificationFeedbackGenerator()
        failureHaptic.notificationOccurred(.error)
        #endif
    }
    
    func playButtonTapSound() {
        // Play a light tap sound
        AudioServicesPlaySystemSound(1104)
        
        #if os(iOS)
        let lightHaptic = UIImpactFeedbackGenerator(style: .light)
        lightHaptic.impactOccurred()
        #endif
    }
}