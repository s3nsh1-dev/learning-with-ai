# design.md

Content design, not page design. Approach the content with design thinking and the markup falls out on
its own. Baseline is the `eli5` skill — big pictures, few words, depth in the captions. This file only
raises it. `CLAUDE.md` owns routing, serving and verification.

**Two rules that do not bend**

1. Diagram first. Prose only for what the diagram cannot encode.
2. Every table's last column is something the reader can check, not a description.

---

## Priority when goals collide

1. Followable from figures, captions and tables alone.
2. Real depth — mechanism, failure mode, a number. Not restated definitions.
3. Short. Cut whatever survives deletion.
4. Calm enough to read for ten minutes.

---

## Shape

Order that works; deviate when the topic wants otherwise.

Title is the claim, not the topic · `X minutes read` · what it assumes and what you can do after ·
**one anchor diagram of the whole idea before any prose** — it replaces the intro paragraph, so never
write one · sections, each one figure or one table plus the sentence it cannot say · one worked example
with real names and numbers, carried through, shown failing before it works · what this does not cover ·
what you can now do, as observable states.

Curriculum part: full shape, and name what the next part assumes.
Standalone answer: anchor, two to four sections, boundary.
Follow-up: reuse the parent page's anchor and colours, stay at topic level.

---

## Diagrams

Pick the form from the relationship, then the cheapest tool that shows it.

| Relationship | Form |
| --- | --- |
| flow, branch, dependency | Mermaid `flowchart` |
| two parties over time | Mermaid `sequenceDiagram` |
| states and transitions | Mermaid `stateDiagram` |
| layout, tree, aligned numbers, real terminal output | monospace block |
| parallel items sharing attributes | table |
| what none of the above can show | drawn figure, last resort |

**Mermaid first, monospace second, drawn last.** Text diagrams reflow, survive editing, and cannot drift
out of their own frame.

- The caption is where the depth lives. Sparse in the picture, two to four real sentences under it.
- Same object keeps the same name, colour and position in every diagram on the page.
- Six words max in a node, three on an arrow. Longer belongs in the caption.
- Draw the mechanism, not boxes about the mechanism.

---

## Colour

Neutral page. Colour is meaning, never decoration.

- Give each topic, state or stage one hue and keep it on that thing everywhere it appears — heading,
  diagram node, table cell, inline mark. Reading the colour should be as reliable as reading the label.
- Two to four hues per page. More and none of them mean anything.
- Muted and desaturated: dark text on a soft fill. Nothing neon, nothing that vibrates against the ground.
- If the topic has failure states, reserve one hue for broken and one for working.
- Every hue legible on the page ground and in dark mode.
- Each section on its own quiet ground so boundaries are visible without boxes or rules.
- Fresh set per page; a follow-up keeps its parent's set.

---

## Type

Locked scale. Do not improvise sizes.

| Role | Size | Weight |
| --- | --- | --- |
| page title | 40px | 600 |
| section heading | 28px | 600 |
| sub-heading | 20px | 600 |
| body | 18px / 1.65 | 400 |
| caption, table | 16px | 400 |
| label, meta | 14px | 500 |

A section heading is visibly bigger than body, not a bolder version of it. Nothing below 14px.
Body in a real reading face, headings and diagram labels in a plain face, code in mono.
Measure 60–75 characters, and every block of reading matter shares one left edge.

---

## Words

- No paragraph over three lines. No section over roughly 150 words of prose.
- Delete any sentence that restates the figure above it.
- Imperative for rules. No "note that", "keep in mind", "it is worth mentioning".
- Depth in the nouns and numbers, not the adjectives.
- No closing motivational paragraph.

---

## Avoid

Intro paragraph · a section that is only prose · a bullet list of parallel items sharing attributes ·
a figure beside prose that says the same thing · a new metaphor per section · a section that could be
pasted unchanged into a page on another topic · warm cream + serif + terracotta · lone acid-green pop ·
purple-blue gradient hero · Inter/Space Grotesk · emoji section markers.

---

## Before handing over

Strip every paragraph mentally. If figures, captions and tables still carry the page, it is right.

Then: every table's last column is checkable · every hue means exactly one thing · every diagram legible
in dark mode · the worked example appears in a figure, not only in prose.
