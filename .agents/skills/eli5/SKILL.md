---
name: eli5
description: Create a beginner-friendly, picture-first HTML explainer in this repository. Use when the user invokes $eli5 or asks for a simple visual explanation of how something works. Do not use for unrelated coding or prose-only requests.
---

# ELI5 visual explainer

Explain the topic for a reader with no assumed background knowledge.

- Follow the response mode, page location, visual language, and verification requirements in the
  repository's `AGENTS.md`.
- Use the topic from the user's current request. Read `prompt.txt` only when the user asks to render
  or continue the prompt stored there.
- Prefer a small number of plain words supported by large, meaningful inline SVG illustrations.
- Preserve technically important causal details. Simplicity should come from clear sequencing and
  concrete examples, not from making the explanation inaccurate.
- Replace `index.html` with the completed single-page explainer and verify it before handoff.
