;; SPDX-License-Identifier: AGPL-3.0-or-later
;; SPDX-FileCopyrightText: 2025 Jonathan D.A. Jewell
;;; META.scm — hackenbush-ssg

(define-module (hackenbush-ssg meta)
  #:export (architecture-decisions development-practices design-rationale language-rules))

(define language-rules
  '((mandatory-language . "Conway's Game of Life")
    (enforcement-level . "absolute")
    (rationale . "Each SSG satellite is the DEFINITIVE implementation for its language. hackenbush-ssg IS the Game of Life SSG - proving Turing-completeness of cellular automata.")
    (violations
     ("Python implementation" . "FORBIDDEN")
     ("JavaScript/TypeScript SSG logic" . "FORBIDDEN")
     ("Any conventional language for SSG logic" . "FORBIDDEN - defeats the purpose of this satellite"))
    (allowed-exceptions
     ("TypeScript in runtime/" . "ALLOWED - host simulation and I/O only")
     ("ReScript in adapters/" . "ALLOWED - MCP hub integration only"))
    (correct-implementation
     (core-logic . "RLE pattern files in src/")
     (simulator . "Deno/TypeScript host in runtime/")
     (mcp-adapter . "ReScript in adapters/"))))

(define architecture-decisions
  '((adr-001
     (title . "Game of Life as Programming Language")
     (status . "accepted")
     (date . "2025-12-17")
     (context . "Prove Turing-completeness of cellular automata for practical computation")
     (decision . "SSG logic encoded in Conway's Game of Life patterns (RLE format)")
     (consequences . ("Astronomical pattern complexity" "Proof-of-concept focus" "Educational value")))
    (adr-002
     (title . "Minimal Host Runtime")
     (status . "accepted")
     (date . "2025-12-17")
     (context . "Host must not contain SSG logic - only simulation + I/O")
     (decision . "TypeScript/Deno host provides RLE parsing, simulation, and output only")
     (consequences . ("Clean separation" "Life patterns ARE the program" "Testable simulator")))
    (adr-003
     (title . "RSR Compliance")
     (status . "accepted")
     (date . "2025-12-15")
     (context . "Part of hyperpolymath poly-ssg constellation")
     (decision . "Follow Rhodium Standard Repository guidelines")
     (consequences . ("RSR Gold target" "SHA-pinned actions" "SPDX headers")))))

(define development-practices
  '((code-style (languages . ("RLE patterns" "TypeScript (host)" "ReScript (adapter)")))
    (security (sast . "CodeQL for workflow scanning") (credentials . "env vars only") (patterns . "RLE files are data - minimal attack surface"))
    (versioning (scheme . "SemVer 2.0.0"))
    (testing (pattern-validation . "CI validates .rle structure") (simulator-tests . "Deno test suite"))))

(define design-rationale
  '((why-game-of-life . "This is THE Game of Life SSG. It proves cellular automata can encode computation.")
    (why-not-conventional . "Conventional languages defeat the experimental purpose.")
    (philosophical-goal . "Demonstrate that Turing-completeness is sufficient for practical tasks.")))
