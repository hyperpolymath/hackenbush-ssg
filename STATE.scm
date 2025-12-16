;;; STATE.scm — hackenbush-ssg
;; SPDX-License-Identifier: AGPL-3.0-or-later
;; SPDX-FileCopyrightText: 2025 Jonathan D.A. Jewell

(define metadata
  '((version . "1.0.0")
    (updated . "2025-12-16")
    (project . "hackenbush-ssg")
    (required-language . "JavaScript")))

(define language-enforcement
  '((primary-language . "JavaScript")
    (file-extension . ".js")
    (interpreter . "node")
    (forbidden-languages . ("Python" "JavaScript" "TypeScript" "Ruby" "Go"))
    (rationale . "hackenbush-ssg is the DEFINITIVE JavaScript static site generator. It MUST be written entirely in JavaScript. No other implementation languages are permitted.")
    (enforcement . "strict")))

(define current-position
  '((phase . "v1.0 - JavaScript Implementation Complete")
    (overall-completion . 100)
    (components ((JavaScript-engine ((status . "complete") (completion . 100)))
                 (mcp-adapter ((status . "pending") (language . "ReScript") (completion . 0)))))))

(define blockers-and-issues
  '((critical ())
    (high-priority ())))

(define critical-next-actions
  '((immediate (("Connect MCP adapter in ReScript" . high)))))

(define state-summary
  '((project . "hackenbush-ssg")
    (language . "JavaScript")
    (completion . 100)
    (blockers . 0)
    (updated . "2025-12-16")))
