> **No Edit to CLAUDE.md only project owner is allowed. If you have any suggestion mention in the bottom of the document.**
> **totally ignore the skills-copy folder, its just there for my understanding**

# Learning with Claude

The user shares a prompt. You answer it as **one visual explainer page**, served at a fixed local
URL they keep open in a browser tab. They reload; the new answer is there.

Responses will be less verbose and address what prompt asks simple to digest knowledge with
efficiency and accurate complexity based on prompt.

---

## The pattern — this is the whole thing

- **One question → one page.**

  `index.html` at the root, always. **Overwrite it.**

- **No archive.**

  No numbering, no per-topic folders, no index, no notes files, no history. The previous answer
  is gone; that is intended. Never ask to keep it.

- **Serve it.**

  `npm run dev` -> keep `http://localhost:5173` alive so a reload shows the new page.
  Vite is a dev server only: no framework, no build step. It binds IPv6 loopback, so use
  `localhost:5173`, not `127.0.0.1:5173`.

- **How to answer.**

  Check `prompt.txt` for what user want explained. Response will be categorized in 2 sections.
  Judge the prompt the categorize it:
  1. **Learning** — Ask user about how much he want the topic to be explored and other important
     questions for creating an curriculum for that topic and update the `CURRICULUM.md` file to
     keep track of stages. Curriculum will be divided into part (Number of parts will be based on
     how much depth we are going into) the start to final part will be covered via prompt exchange
     and explanation. By the end of every stage there will be a MCQ testing the learning understand
     and constantly adjusting if need and match user understand and help reach him the full grasp
     of the `CURRICULUM.md` topic.

  2. **Explaining** — When user ask a question, the answer will be simple and brief if question
     does not demand that much depth to be explored but if question is a followup on something we
     have been already exploring the go in step-step explanation but the scope of the answer in
     the document should only be topic level not sub-topic exploration (unless asked specifically).

> **NOTE**: IF THE PROMPT CONTAIN BOTH THEN ASK USER WHAT TO ADDRESS FIRST AND THEN EXPLAIN THE
> NEXT. INCLUDE AN EXAMPLE EVERY TIME WHEN THE RESPONSE BENEFITS AND USER WILL HAVE A BETTER
> CONCEPT GRASP.

---

## Building the page

1. Invoke the **`eli5`** skill (the user usually types `/eli5:eli5 <question>`), then
   **`artifact-design`** and **`artifact-diagramming`** — the diagrams _are_ the deliverable, so
   the second is not optional.
2. Every explanation is carried by hand-authored inline SVG. Draw one figure per moving part —
   as many as the topic has. No limit, and no topic is too simple for a diagram.
3. Draw the mechanism, not a labelled box. Position, distance and overlap must mean something:
   the boundary being crossed, the gap, the exact point where it breaks.
4. Every figure gets a caption, and the caption is where the depth lives — the why, the failure,
   the real number or error text. Simple words, real depth. Never restate the picture in prose.
5. Reader is visual learner.

---

## Verification — every time, before you hand it over

Do a basic playwright test for diagrams and explanation guidance. check if all the CONTENT make
sense and follow a simple but knowledge effective tone.

Delete Playwright's screenshots and `.playwright-mcp/` afterwards
