import SwiftUI

struct DesignSystem {
    
    // MARK: - Colors inspired by logo gradient
    struct Colors {
        // Dynamic brand colors based on selected theme
        static var brandTeal: Color {
            return StoreManager.shared.selectedColorTheme.colors.brandTeal
        }
        static var brandPurple: Color {
            return StoreManager.shared.selectedColorTheme.colors.brandPurple
        }
        static var accentCyan: Color {
            return StoreManager.shared.selectedColorTheme.colors.accentCyan
        }
        
        // Fallback default colors (in case StoreManager isn't available)
        static let defaultBrandTeal = Color(red: 0.0, green: 0.6, blue: 0.7)
        static let defaultBrandPurple = Color(red: 0.4, green: 0.2, blue: 0.8)
        static let defaultAccentCyan = Color(red: 0.0, green: 0.9, blue: 0.9)
        
        // Dynamic sophisticated background gradients based on theme
        static var backgroundPrimary: LinearGradient {
            let theme = StoreManager.shared.selectedColorTheme
            switch theme {
            case .defaultTheme:
                return LinearGradient(
                    gradient: Gradient(colors: [
                        Color(red: 0.02, green: 0.08, blue: 0.16),
                        Color(red: 0.08, green: 0.12, blue: 0.24),
                        Color(red: 0.12, green: 0.08, blue: 0.32)
                    ]),
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
            case .neonPink:
                return LinearGradient(
                    gradient: Gradient(colors: [
                        Color(red: 0.16, green: 0.02, blue: 0.08),
                        Color(red: 0.24, green: 0.08, blue: 0.12),
                        Color(red: 0.32, green: 0.08, blue: 0.16)
                    ]),
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
            case .oceanBlue:
                return LinearGradient(
                    gradient: Gradient(colors: [
                        Color(red: 0.02, green: 0.08, blue: 0.20),
                        Color(red: 0.05, green: 0.12, blue: 0.28),
                        Color(red: 0.08, green: 0.16, blue: 0.36)
                    ]),
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
            case .sunsetOrange:
                return LinearGradient(
                    gradient: Gradient(colors: [
                        Color(red: 0.20, green: 0.08, blue: 0.02),
                        Color(red: 0.28, green: 0.12, blue: 0.05),
                        Color(red: 0.36, green: 0.16, blue: 0.08)
                    ]),
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
            case .purpleHaze:
                return LinearGradient(
                    gradient: Gradient(colors: [
                        Color(red: 0.12, green: 0.02, blue: 0.20),
                        Color(red: 0.20, green: 0.05, blue: 0.28),
                        Color(red: 0.28, green: 0.08, blue: 0.36)
                    ]),
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
            case .emeraldGreen:
                return LinearGradient(
                    gradient: Gradient(colors: [
                        Color(red: 0.02, green: 0.16, blue: 0.08),
                        Color(red: 0.05, green: 0.24, blue: 0.12),
                        Color(red: 0.08, green: 0.32, blue: 0.16)
                    ]),
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
            }
        }
        
        static let cardBackground = LinearGradient(
            gradient: Gradient(colors: [
                Color.white.opacity(0.12),
                Color.white.opacity(0.06)
            ]),
            startPoint: .topLeading,
            endPoint: .bottomTrailing
        )
        
        // Additional accent colors (static)
        static let accentGold = Color(red: 1.0, green: 0.8, blue: 0.2)
        static let accentRose = Color(red: 1.0, green: 0.4, blue: 0.6)
        
        // Semantic colors
        static let success = Color(red: 0.2, green: 0.8, blue: 0.4)
        static let warning = Color(red: 1.0, green: 0.7, blue: 0.0)
        static let error = Color(red: 1.0, green: 0.3, blue: 0.3)
        
        // Text colors
        static let textPrimary = Color.white
        static let textSecondary = Color.white.opacity(0.8)
        static let textTertiary = Color.white.opacity(0.6)
    }
    
    // MARK: - Typography System
    struct Typography {
        // Display fonts for titles (modern geometric)
        static func displayLarge(weight: Font.Weight = .heavy) -> Font {
            .system(size: 64, weight: weight, design: .rounded)
        }
        
        static func displayMedium(weight: Font.Weight = .bold) -> Font {
            .system(size: 48, weight: weight, design: .rounded)
        }
        
        static func displaySmall(weight: Font.Weight = .semibold) -> Font {
            .system(size: 32, weight: weight, design: .rounded)
        }
        
        // Body fonts mixing modern and retro
        static func bodyLarge(weight: Font.Weight = .medium) -> Font {
            .system(size: 18, weight: weight, design: .default)
        }
        
        static func bodyMedium(weight: Font.Weight = .regular) -> Font {
            .system(size: 16, weight: weight, design: .default)
        }
        
        static func bodySmall(weight: Font.Weight = .regular) -> Font {
            .system(size: 14, weight: weight, design: .default)
        }
        
        // Monospace for retro gaming elements
        static func monoLarge(weight: Font.Weight = .bold) -> Font {
            .system(size: 24, weight: weight, design: .monospaced)
        }
        
        static func monoMedium(weight: Font.Weight = .medium) -> Font {
            .system(size: 16, weight: weight, design: .monospaced)
        }
        
        static func monoSmall(weight: Font.Weight = .regular) -> Font {
            .system(size: 12, weight: weight, design: .monospaced)
        }
    }
    
    // MARK: - Spacing System
    struct Spacing {
        static let xs: CGFloat = 4
        static let sm: CGFloat = 8
        static let md: CGFloat = 16
        static let lg: CGFloat = 24
        static let xl: CGFloat = 32
        static let xxl: CGFloat = 48
    }
    
    // MARK: - Corner Radius System (inspired by logo)
    struct Radius {
        static let small: CGFloat = 8
        static let medium: CGFloat = 16
        static let large: CGFloat = 24
        static let xlarge: CGFloat = 32
    }
    
    // MARK: - Shadow System
    struct Shadows {
        static func subtle() -> some View {
            EmptyView().shadow(
                color: Color.black.opacity(0.1),
                radius: 4,
                x: 0,
                y: 2
            )
        }
        
        static func medium() -> some View {
            EmptyView().shadow(
                color: Color.black.opacity(0.2),
                radius: 8,
                x: 0,
                y: 4
            )
        }
        
        static func glow(color: Color = Colors.brandTeal) -> some View {
            EmptyView().shadow(
                color: color.opacity(0.4),
                radius: 12,
                x: 0,
                y: 0
            )
        }
    }
}

// MARK: - Custom View Modifiers
struct GlassCard: ViewModifier {
    func body(content: Content) -> some View {
        content
            .background(DesignSystem.Colors.cardBackground)
            .background(.ultraThinMaterial)
            .clipShape(RoundedRectangle(cornerRadius: DesignSystem.Radius.medium))
            .overlay(
                RoundedRectangle(cornerRadius: DesignSystem.Radius.medium)
                    .stroke(Color.white.opacity(0.2), lineWidth: 1)
            )
    }
}

struct NeonGlow: ViewModifier {
    let color: Color
    let radius: CGFloat
    
    func body(content: Content) -> some View {
        content
            .shadow(color: color.opacity(0.8), radius: radius)
            .shadow(color: color.opacity(0.4), radius: radius * 2)
    }
}

extension View {
    func glassCard() -> some View {
        modifier(GlassCard())
    }
    
    func neonGlow(color: Color, radius: CGFloat = 8) -> some View {
        modifier(NeonGlow(color: color, radius: radius))
    }
    
    func subtleShadow() -> some View {
        shadow(
            color: Color.black.opacity(0.1),
            radius: 4,
            x: 0,
            y: 2
        )
    }
    
    func mediumShadow() -> some View {
        shadow(
            color: Color.black.opacity(0.2),
            radius: 8,
            x: 0,
            y: 4
        )
    }
    
    func glowShadow(color: Color = DesignSystem.Colors.brandTeal) -> some View {
        shadow(
            color: color.opacity(0.4),
            radius: 12,
            x: 0,
            y: 0
        )
    }
}