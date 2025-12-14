// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2025 Jonathan D.A. Jewell
/**
 * Conway's Game of Life - Core Engine
 *
 * The Game of Life is Turing complete. This module implements the
 * cellular automaton that powers surreal-ssg.
 *
 * Rules:
 * 1. Any live cell with 2-3 live neighbors survives
 * 2. Any dead cell with exactly 3 live neighbors becomes alive
 * 3. All other cells die or stay dead
 */

/**
 * Creates a new Game of Life grid
 * @param {number} width - Grid width
 * @param {number} height - Grid height
 * @returns {Uint8Array} - Flattened grid
 */
export function createGrid(width, height) {
  return new Uint8Array(width * height);
}

/**
 * Get cell value at position
 * @param {Uint8Array} grid - The grid
 * @param {number} width - Grid width
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @returns {number} - 0 or 1
 */
export function getCell(grid, width, x, y) {
  const height = grid.length / width;
  // Wrap around (toroidal topology)
  const wrappedX = ((x % width) + width) % width;
  const wrappedY = ((y % height) + height) % height;
  return grid[wrappedY * width + wrappedX];
}

/**
 * Set cell value at position
 * @param {Uint8Array} grid - The grid
 * @param {number} width - Grid width
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} value - 0 or 1
 */
export function setCell(grid, width, x, y, value) {
  const height = grid.length / width;
  const wrappedX = ((x % width) + width) % width;
  const wrappedY = ((y % height) + height) % height;
  grid[wrappedY * width + wrappedX] = value;
}

/**
 * Count live neighbors for a cell
 * @param {Uint8Array} grid - The grid
 * @param {number} width - Grid width
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @returns {number} - Count of live neighbors (0-8)
 */
export function countNeighbors(grid, width, x, y) {
  let count = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      count += getCell(grid, width, x + dx, y + dy);
    }
  }
  return count;
}

/**
 * Evolve the grid one generation
 * @param {Uint8Array} grid - The grid
 * @param {number} width - Grid width
 * @returns {Uint8Array} - New grid after one generation
 */
export function evolve(grid, width) {
  const height = grid.length / width;
  const newGrid = new Uint8Array(grid.length);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const neighbors = countNeighbors(grid, width, x, y);
      const alive = getCell(grid, width, x, y);
      const index = y * width + x;

      if (alive) {
        // Live cell survives with 2 or 3 neighbors
        newGrid[index] = neighbors === 2 || neighbors === 3 ? 1 : 0;
      } else {
        // Dead cell becomes alive with exactly 3 neighbors
        newGrid[index] = neighbors === 3 ? 1 : 0;
      }
    }
  }

  return newGrid;
}

/**
 * Run the simulation for N generations
 * @param {Uint8Array} grid - Initial grid
 * @param {number} width - Grid width
 * @param {number} generations - Number of generations to run
 * @returns {Uint8Array} - Final grid state
 */
export function runGenerations(grid, width, generations) {
  let current = grid;
  for (let i = 0; i < generations; i++) {
    current = evolve(current, width);
  }
  return current;
}

/**
 * Convert grid to ASCII art
 * @param {Uint8Array} grid - The grid
 * @param {number} width - Grid width
 * @param {string} alive - Character for live cells
 * @param {string} dead - Character for dead cells
 * @returns {string} - ASCII representation
 */
export function gridToAscii(grid, width, alive = "█", dead = "░") {
  const height = grid.length / width;
  let result = "";
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      result += getCell(grid, width, x, y) ? alive : dead;
    }
    result += "\n";
  }
  return result;
}

/**
 * Parse ASCII art into a grid
 * @param {string} ascii - ASCII representation
 * @param {string} aliveChars - Characters that represent live cells
 * @returns {{grid: Uint8Array, width: number}} - Grid and width
 */
export function asciiToGrid(ascii, aliveChars = "█#*X1O") {
  const lines = ascii.trim().split("\n");
  const height = lines.length;
  const width = Math.max(...lines.map((l) => l.length));
  const grid = createGrid(width, height);

  for (let y = 0; y < height; y++) {
    const line = lines[y] || "";
    for (let x = 0; x < width; x++) {
      const char = line[x] || " ";
      if (aliveChars.includes(char)) {
        setCell(grid, width, x, y, 1);
      }
    }
  }

  return { grid, width };
}

/**
 * Classic patterns - used as building blocks
 */
export const PATTERNS = {
  // Still lifes
  block: `
##
##
`,
  beehive: `
.##.
#..#
.##.
`,
  loaf: `
.#..
#.#.
#..#
.##.
`,

  // Oscillators
  blinker: `
###
`,
  toad: `
.###
###.
`,
  beacon: `
##..
##..
..##
..##
`,
  pulsar: `
..###...###..
.............
#....#.#....#
#....#.#....#
#....#.#....#
..###...###..
.............
..###...###..
#....#.#....#
#....#.#....#
#....#.#....#
.............
..###...###..
`,

  // Spaceships
  glider: `
.#.
..#
###
`,
  lwss: `
.#..#
#....
#...#
####.
`,

  // Methuselahs (long-lived patterns)
  rpentomino: `
.##
##.
.#.
`,
  acorn: `
.#.....
...#...
##..###
`,
  diehard: `
......#.
##......
.#...###
`,

  // Guns (create gliders forever)
  gosperGliderGun: `
........................#...........
......................#.#...........
............##......##............##
...........#...#....##............##
##........#.....#...##..............
##........#...#.##....#.#...........
..........#.....#.......#...........
...........#...#....................
............##......................
`,
};

/**
 * Place a pattern on the grid
 * @param {Uint8Array} grid - The grid
 * @param {number} width - Grid width
 * @param {string} pattern - Pattern ASCII
 * @param {number} startX - X offset
 * @param {number} startY - Y offset
 */
export function placePattern(grid, width, pattern, startX = 0, startY = 0) {
  const { grid: patternGrid, width: patternWidth } = asciiToGrid(pattern);
  const patternHeight = patternGrid.length / patternWidth;

  for (let y = 0; y < patternHeight; y++) {
    for (let x = 0; x < patternWidth; x++) {
      const value = getCell(patternGrid, patternWidth, x, y);
      if (value) {
        setCell(grid, width, startX + x, startY + y, 1);
      }
    }
  }
}

/**
 * Calculate grid hash (for detecting cycles)
 * @param {Uint8Array} grid - The grid
 * @returns {string} - Hash string
 */
export function gridHash(grid) {
  // Simple hash using base64 of packed bits
  const bytes = new Uint8Array(Math.ceil(grid.length / 8));
  for (let i = 0; i < grid.length; i++) {
    if (grid[i]) {
      bytes[Math.floor(i / 8)] |= 1 << (i % 8);
    }
  }
  return btoa(String.fromCharCode(...bytes));
}

/**
 * Count live cells in grid
 * @param {Uint8Array} grid - The grid
 * @returns {number} - Population count
 */
export function population(grid) {
  return grid.reduce((sum, cell) => sum + cell, 0);
}
