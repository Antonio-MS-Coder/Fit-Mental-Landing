# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

StackRush is a SwiftUI-based iOS/macOS application with Core Data integration. The project was created on July 10, 2025, using Xcode 16.4.

**Key Technologies:**
- Language: Swift 5.0
- UI Framework: SwiftUI
- Data Persistence: Core Data
- Platform Support: iOS 18.5+, macOS 15.5+, visionOS 2.5+
- Testing: Swift Testing framework (unit tests), XCTest (UI tests)

## Common Development Commands

### Building and Running
```bash
# Build the project for iOS Simulator
xcodebuild -project StackRush.xcodeproj -scheme StackRush -configuration Debug build -destination 'platform=iOS Simulator,name=iPhone 16'

# Build for release
xcodebuild -project StackRush.xcodeproj -scheme StackRush -configuration Release build -destination 'platform=iOS Simulator,name=iPhone 16'

# Clean build folder
xcodebuild -project StackRush.xcodeproj -scheme StackRush clean

# Build and run tests
xcodebuild -project StackRush.xcodeproj -scheme StackRush test -destination 'platform=iOS Simulator,name=iPhone 16'
```

### Testing
```bash
# Run all tests
xcodebuild test -scheme StackRush -destination 'platform=iOS Simulator,name=iPhone 16'

# Run specific test class
xcodebuild test -scheme StackRush -only-testing:StackRushTests/StackRushTests

# Run with code coverage
xcodebuild test -scheme StackRush -enableCodeCoverage YES
```

### Xcode Commands
- Build: CMD+B
- Run: CMD+R
- Test: CMD+U
- Clean: CMD+Shift+K
- Show test navigator: CMD+6
- Show debug area: CMD+Shift+Y

## Architecture and Structure

### Project Layout
```
StackRush/
├── StackRush.xcodeproj/          # Xcode project configuration
├── StackRush/                    # Main app source
│   ├── StackRushApp.swift        # App entry point (@main)
│   ├── ContentView.swift         # Main UI view
│   ├── Persistence.swift         # Core Data stack
│   └── StackRush.xcdatamodeld/   # Core Data model
├── StackRushTests/               # Unit tests (Swift Testing)
└── StackRushUITests/             # UI tests (XCTest)
```

### Core Data Model
- Entity: `Item` with `timestamp` attribute
- Managed Object Context is injected via SwiftUI environment
- Persistence controller handles Core Data stack initialization

### SwiftUI Architecture
- Main entry: `StackRushApp` with `@main` attribute
- View hierarchy starts with `ContentView`
- Uses `@Environment(\.managedObjectContext)` for Core Data
- `@FetchRequest` for reactive data fetching

## Development Guidelines

### Adding New Features
1. Create new SwiftUI views in separate files
2. Use `@StateObject` or `@ObservedObject` for view models
3. Inject Core Data context via environment when needed
4. Follow SwiftUI's declarative patterns

### Working with Core Data
1. Modify the data model in `StackRush.xcdatamodeld`
2. Update `Persistence.swift` if changing Core Data stack
3. Use `@FetchRequest` in views for reactive updates
4. Handle save operations through the managed object context

### Testing Approach
- Unit tests: Use Swift Testing framework with `@Test` macro
- UI tests: Use XCTest with XCUIApplication
- Test Core Data operations with in-memory stores
- Mock dependencies using protocols

### Code Signing and Deployment
- Team ID: 2G8MAFZB7R
- Bundle ID: com.lck.StackRush
- Code signing: Automatic
- Entitlements: App Sandbox enabled

## Important Notes

### Current State
The project is a fully functional StackRush arcade game with:
- Complete SwiftUI + SpriteKit game implementation
- Block stacking mechanics with tap-to-drop controls
- Particle effects and animations
- Sound effects and haptic feedback
- Scoring system with combos and perfect stacks
- Camera movement following the stack
- Performance optimizations
- Statistics tracking
- Pause/resume functionality

### Platform Considerations
- Supports iOS, macOS, and visionOS
- Uses platform-specific UI adjustments (e.g., toolbar placement)
- Edit mode is iOS-specific

### Build Configurations
- Debug: Unoptimized with testability
- Release: Whole module optimization enabled

### No External Dependencies
Currently, no package managers or external dependencies are configured. Use Swift Package Manager through Xcode if dependencies are needed.