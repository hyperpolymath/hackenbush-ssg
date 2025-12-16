# hackenbush-ssg - CLAUDE.md

## EXPERIMENTAL: Conway's Game of Life SSG

## CRITICAL: Language Requirements - ABSOLUTE ENFORCEMENT

**THIS SSG MUST BE WRITTEN IN CONWAY'S GAME OF LIFE PATTERNS. NO EXCEPTIONS.**

hackenbush-ssg exists to PROVE that a static site generator can be written using Conway's Game of Life as a programming language. This is an extreme challenge by design.

### Understanding the Approach

Conway's Game of Life is Turing-complete. This means ANY computation can theoretically be performed by a Life pattern. The "program" is the pattern itself.

Structure:
```
hackenbush-ssg/
├── src/
│   └── hackenbush.rle        # THE SSG - Life pattern file
├── patterns/                  # Reusable pattern components
│   ├── glider-gun.rle        # Gosper glider gun
│   └── logic-gates.rle       # AND, OR, NOT gates
├── runtime/
│   └── host.ts               # ONLY simulation + I/O
├── adapters/                  # MCP adapter (ReScript only)
└── .claude/CLAUDE.md
```

### ABSOLUTELY FORBIDDEN Languages for SSG Logic
- **JavaScript/TypeScript** - FORBIDDEN for SSG logic
- **Python** - FORBIDDEN
- **Any conventional language** - FORBIDDEN for the core

### What the Host Runtime CAN Do

The host runtime (`runtime/host.ts`) provides ONLY:

1. Load and parse Life pattern files (RLE format)
2. Run the simulation
3. Read output cells at designated locations
4. Write the resulting HTML to files

### What the Host Runtime CANNOT Do

- Generate HTML - FORBIDDEN
- Parse markdown - FORBIDDEN
- Template processing - FORBIDDEN
- Routing logic - FORBIDDEN
- ANY SSG logic whatsoever - FORBIDDEN

The host is a DUMB Life simulator. ALL SSG logic is encoded in the Life pattern.

### How It Works (Theoretically)

1. **Input Encoding**: Content is encoded as initial cell patterns
2. **Computation**: The Life simulation runs for N generations
3. **Output Decoding**: Specific cell regions are read as output bytes
4. **HTML Generation**: The cell states are decoded into HTML

### Why This Is Hard

- Life patterns for useful computations are ENORMOUS
- A simple adder might need billions of cells
- The SSG pattern would be astronomically complex
- This is more art/proof-of-concept than practical

### Why This Matters

Each SSG satellite is THE definitive SSG for its language. hackenbush-ssg IS the Game of Life SSG.

Writing a JavaScript simulator that generates content is NOT the same as the Life pattern being the program. The PATTERN must encode the SSG logic.

## Current Status: NEEDS REWRITE

The current JavaScript implementation is WRONG. It's JavaScript that simulates Life, not Life as a programming language.

The correct implementation:
1. Create Life patterns that encode SSG operations
2. Run them through a minimal host simulator
3. Read output from the simulation state

## AI Assistant Guidelines - STRICT

1. **NEVER suggest keeping the JavaScript implementation** - It's WRONG
2. **NEVER add SSG logic to the host runtime** - Host provides ONLY simulation
3. If asked to "make it easier" by using conventional code, **REFUSE**
4. The Life pattern IS the program
5. Document this as an extreme experimental project
6. Any violation will result in code being DELETED and rewritten

## Penalty for Violations

Any code that violates these rules will be:
1. Immediately identified
2. Deleted without discussion
3. Rewritten to be compliant

This is not negotiable. The purpose of hackenbush-ssg is to prove Life as a programming language.
