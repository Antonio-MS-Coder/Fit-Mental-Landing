import Foundation
import CoreGraphics
import SwiftUI

// Authentic Stacker arcade grid system
class StackerGrid: ObservableObject {
    static let shared = StackerGrid()
    
    // Grid dimensions matching real arcade
    @Published var rows = 15
    let cols = 7
    let maxRowsClassic = 15
    let maxRowsInfinite = 50  // Start with 50, will expand as needed
    
    // Grid state - true means LED is lit
    @Published var grid: [[Bool]] = []
    @Published var currentRow = 0
    @Published var currentBlocks: [Int] = [] // Column positions of current moving blocks
    @Published var isMovingRight = true
    @Published var gameActive = false
    
    // Game controller reference
    var gameController: StackRushGameController?
    
    // Inventory manager reference for power-up effects
    private let inventoryManager = InventoryManager.shared
    
    private var timer: Timer?
    private var moveSpeed: TimeInterval = 0.5
    @Published var animationOffset: CGFloat = 0
    
    init() {
        resetGrid()
    }
    
    func resetGrid() {
        grid = Array(repeating: Array(repeating: false, count: cols), count: rows)
        currentRow = 0
        currentBlocks = []
        gameActive = false
        stopMovement()
    }
    
    func startGame(with controller: StackRushGameController) {
        self.gameController = controller
        
        // Set appropriate grid size based on game mode
        switch controller.currentGameMode {
        case .classic:
            rows = maxRowsClassic
        case .infinite:
            rows = maxRowsInfinite
        }
        
        resetGrid()
        gameActive = true
        spawnNewRow()
    }
    
    func spawnNewRow() {
        guard let controller = gameController else { return }
        
        // Determine number of blocks for current level
        let blockCount = controller.blocksInCurrentRow
        
        // Start positions based on block count (0-indexed, 7 columns total: 0,1,2,3,4,5,6)
        switch blockCount {
        case 3:
            currentBlocks = [2, 3, 4] // Center 3 blocks (columns 2,3,4)
        case 2:
            currentBlocks = [2, 3] // Center 2 blocks (columns 2,3)  
        case 1:
            currentBlocks = [3] // Center 1 block (column 3)
        default:
            currentBlocks = [2, 3, 4]
        }
        
        isMovingRight = true
        // Much faster and smoother movement, affected by power-ups
        let baseMoveSpeed = max(0.08, 0.25 - (Double(controller.level) * 0.015))
        moveSpeed = baseMoveSpeed * inventoryManager.currentSpeedMultiplier
        
        // Show blocks immediately on spawn
        updateCurrentBlocksOnGrid()
        
        startMovement()
    }
    
    private func startMovement() {
        stopMovement()
        timer = Timer.scheduledTimer(withTimeInterval: moveSpeed, repeats: true) { _ in
            self.moveBlocks()
        }
    }
    
    private func stopMovement() {
        timer?.invalidate()
        timer = nil
    }
    
    func pauseGame() {
        stopMovement()
    }
    
    func resumeGame() {
        guard gameActive else { return }
        startMovement()
    }
    
    private func moveBlocks() {
        guard gameActive else { return }
        
        // Move blocks logically
        if isMovingRight {
            // Check if we can move right
            let rightmost = currentBlocks.max() ?? 0
            if rightmost >= cols - 1 {
                isMovingRight = false
                currentBlocks = currentBlocks.map { $0 - 1 }
            } else {
                currentBlocks = currentBlocks.map { $0 + 1 }
            }
        } else {
            // Check if we can move left
            let leftmost = currentBlocks.min() ?? 0
            if leftmost <= 0 {
                isMovingRight = true
                currentBlocks = currentBlocks.map { $0 + 1 }
            } else {
                currentBlocks = currentBlocks.map { $0 - 1 }
            }
        }
        
        // Update grid for current moving blocks ONLY
        updateCurrentBlocksOnGrid()
    }
    
    private func updateCurrentBlocksOnGrid() {
        // Clear entire current row first
        for col in 0..<cols {
            grid[currentRow][col] = false
        }
        
        // Set current moving blocks
        for col in currentBlocks {
            if col >= 0 && col < cols {
                grid[currentRow][col] = true
            }
        }
    }
    
    func dropBlocks() -> Bool {
        guard gameActive else { return false }
        
        stopMovement()
        
        // Check for first block (establish base)
        if currentRow == 0 {
            // First block - just place it (blocks already set by updateCurrentBlocksOnGrid)
            currentRow += 1
            
            // Always complete level when placing blocks
            gameController?.completeLevel()
            
            // Check if we need to expand grid for infinite mode
            if currentRow >= rows - 5 && gameController?.currentGameMode == .infinite {
                expandInfiniteGrid()
            }
            
            if currentRow < rows {
                spawnNewRow()
                return true
            } else {
                // Game over for classic mode, or shouldn't happen in infinite mode
                gameActive = false
                return false
            }
        } else {
            // Check overlap with previous row
            let previousRow = currentRow - 1
            var overlappingBlocks: [Int] = []
            
            for col in currentBlocks {
                if col >= 0 && col < cols && grid[previousRow][col] {
                    overlappingBlocks.append(col)
                }
            }
            
            // Game over if no overlap - unless we have Extra Life
            if overlappingBlocks.isEmpty {
                // Check if player has Extra Life power-up
                if inventoryManager.hasExtraLife() && inventoryManager.useExtraLife() {
                    // Use Extra Life - continue with current blocks on previous row
                    let previousRowBlocks = grid[previousRow].enumerated().compactMap { index, isLit in
                        isLit ? index : nil
                    }
                    
                    // Place blocks on previous row position
                    for col in currentBlocks {
                        if col >= 0 && col < cols {
                            grid[currentRow][col] = false
                        }
                    }
                    
                    // Set overlapping blocks to match previous row
                    for col in previousRowBlocks {
                        grid[currentRow][col] = true
                    }
                    
                    currentBlocks = previousRowBlocks
                    currentRow += 1
                    
                    // Complete level and continue
                    gameController?.completeLevel()
                    
                    // Check if we need to expand grid for infinite mode
                    if currentRow >= rows - 5 && gameController?.currentGameMode == .infinite {
                        expandInfiniteGrid()
                    }
                    
                    if currentRow < rows {
                        spawnNewRow()
                        return true
                    } else {
                        if gameController?.currentGameMode == .classic {
                            gameActive = false
                            return true
                        } else {
                            expandInfiniteGrid()
                            spawnNewRow()
                            return true
                        }
                    }
                } else {
                    // No Extra Life available - game over
                    gameActive = false
                    return false
                }
            }
            
            // Clear current position and set overlapping blocks
            for col in currentBlocks {
                if col >= 0 && col < cols {
                    grid[currentRow][col] = false
                }
            }
            
            for col in overlappingBlocks {
                grid[currentRow][col] = true
            }
            
            currentBlocks = overlappingBlocks
            currentRow += 1
            
            // Always complete level when placing blocks
            gameController?.completeLevel()
            
            // Check if we need to expand grid for infinite mode
            if currentRow >= rows - 5 && gameController?.currentGameMode == .infinite {
                expandInfiniteGrid()
            }
            
            // Check win condition or continue
            if currentRow >= rows {
                if gameController?.currentGameMode == .classic {
                    // Won the classic game!
                    gameActive = false
                    return true
                } else {
                    // This shouldn't happen in infinite mode since we expand the grid
                    expandInfiniteGrid()
                    spawnNewRow()
                    return true
                }
            } else {
                spawnNewRow()
                return true
            }
        }
        
        return false
    }
    
    private func expandInfiniteGrid() {
        // Add 20 more rows to the top of the grid
        let additionalRows = 20
        let newRows = rows + additionalRows
        
        // Create new grid with additional rows at the top
        var newGrid: [[Bool]] = []
        
        // Add new empty rows at the top
        for _ in 0..<additionalRows {
            newGrid.append(Array(repeating: false, count: cols))
        }
        
        // Copy existing grid
        newGrid.append(contentsOf: grid)
        
        // Update grid and row count
        grid = newGrid
        rows = newRows
        
        // Adjust current row index to account for new rows added at top
        currentRow += additionalRows
    }
}