### No Edit to CLAUDE.md only project owner is allowed. If you have any suggestion mention in the bottom of the document.

# Learning with Claude

The user asks a question. You answer it as **one visual explainer page**, served at a fixed local URL they keep open in a browser tab. They reload; the new answer is there.

Responses will be less verbose and address what prompt asks simple to digest knowledge with efficiency and accurate complexity based on prompt.

This file governs logic only: routing, serving, verification. **Everything about how the page looks and
reads lives in `@design.md`. Read it before you write `index.html`, every time.**

---

## The pattern — this is the whole thing

- **One question → one page.**
  `index.html` at the root, always. **Overwrite it.**

- **No archive.**
  No numbering, no per-topic folders, no index, no notes files, no history. The previous answer is gone; that is intended. Never ask to keep it.

- **Serve it.**
  `npm run dev` -> keep `http://localhost:5173` alive so a reload shows the new page.
  Vite is a dev server only: no framework, no build step. It binds IPv6 loopback, so use
  `localhost:5173`, not `127.0.0.1:5173`.

- **How to answer.**
  Check `prompt.txt` for what user want explained. Response will be categorized in 2 sections. Judge the prompt the categorize it:
  1. **Learning** — Ask user about how much he want the topic to be explored and other important questions for creating an curriculum for that topic and update the `CURRICULUM.md` file to keep track of stages. Curriculum will be divided into part (Number of parts will be based on how much depth we are going into) the start to final part will be covered via prompt exchange and explanation.

  2. **Explaining** — When user ask a question, the answer will be simple and brief if question does not demand that much depth to be explored but if question is a followup on something we have been already exploring the go in step-step explanation but the scope of the answer in the document should only be topic level not sub-topic exploration (unless asked specifically).

**NOTE**: IF THE PROMPT CONTAIN BOTH THEN ASK USER WHAT TO ADDRESS FIRST AND THEN EXPLAIN THE NEXT. INCLUDE AN EXAMPLE EVERY TIME WHEN THE RESPONSE BENEFITS AND USER WILL HAVE A BETTER CONCEPT GRASP.

---

## Building the page

Invoke the **`eli5`** skill (the user usually types `/eli5:eli5 <question>`), then **`artifact-design`**
and **`artifact-diagramming`** — the diagrams _are_ the deliverable, so the second is not optional.

`eli5` sets the approach. `@design.md` is the improvement layer on top of it, and it is the only place
design decisions come from.

---

## Verification — every time, before you hand it over

Do a basic playwright test for diagrams and explanation guidance. check if all the CONTENT make sense and follow a simple but knowledge effective tone.

Check every figure for text past its `viewBox` and for overlapping labels, and confirm the
display face actually loaded - **a Google Fonts family that does not exist fails silently**.
`Saira SemiExpanded` 404s (the expanded widths are on the variable `Saira` `wdth` axis, not a
family of their own) and every heading rendered in Arial while the source read fine.
`document.fonts.check()` is no help; it matches the fallback. Measure the rendered face
against a nonexistent-family control instead.

Then run the hand-over check at the end of `@design.md`.

Delete Playwright's screenshots and `.playwright-mcp/` afterwards - the user sees them open
in their editor.
