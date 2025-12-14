#!/usr/bin/env -S deno run --allow-read --allow-write --allow-net
// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2025 Jonathan D.A. Jewell
/**
 * Hackenbush SSG - Static Site Generator powered by Conway's Game of Life
 *
 * Named after Hackenbush, another combinatorial game theory concept by John Conway.
 * "The Game of Life is Turing complete, therefore it can generate websites."
 *
 * Commands:
 *   build   - Generate site from content/
 *   serve   - Serve the generated site
 *   dev     - Watch and rebuild on changes
 *   evolve  - Run interactive Life simulation
 */

import {
  createGrid,
  evolve,
  gridToAscii,
  asciiToGrid,
  PATTERNS,
  placePattern,
  runGenerations,
  population,
} from "./life.js";
import { transform, generateSite, gridToHtml, gridToSvg } from "./encoder.js";

const VERSION = "0.1.0";

async function build() {
  console.log("░░░ HACKENBUSH SSG ░░░");
  console.log("Building site through cellular evolution...\n");

  const contentDir = "./content";
  const outputDir = "./public";

  // Ensure output directory exists
  try {
    await Deno.mkdir(outputDir, { recursive: true });
  } catch {
    // Directory exists
  }

  // Check for content directory
  let pages = [];
  try {
    for await (const entry of Deno.readDir(contentDir)) {
      if (entry.isFile && entry.name.endsWith(".txt")) {
        const content = await Deno.readTextFile(`${contentDir}/${entry.name}`);
        pages.push({
          name: entry.name.replace(".txt", ".html"),
          content,
        });
      }
    }
  } catch {
    // No content directory, generate demo
    console.log("No content/ directory found. Generating demo site...\n");
    pages = [
      { name: "index.html", content: "HACKENBUSH STATIC SITE GENERATOR" },
      { name: "about.html", content: "Powered by Conway's Game of Life" },
      { name: "chaos.html", content: "CHAOS ORDER EMERGENCE PATTERN LIFE" },
    ];
  }

  // Generate site
  const generated = generateSite(pages, 150);

  for (const page of generated) {
    const path = `${outputDir}/${page.name}`;
    await Deno.writeTextFile(path, page.html);
    console.log(`  ✓ ${path}`);
  }

  console.log(`\n░ Built ${generated.length} pages through evolution ░`);
}

async function serve(port = 8080) {
  console.log("░░░ HACKENBUSH SSG ░░░");
  console.log(`Serving at http://localhost:${port}\n`);

  const handler = async (request) => {
    const url = new URL(request.url);
    let path = url.pathname;

    if (path === "/") path = "/index.html";

    try {
      const file = await Deno.readFile(`./public${path}`);
      const contentType = path.endsWith(".html")
        ? "text/html"
        : path.endsWith(".css")
          ? "text/css"
          : path.endsWith(".js")
            ? "text/javascript"
            : "application/octet-stream";

      return new Response(file, {
        headers: { "Content-Type": contentType },
      });
    } catch {
      return new Response("Not Found", { status: 404 });
    }
  };

  Deno.serve({ port }, handler);
}

async function evolveInteractive() {
  console.log("░░░ HACKENBUSH EVOLUTION ░░░");
  console.log("Press Ctrl+C to stop\n");

  const width = 60;
  const height = 30;
  let grid = createGrid(width, height);

  // Seed with interesting patterns
  placePattern(grid, width, PATTERNS.glider, 5, 5);
  placePattern(grid, width, PATTERNS.rpentomino, 30, 15);
  placePattern(grid, width, PATTERNS.acorn, 10, 20);

  let generation = 0;

  const interval = setInterval(() => {
    console.clear();
    console.log(`Generation: ${generation} | Population: ${population(grid)}`);
    console.log(gridToAscii(grid, width));

    grid = evolve(grid, width);
    generation++;
  }, 100);

  // Run for a bit then stop
  setTimeout(() => {
    clearInterval(interval);
    console.log("\n░ Evolution complete ░");
  }, 30000);
}

function printHelp() {
  console.log(`
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░  HACKENBUSH SSG v${VERSION}                                         ░
░  Static Site Generator powered by Conway's Game of Life     ░
░  (Named after another Conway combinatorial game)            ░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

USAGE:
  deno task build    Build site from content/ to public/
  deno task serve    Serve the generated site
  deno task dev      Watch and rebuild on changes
  deno task evolve   Run interactive Life simulation

The Game of Life is Turing complete. Therefore, it can
generate websites. This SSG encodes your content into
cellular patterns, evolves them, and renders the result.

CONTENT:
  Place .txt files in content/ directory.
  Each file becomes an HTML page.

PHILOSOPHY:
  "From simple rules, complex structures emerge."

  Your content seeds the initial state.
  Evolution determines the final form.
  Embrace the emergent aesthetic.
`);
}

// Main entry point
const command = Deno.args[0];

switch (command) {
  case "build":
    await build();
    break;
  case "serve":
    await serve(parseInt(Deno.args[1]) || 8080);
    break;
  case "dev":
    await build();
    await serve(8080);
    break;
  case "evolve":
    await evolveInteractive();
    break;
  case "--help":
  case "-h":
  case "help":
    printHelp();
    break;
  default:
    printHelp();
}
