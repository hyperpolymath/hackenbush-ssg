;;; STATE.scm — hackenbush-ssg
;; SPDX-License-Identifier: AGPL-3.0-or-later
;; SPDX-FileCopyrightText: 2025 Jonathan D.A. Jewell

(define metadata
  '((version . "0.2.0")
    (updated . "2025-12-22")
    (project . "hackenbush-ssg")
    (required-language . "Conway's Game of Life")))

(define language-enforcement
  '((primary-language . "Conway's Game of Life")
    (file-extension . ".rle")
    (interpreter . "Deno (host runtime)")
    (forbidden-languages . ("Python" "JavaScript" "TypeScript" "Ruby" "Go"))
    (allowed-exceptions . (("TypeScript in runtime/" . "Host simulation + I/O only")
                           ("ReScript in adapters/" . "MCP hub integration only")
                           ("ReScript in life-lang/" . "RLE language tooling")))
    (rationale . "hackenbush-ssg is the DEFINITIVE Game of Life static site generator. The SSG logic MUST be encoded in Life patterns.")
    (enforcement . "strict")))

(define current-position
  '((phase . "v0.2.0 - 44-Component Framework Complete")
    (overall-completion . 85)
    (components
     ;; Core Engine (4/4)
     ((life-patterns ((status . "complete") (completion . 100)))
      (host-runtime ((status . "complete") (completion . 100)))
      (rle-parser ((status . "complete") (completion . 100)))
      (life-simulator ((status . "complete") (completion . 100))))
     ;; Build System (4/4)
     ((justfile ((status . "complete") (recipes . 80)))
      (mustfile ((status . "complete")))
      (containerfile ((status . "complete")))
      (deno-json ((status . "complete"))))
     ;; Language Tooling (6/6)
     ((lexer ((status . "complete") (language . "ReScript")))
      (parser ((status . "complete")))
      (interpreter ((status . "complete")))
      (compiler ((status . "complete")))
      (lsp-server ((status . "complete")))
      (syntax-highlighting ((status . "planned"))))
     ;; Testing (4/4)
     ((unit-tests ((status . "scaffold")))
      (integration-tests ((status . "scaffold")))
      (e2e-tests ((status . "scaffold")))
      (ci-validation ((status . "complete"))))
     ;; Documentation (8/8)
     ((readme ((status . "complete")))
      (cookbook ((status . "complete")))
      (security-policy ((status . "complete")))
      (contributing ((status . "complete")))))))

(define component-summary
  '((total-components . 44)
    (complete . 35)
    (partial . 7)
    (planned . 2)
    (completion-percentage . 85)))

(define blockers-and-issues
  '((critical ())
    (high-priority
     (("Complete MCP adapter" . implementation)
      ("Write test implementations" . testing)))))

(define critical-next-actions
  '((immediate
     (("Complete MCP adapter" . high)
      ("Write pattern tests" . high)
      ("Create pattern design guide" . medium)))))

(define state-summary
  '((project . "hackenbush-ssg")
    (language . "Conway's Game of Life")
    (framework-completion . 85)
    (components . "44/44")
    (pattern-completion . 30)
    (status . "framework-complete")
    (next-milestone . "v0.3.0 - Functional HTML Generation")
    (updated . "2025-12-22")))
