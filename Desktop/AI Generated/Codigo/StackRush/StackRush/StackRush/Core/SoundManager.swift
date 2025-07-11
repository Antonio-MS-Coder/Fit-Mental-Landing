import AVFoundation
import AudioToolbox
import SwiftUI
#if os(iOS)
import UIKit
#endif

class SoundManager: ObservableObject {
    static let shared = SoundManager()
    
    private var audioPlayers: [String: AVAudioPlayer] = [:]
    private var backgroundMusicPlayer: AVAudioPlayer?
    
    @Published var isMusicEnabled: Bool = true {
        didSet {
            if isMusicEnabled {
                resumeBackgroundMusic()
            } else {
                pauseBackgroundMusic()
            }
        }
    }
    
    private var originalMusicRate: Float = 1.0
    
    private init() {
        setupSounds()
        setupBackgroundMusic()
        // Listen for sound pack changes
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(soundPackChanged),
            name: NSNotification.Name("SoundPackChanged"),
            object: nil
        )
    }
    
    private func setupSounds() {
        // In a real implementation, you would load actual sound files
        // For now, we'll use system sounds for effects
    }
    
    private func setupBackgroundMusic() {
        let selectedPack = StoreManager.shared.selectedSoundPack
        let musicFileName = getMusicFileName(for: selectedPack)
        
        guard let musicURL = Bundle.main.url(forResource: musicFileName, withExtension: "mp3") else {
            print("Could not find \(musicFileName).mp3 file")
            // Fallback to default music
            setupDefaultMusic()
            return
        }
        
        do {
            backgroundMusicPlayer = try AVAudioPlayer(contentsOf: musicURL)
            backgroundMusicPlayer?.numberOfLoops = -1 // Loop indefinitely
            backgroundMusicPlayer?.volume = 0.3 // Set to 30% volume
            originalMusicRate = backgroundMusicPlayer?.rate ?? 1.0
            backgroundMusicPlayer?.prepareToPlay()
        } catch {
            print("Error setting up background music: \(error)")
            setupDefaultMusic()
        }
    }
    
    private func setupDefaultMusic() {
        // Fallback to default music or create simple tone
        guard let musicURL = Bundle.main.url(forResource: "Neon Dreams", withExtension: "mp3") else {
            print("No music files available")
            return
        }
        
        do {
            backgroundMusicPlayer = try AVAudioPlayer(contentsOf: musicURL)
            backgroundMusicPlayer?.numberOfLoops = -1
            backgroundMusicPlayer?.volume = 0.3
            originalMusicRate = backgroundMusicPlayer?.rate ?? 1.0
            backgroundMusicPlayer?.prepareToPlay()
        } catch {
            print("Error setting up default music: \(error)")
        }
    }
    
    private func getMusicFileName(for soundPack: SoundPack) -> String {
        switch soundPack {
        case .defaultSounds:
            return "Neon Dreams"
        case .retroArcade:
            return "Retro Arcade"
        case .futuristic:
            return "Futuristic"
        }
    }
    
    @objc private func soundPackChanged() {
        let wasPlaying = backgroundMusicPlayer?.isPlaying ?? false
        stopBackgroundMusic()
        setupBackgroundMusic()
        if wasPlaying && isMusicEnabled {
            startBackgroundMusic()
        }
    }
    
    func startBackgroundMusic() {
        guard isMusicEnabled else { return }
        backgroundMusicPlayer?.play()
    }
    
    func pauseBackgroundMusic() {
        backgroundMusicPlayer?.pause()
    }
    
    func resumeBackgroundMusic() {
        guard isMusicEnabled else { return }
        backgroundMusicPlayer?.play()
    }
    
    func stopBackgroundMusic() {
        backgroundMusicPlayer?.stop()
        backgroundMusicPlayer?.currentTime = 0
    }
    
    func setMusicSpeed(multiplier: Float) {
        // Adjust music speed based on game speed
        let newRate = originalMusicRate * multiplier
        backgroundMusicPlayer?.rate = min(newRate, 2.0) // Cap at 2x speed
        
        // If music was playing, restart it with new rate
        if backgroundMusicPlayer?.isPlaying == true {
            backgroundMusicPlayer?.stop()
            backgroundMusicPlayer?.play()
        }
    }
    
    func toggleMusic() {
        isMusicEnabled.toggle()
    }
    
    func playStackSound() {
        let selectedPack = StoreManager.shared.selectedSoundPack
        let soundID = getStackSoundID(for: selectedPack)
        AudioServicesPlaySystemSound(soundID)
        #if os(iOS)
        let hapticEngine = UIImpactFeedbackGenerator(style: .medium)
        hapticEngine.impactOccurred()
        #endif
    }
    
    func playPerfectStackSound() {
        let selectedPack = StoreManager.shared.selectedSoundPack
        let soundID = getPerfectStackSoundID(for: selectedPack)
        AudioServicesPlaySystemSound(soundID)
        
        #if os(iOS)
        let successHaptic = UINotificationFeedbackGenerator()
        successHaptic.notificationOccurred(.success)
        #endif
    }
    
    func playGameOverSound() {
        let selectedPack = StoreManager.shared.selectedSoundPack
        let soundID = getGameOverSoundID(for: selectedPack)
        AudioServicesPlaySystemSound(soundID)
        
        #if os(iOS)
        let failureHaptic = UINotificationFeedbackGenerator()
        failureHaptic.notificationOccurred(.error)
        #endif
    }
    
    func playButtonTapSound() {
        let selectedPack = StoreManager.shared.selectedSoundPack
        let soundID = getButtonTapSoundID(for: selectedPack)
        AudioServicesPlaySystemSound(soundID)
        
        #if os(iOS)
        let lightHaptic = UIImpactFeedbackGenerator(style: .light)
        lightHaptic.impactOccurred()
        #endif
    }
    
    // MARK: - Sound ID mappings for different sound packs
    
    private func getStackSoundID(for soundPack: SoundPack) -> SystemSoundID {
        switch soundPack {
        case .defaultSounds:
            return 1104 // Default click
        case .retroArcade:
            return 1105 // Retro beep
        case .futuristic:
            return 1106 // Futuristic tone
        }
    }
    
    private func getPerfectStackSoundID(for soundPack: SoundPack) -> SystemSoundID {
        switch soundPack {
        case .defaultSounds:
            return 1025 // Default success
        case .retroArcade:
            return 1026 // Retro success
        case .futuristic:
            return 1027 // Futuristic success
        }
    }
    
    private func getGameOverSoundID(for soundPack: SoundPack) -> SystemSoundID {
        switch soundPack {
        case .defaultSounds:
            return 1053 // Default failure
        case .retroArcade:
            return 1054 // Retro failure
        case .futuristic:
            return 1055 // Futuristic failure
        }
    }
    
    private func getButtonTapSoundID(for soundPack: SoundPack) -> SystemSoundID {
        switch soundPack {
        case .defaultSounds:
            return 1104 // Default tap
        case .retroArcade:
            return 1123 // Retro tap
        case .futuristic:
            return 1124 // Futuristic tap
        }
    }
    
    deinit {
        stopBackgroundMusic()
    }
}