# Curriculum

## Track: docker-compose (started 2026-08-26)

**Scope chosen by user:** essentials, 2 stages.
**Running example:** one web service + one Postgres service, carried through both stages.
**Assumed knowledge:** solid on images vs containers, `docker build`, `docker run`, roughly what a volume is.
Prior pages in this project already covered: build/layers, image vs container, writable layer & volumes, image extensions/tar.

**Goal of the track:** read a `docker-compose.yml` a stranger wrote, and write one for a
web + database stack without copying a template.

> Stages were labelled "Part" in earlier entries. Same thing, renamed to match `CLAUDE.md`.

---

## Status

| Stage | Content page | MCQ | Score |
| --- | --- | --- | --- |
| 1 — Why the file exists | ✅ 2026-08-26 | ✅ 2026-08-27 | **8/8** |
| 1F — Engine, networks, ports, file lookup | ✅ 2026-08-27 | folded into the Stage 1 MCQ | — |
| 2 — Writing one yourself | ✅ 2026-08-30 | ✅ 2026-09-02 · live at `localhost:5173/` | ⏳ **awaiting score** |

**Where we are now:** user finished the Stage 2 page and the Stage 2 MCQ is live. Waiting on the
score. Record it in the table above the moment they report it.

**Track is not complete.** It closes when the Stage 2 MCQ is scored and any gaps it exposes
are re-taught.

---

## Stage 1 — Why the file exists ✅ delivered 2026-08-26

The problem Compose solves and what the file _is_, before any field-by-field detail.

- Running web + db by hand: two `docker run` calls, a network you must create first, flags that
  survive only in shell history.
- Compose does nothing you could not do by hand — it writes it down. Same runtime, declared instead of typed.
- The payoff that sells it: one project network + service names as DNS hostnames (`db:5432`).
- The whole web + db file shown at a glance, annotated — the shape, not yet the details.
- Worked run: `docker compose up -d`, `ps`, and proving `db` resolves from inside `web`.

## Stage 1 follow-up — Engine, networks, ports, file lookup ✅ delivered 2026-08-27

Questions raised by Stage 1, answered before moving on.

- The client/daemon split: `docker` vs `dockerd`, `/var/run/docker.sock`, `daemon.json`, `/var/lib/docker`,
  and the containerd → runc chain. The daemon is what holds every container's settings.
- Port publishing: host:container, the rewrite rule plus `docker-proxy`, `EXPOSE` as documentation only,
  and `"127.0.0.1:5432:5432"` as the safer form. Demonstrated by publishing `db` and closing it again.
- Docker networks are real Linux bridges (`br-<id>`, 172.18.0.0/16) plus embedded DNS at `127.0.0.11`,
  which is why service names resolve and the default `bridge` network's names do not.
- File lookup: `run` reads nothing, `build` reads `Dockerfile`, `compose` is a CLI plugin that searches
  compose.yaml → compose.yml → docker-compose.yml → docker-compose.yaml, upward from the current folder.
  Compose finds its own containers again by `com.docker.compose.*` labels.

## Stage 1 MCQ ✅ 2026-08-27 — 8/8

Eight questions, carried on the Stage 1 follow-up page.

**Result:** 8/8. No misconceptions surfaced, no re-teach needed, no adjustment made to the
Stage 2 plan. Depth level confirmed as correctly pitched — keep the same density for Stage 2.

---

## Stage 2 — Writing one yourself ✅ page delivered 2026-08-30

Field-by-field creation of the same file, plus the day-to-day loop. Live at `localhost:5173/`.

- `services` keys: `image` vs `build`, `ports` (host:container, and why order bites), `environment`
  vs `env_file`, `volumes` (named volume vs bind mount), `restart`.
- `depends_on` and what it does _not_ wait for; `healthcheck` as the actual fix.
- Top-level `volumes:` — why the named volume must be declared twice.
- The loop: `up -d`, `ps`, `logs -f`, `exec`, `down` vs `down -v`, and when `up --build` is required.
- Project name / `-p`, and the `.env` file next to the compose file.

Running example evolved here: `web` moved from `image: nginx:alpine` to `build: .` over a real
Python app, with `./app` bind-mounted, `.env` for interpolation, `env_file:` on `db`, a `pg_isready`
healthcheck and `condition: service_healthy`. The `depends_on` race was reproduced live
(`web  Exited (1)`, `[Errno 111] Connection refused`) before the fix was applied.

Page carries 6 hand-authored inline SVG figures, 2 tables, and a closing 6-question self-check.

## Stage 2 MCQ ✅ delivered 2026-09-02 — score pending

Live at `localhost:5173/`, titled *Eight traps in a compose file*. The six open-ended self-check
questions from the Stage 2 page became MCQs 1–6; 7 and 8 are new.

| # | Tests | Trap it catches | Key |
| --- | --- | --- | --- |
| 1 | the two places `pgdata` appears | reference vs declaration | C |
| 2 | which half of `"${WEB_PORT}:8000"` is the host | port order reversed silently works | A |
| 3 | why `db` needs no `ports` | publishing a database by reflex; `EXPOSE` publishes nothing | D |
| 4 | the two keys that fix a cold-laptop crash | `healthcheck` **and** `condition`, not either alone | C |
| 5 | why `up -d` shows no new dependency | build cache — `--build` is never automatic | A |
| 6 | which stop command destroys rows | `down` vs `down -v`, and the bind mount nothing can touch | B |
| 7 | `environment` vs `env_file` vs `.env` | `.env` fills blanks in the file and reaches no container | C |
| 8 | `unless-stopped` vs `always` | `always` overrules a deliberate `stop` across a reboot | D |

Structure: one hero figure mapping every question onto the line of the finished file it stands on
(five of the eight numbers appear twice, which is the "pairs of lines that must agree" idea made
visible), then eight question cards, each with an inline-SVG figure in the explanation that only
appears once the question is answered. One shot per question, no retry.

The scorecard at the foot fills in live, names the traps missed by number, and says what happens
next at each score band. Distractors were written to be arguable rather than filler — Q4 A
(`restart:` as a retry loop) and Q5 B (a bind mount hiding installed packages) are both real
behaviour, just not the answer to that question, and the explanations say so.

**After scoring:** record the result in the status table, and re-teach anything missed as its own
page before calling the track complete. Per `CLAUDE.md`, the MCQ exists to adjust the curriculum,
not just to grade it.

---

## Design track — resolved 2026-08-30

Stage 2 was built three ways and compared, to settle how these pages should look. Resolved; the
losing builds and their config are deleted.

| | A | **B — winner** | C |
| --- | --- | --- | --- |
| Built from | `eli5` + artifact skills + `CLAUDE.md` + `design.md` | `eli5` + artifact skills | codex + `.agents/` skills |
| Diagrams | 6 Mermaid | **6 hand-authored inline SVG** | 6 inline SVG, decorative |
| Verdict | auto-layout; every flowchart looks alike | geometry carries the argument | illustration where explanation belongs |

**Standing decision on file layout:** one self-contained `index.html`, inline `<style>` and
`<script>`, no `style.css` or `script.js`. A split was tried once from `prompt.txt` on 2026-09-02
and reverted the same day at the user's word. `prompt.txt` on disk still holds that retired
experimental prompt; treat `CURRICULUM.md` as the source of truth, not that file.

**Decision:** B is now `index.html`. `design.md` deleted — its "Mermaid first, drawn last" rule
inverted `artifact-diagramming`'s own hand-SVG guidance and produced the weakest of the three.
Stack is now `eli5` + `CLAUDE.md` + the built-in artifact skills, nothing else.

**Standard applied during verification, worth repeating each time:** Google Fonts families measured
against a nonexistent-family control (silent 404s are the trap), no SVG text past its `viewBox`,
no overlapping labels, no text sitting on a stroke, no page-level horizontal scroll at 1280px or
390px, contrast above 6:1 in light and dark.

**Live defect fixed in the current page:** `section { display: flex }` gives children
`min-width: auto`, so a wide `<pre>` pushed the whole page sideways at 390px. Fixed with
`min-width: 0` on the flex children — the rule is still in `index.html`, do not drop it.

---

## Not covered

The natural next steps if a project needs them: `profiles:`, layering several `-f` files for dev
against prod, `deploy:`/`replicas`, and a top-level `networks:` block.
