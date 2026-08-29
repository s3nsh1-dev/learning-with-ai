### No Edit to CLAUDE.md only project owner is allowed. If you have any suggestion mention in the bottom of the document.

# Learning with Claude

The user asks a question. You answer it as **one visual explainer page**, served at a fixed local URL they keep open in a browser tab. They reload; the new answer is there.

Responses will be less verbose and address what prompt asks simple to digest knowledge with efficiency and accurate complexity based on prompt.

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
  Check `Prompt.txt` for what user want explained. Response will be categorized in 2 sections. Judge the prompt the categorize it:
  1. **Learning** — Ask user about how much he want the topic to be explored and other important questions for creating an curriculum for that topic and update the `Curriculum.md` file to keep track of stages. Curriculum will be divided into part (Number of parts will be based on how much depth we are going into) the start to final part will be covered via prompt exchange and explanation.

  2. **Explaining** — When user ask a question, the answer will be simple and brief if question does not demand that much depth to be explored but if question is a followup on something we have been already exploring the go in step-step explanation but the scope of the answer in the document should only be topic level not sub-topic exploration (unless asked specifically).

**NOTE**: IF THE PROMPT CONTAIN BOTH THEN ASK USER WHAT TO ADDRESS FIRST AND THEN EXPLAIN THE NEXT. INCLUDE AN EXAMPLE EVERY TIME WHEN THE RESPONSE BENEFITS AND USER WILL HAVE A BETTER CONCEPT GRASP.

---

## Building the page

Invoke the **`eli5`** skill (the user usually types `/eli5:eli5 <question>`), then **`artifact-design`** and **`artifact-diagramming`** — the diagrams _are_ the deliverable, so the second is not optional. Big pictures, few words, real depth in the captions.
At the top of the file always page reading time like "X minutes read"

### Shared skeleton, fresh palette

1. The page grammar stays constant so it is instantly navigable:
2. Reading friendly fonts. no styling which does not ease the learning process.
3. Follow Professional simple to understand education content writing for every heading, sub-heading and main content for the generated document.
4. Avoid the AI-design defaults from `artifact-design`: warm cream + serif + terracotta, lone acid-green pop, purple-blue gradient hero, Inter/Space Grotesk, emoji section markers, rounded cards with accent rails.

---

## Verification — every time, before you hand it over

Do a basic playwright test for diagrams and explanation guidance. check if all the CONTENT make sense and follow a simple but knowledge effective tone.

Check every figure for text past its `viewBox` and for overlapping labels, and confirm the
display face actually loaded - **a Google Fonts family that does not exist fails silently**.
`Saira SemiExpanded` 404s (the expanded widths are on the variable `Saira` `wdth` axis, not a
family of their own) and every heading rendered in Arial while the source read fine.
`document.fonts.check()` is no help; it matches the fallback. Measure the rendered face
against a nonexistent-family control instead.

Delete Playwright's screenshots and `.playwright-mcp/` afterwards - the user sees them open
in their editor.
