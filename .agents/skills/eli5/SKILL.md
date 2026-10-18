---
name: eli5
description: Create HTML learning explanations when the response-destination rules in AGENTS.md select HTML, or when explicitly invoked for an HTML explanation. Do not use for ordinary chat explanations or questions about this skill.
---

# ELI5 visual explainer

Apply this guidance only to requested HTML explanations. Follow `AGENTS.md` for response
destination, page location, and server settings. Use `prompt.txt` when the user points to it as
the prompt; otherwise use the topic or page update explicitly requested by the user.

## Audience and depth

- The reader is a software developer approaching an unfamiliar topic. Assume general programming
  experience, but introduce the topic's own concepts and terminology from the beginning.
- Teach a useful foundation: what the concept means, why it is needed, and how its basic mechanism
  works. Connect it to familiar software knowledge when helpful.
- Keep the scope concise. Introduce each concept, teach its basics, and move on. Do not turn each
  concept into an essay or compress several unfamiliar ideas into one sentence.
- Preserve accuracy while limiting depth. Include advanced details and exceptions only when the
  current explanation needs them to avoid a misleading conclusion.

## Language and explanation

- Explain an idea in everyday adult language before introducing its technical name. Define
  unfamiliar terms where they first appear.
- Use consistent names. If the same thing has different names in different places, explain that
  connection explicitly.
- Use short, connected sentences and concrete actions such as "reads the file" or "passes the
  value". Leave enough room to explain how one step leads to the next.
- Use a small, concrete example and carry it through the explanation where possible. Help the
  reader picture what happens.
- For a requested HTML follow-up, address the specific misunderstanding first. Identify what the
  reader understood correctly, then explain the correction. Use a simpler example before adding
  more detail. Do not repeat the whole lesson unless requested.
- When generating an HTML explanation from prompts that ask questions about the ongoing topic
  (inspect `index.html` or `disposable-compose-review.html` to determine current topic context),
  always explicitly state the question being addressed before continuing with the rest of the explanation.

## Lesson scope

For a direct question, keep the page focused on the requested topic. Explain the basics without
branching into unrelated subtopics.

Use structured learning only when the user explicitly requests a course or staged curriculum:

1. Ask about the desired depth and any missing information needed to shape the curriculum.
2. Update `CURRICULUM.md` to track stages. Every stage must include an explicit post-completion checkpoint for `MCQ.html`.
3. Teach each stage sequentially in `index.html`.
4. When the user completes Stage N, prepare `MCQ.html` testing Stage N concepts. Scale question count to stage complexity.
5. In `MCQ.html`, require answering all questions before submitting. After submission, display the total score, confirm correct answers cleanly, and provide brief explanations only for incorrect choices. All MCQ options must have decent technical complexity and plausible distractors rooted in real architectural misconceptions.
6. Advance `index.html` to Stage N+1 only after the user reviews their MCQ assessment.

Curriculum tracking is not a lesson archive. Ordinary follow-up messages still use the response
destination rules in `AGENTS.md`; a course does not authorize a page rewrite for every reply.

## Visual design, navigation and diagrams

- Apply the repository's [artifact-design](../artifact-design/SKILL.md),
  [artifact-diagramming](../artifact-diagramming/SKILL.md), and
  [frontend-design](../frontend-design/SKILL.md) skills when creating or redesigning a page.
  For a content update, preserve the existing visual design unless the user requests a redesign.
- **Standard Typography (Lexend)**:
  - Always use **Lexend** as the required standard typeface for reading (`--font-body`), interface controls (`--font-ui`), and headings (`--font-heading`) across all pages (`index.html`, `MCQ.html`, and `disposable.html`).
  - Preconnect and load Lexend from Google Fonts in the `<head>` of every page:
    ```html
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    ```
  - Define standard font stack CSS variables in `:root`:
    ```css
    --font-body: 'Lexend', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    --font-ui: 'Lexend', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    --font-heading: 'Lexend', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    --font-mono: ui-monospace, "JetBrains Mono", "Cascadia Code", Menlo, Consolas, "Liberation Mono", monospace;
    ```
- **Common Cross-Page Navigation**: Every page (`index.html`, `MCQ.html`, and `disposable.html`) must include a persistent top navigation bar linking between Lesson, Assessment, and Scratchpad.
- **Topbar Help Button**: Include a `[HELP]` button in the topbar that toggles an in-page panel displaying the full form and a 1-sentence plain-English explanation for every technical acronym introduced on that page.
- **Interactive SVG for Mechanisms**: Support explanations with hand-authored inline SVG. When explaining mechanisms with multiple states, paths, or failure modes (e.g. PR checks vs. main release, normal vs. rollback), provide simple buttons to toggle SVG states so visual learners see how the system reacts. Avoid decorative or redundant figures.
- Show the mechanism through position, distance, direction, overlap, and labelled arrows. Make
  the relevant boundary, sequence, or failure point visible rather than drawing only labelled boxes.
- Give every figure an accessible description and a caption explaining why the pictured mechanism
  works. Add failure cases, real numbers, or error text only when they help the current lesson.
- Keep the page responsive and accessible, with legible diagrams and clear visual hierarchy.

## Verification and handoff

After creating or modifying an explainer page, use the configured Playwright MCP server when
available. Check that diagrams render, the layout works on desktop and small screens, and the
explanation uses simple language without losing accuracy. Verify any changed interactions.

Remove screenshots and `.playwright-mcp/` artifacts generated by this verification afterwards.
Give a concise chat handoff with the fixed local URL. Do not run page verification for chat-only
answers or edits to these instructions.
