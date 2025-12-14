// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2025 Jonathan D.A. Jewell
/**
 * Content Encoder - Convert content to/from Game of Life patterns
 *
 * Since Game of Life is Turing complete, we can theoretically encode
 * any computation. For practical purposes, we use patterns to represent
 * content transformations and generation rules.
 */

import {
  createGrid,
  setCell,
  getCell,
  runGenerations,
  gridToAscii,
  asciiToGrid,
  PATTERNS,
  placePattern,
  population,
} from "./life.js";

/**
 * Encode a string into a Life pattern
 * Each character becomes a specific arrangement of cells
 * @param {string} text - Text to encode
 * @returns {{grid: Uint8Array, width: number}} - Encoded grid
 */
export function encodeText(text) {
  // 5x7 character cell size (standard bitmap font dimensions)
  const charWidth = 6;
  const charHeight = 8;
  const width = text.length * charWidth;
  const height = charHeight;
  const grid = createGrid(width, height);

  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    encodeChar(grid, width, i * charWidth, 0, charCode);
  }

  return { grid, width };
}

/**
 * Encode a single character into the grid
 * Uses ASCII code to generate a deterministic pattern
 */
function encodeChar(grid, width, startX, startY, charCode) {
  // Create a deterministic pattern based on ASCII code
  // This maps each character to a unique cellular pattern
  const bits = charCode.toString(2).padStart(7, "0");

  // First row: binary representation
  for (let i = 0; i < bits.length && i < 5; i++) {
    if (bits[i] === "1") {
      setCell(grid, width, startX + i, startY, 1);
    }
  }

  // Additional rows based on character properties
  if (charCode >= 65 && charCode <= 90) {
    // Uppercase: add top row
    setCell(grid, width, startX + 2, startY + 1, 1);
    setCell(grid, width, startX + 3, startY + 1, 1);
  }
  if (charCode >= 97 && charCode <= 122) {
    // Lowercase: add bottom row
    setCell(grid, width, startX + 2, startY + 6, 1);
    setCell(grid, width, startX + 3, startY + 6, 1);
  }
  if (charCode >= 48 && charCode <= 57) {
    // Numbers: add side dots
    setCell(grid, width, startX, startY + 3, 1);
    setCell(grid, width, startX + 4, startY + 3, 1);
  }

  // Modular pattern based on char code
  const mod3 = charCode % 3;
  const mod5 = charCode % 5;
  setCell(grid, width, startX + mod3, startY + 3 + (mod5 % 3), 1);
  setCell(grid, width, startX + 4 - mod3, startY + 4 + (mod5 % 2), 1);
}

/**
 * Generate HTML from evolved Life grid
 * The final pattern state determines the output
 * @param {Uint8Array} grid - Evolved grid
 * @param {number} width - Grid width
 * @returns {string} - Generated HTML
 */
export function gridToHtml(grid, width) {
  const height = grid.length / width;
  const svg = gridToSvg(grid, width);
  const pop = population(grid);
  const density = pop / grid.length;

  // Generate style based on grid properties
  const hue = (pop * 137) % 360; // Golden angle for color
  const saturation = 50 + density * 50;
  const lightness = 20 + (1 - density) * 60;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Surreal Generation</title>
  <style>
    :root {
      --primary: hsl(${hue}, ${saturation}%, ${lightness}%);
      --secondary: hsl(${(hue + 180) % 360}, ${saturation}%, ${lightness}%);
      --bg: hsl(${hue}, 10%, 8%);
      --text: hsl(${hue}, 20%, 90%);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 2rem;
      min-height: 100vh;
      background: var(--bg);
      color: var(--text);
      font-family: system-ui, -apple-system, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .life-grid {
      max-width: 100%;
      height: auto;
      border: 2px solid var(--primary);
      background: black;
    }
    .stats {
      margin-top: 1rem;
      font-family: monospace;
      opacity: 0.7;
    }
    h1 {
      color: var(--primary);
      text-shadow: 0 0 20px var(--primary);
    }
  </style>
</head>
<body>
  <h1>░ SURREAL ░</h1>
  ${svg}
  <div class="stats">
    Population: ${pop} | Density: ${(density * 100).toFixed(1)}% | Grid: ${width}×${height}
  </div>
</body>
</html>`;
}

/**
 * Convert grid to SVG
 * @param {Uint8Array} grid - The grid
 * @param {number} width - Grid width
 * @param {number} cellSize - Size of each cell in pixels
 * @returns {string} - SVG element
 */
export function gridToSvg(grid, width, cellSize = 4) {
  const height = grid.length / width;
  const svgWidth = width * cellSize;
  const svgHeight = height * cellSize;

  let rects = "";
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (getCell(grid, width, x, y)) {
        rects += `<rect x="${x * cellSize}" y="${y * cellSize}" width="${cellSize}" height="${cellSize}" fill="lime"/>`;
      }
    }
  }

  return `<svg class="life-grid" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
  <rect width="100%" height="100%" fill="black"/>
  ${rects}
</svg>`;
}

/**
 * Transform content through Life evolution
 * Input content -> Pattern -> Evolution -> Output
 * @param {string} content - Source content
 * @param {number} generations - Evolution steps
 * @returns {{grid: Uint8Array, width: number, html: string}} - Result
 */
export function transform(content, generations = 100) {
  const { grid: initial, width } = encodeText(content);

  // Add some chaos with classic patterns
  if (content.length > 10) {
    placePattern(initial, width, PATTERNS.glider, 0, 0);
    placePattern(initial, width, PATTERNS.blinker, width - 5, 0);
  }

  const evolved = runGenerations(initial, width, generations);
  const html = gridToHtml(evolved, width);

  return { grid: evolved, width, html };
}

/**
 * Generate a site from Life patterns
 * @param {Array<{name: string, content: string}>} pages - Pages to generate
 * @param {number} generations - Evolution steps per page
 * @returns {Array<{name: string, html: string}>} - Generated pages
 */
export function generateSite(pages, generations = 100) {
  return pages.map((page) => {
    const { html } = transform(page.content, generations);
    return {
      name: page.name,
      html,
    };
  });
}
