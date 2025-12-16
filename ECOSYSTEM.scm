;; SPDX-License-Identifier: AGPL-3.0-or-later
;; SPDX-FileCopyrightText: 2025 Jonathan D.A. Jewell
;; ECOSYSTEM.scm — hackenbush-ssg

(ecosystem
  (version "1.0.0")
  (name "hackenbush-ssg")
  (type "satellite-ssg")
  (purpose "The DEFINITIVE JavaScript static site generator")

  (language-identity
    (primary "JavaScript")
    (rationale "hackenbush-ssg exists to be THE JavaScript SSG. The entire engine is written in JavaScript.")
    (forbidden ("Python" "JavaScript" "TypeScript" "Ruby" "Go"))
    (enforcement "This is not negotiable. Any non-JavaScript implementation will be rejected."))

  (position-in-ecosystem
    "Satellite SSG in the poly-ssg constellation. Each satellite is the definitive SSG for its language.")

  (related-projects
    (project
      (name "poly-ssg-mcp")
      (url "https://github.com/hyperpolymath/poly-ssg-mcp")
      (relationship "hub")
      (description "Unified MCP server for 28+ SSGs - provides adapter interface"))
    (project
      (name "rhodium-standard-repositories")
      (url "https://github.com/hyperpolymath/rhodium-standard-repositories")
      (relationship "standard")))

  (what-this-is
    "- The DEFINITIVE static site generator written in JavaScript
     - Part of the poly-ssg satellite constellation")

  (what-this-is-not
    "- NOT a template that can be reimplemented in other languages
     - NOT optional about being in JavaScript"))
