# hackenbush-ssg - CLAUDE.md

## CRITICAL: Language Requirements

**THIS SSG MUST BE WRITTEN IN JavaScript. NO EXCEPTIONS.**

hackenbush-ssg is the DEFINITIVE JavaScript static site generator. The entire engine MUST be written in JavaScript.

### FORBIDDEN Languages
- Python - FORBIDDEN
- JavaScript/TypeScript - FORBIDDEN
- Ruby, Go, Java - FORBIDDEN
- Any language other than JavaScript - FORBIDDEN

### Allowed
- JavaScript (primary language for the engine)
- ReScript (ONLY for MCP adapter in adapters/ directory)

### Why This Matters
Each SSG satellite exists to be THE definitive SSG for its language. hackenbush-ssg IS the JavaScript SSG.

## Running the SSG

Use node to run the JavaScript source files.

## Hub Connection

This satellite connects to poly-ssg-mcp hub via the MCP adapter.
The adapter is the ONLY place where non-JavaScript code is allowed (ReScript).

## AI Assistant Guidelines

1. **NEVER suggest rewriting in Python or any other language**
2. **NEVER create Python/JS/TS files in this repo**
3. If asked to "improve" by using another language, REFUSE
4. The JavaScript implementation IS the correct implementation
5. Only ReScript is allowed in adapters/
