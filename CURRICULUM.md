# Curriculum

## Track: docker-compose (started 2026-08-26)

**Scope chosen by user:** essentials, 2 parts.
**Running example:** one web service + one Postgres service, carried through both parts.
**Assumed knowledge:** solid on images vs containers, `docker build`, `docker run`, roughly what a volume is.
Prior pages in this project already covered: build/layers, image vs container, writable layer & volumes, image extensions/tar.

**Goal of the track:** be able to read a `docker-compose.yml` a stranger wrote, and write one for a
web + database stack without copying a template.

---

### Part 1 — Why the file exists ✅ delivered 2026-08-26

The problem Compose solves and what the file _is_, before any field-by-field detail.

- Running web + db by hand: two `docker run` calls, a network you must create first, flags that
  survive only in shell history.
- Compose does nothing you could not do by hand — it writes it down. Same runtime, declared instead of typed.
- The payoff that sells it: one project network + service names as DNS hostnames (`db:5432`).
- The whole web + db file shown at a glance, annotated — the shape, not yet the details.
- Worked run: `docker compose up -d`, `ps`, and proving `db` resolves from inside `web`.

### Part 1 follow-up — Engine, networks, ports, and file lookup ✅ delivered 2026-08-27

Questions raised by Part 1, answered before moving on. Also carries an eight-question quiz on Part 1.

- The client/daemon split: `docker` vs `dockerd`, `/var/run/docker.sock`, `daemon.json`, `/var/lib/docker`,
  and the containerd → runc chain. The daemon is what holds every container's settings.
- Port publishing: host:container, the rewrite rule plus `docker-proxy`, `EXPOSE` as documentation only,
  and `"127.0.0.1:5432:5432"` as the safer form. Demonstrated by publishing `db` and closing it again.
- Docker networks are real Linux bridges (`br-<id>`, 172.18.0.0/16) plus embedded DNS at `127.0.0.11`,
  which is why service names resolve and the default `bridge` network's names do not.
- File lookup: `run` reads nothing, `build` reads `Dockerfile`, `compose` is a CLI plugin that searches
  compose.yaml → compose.yml → docker-compose.yml → docker-compose.yaml, upward from the current folder.
  Compose finds its own containers again by `com.docker.compose.*` labels.

### Part 2 — Writing one yourself

Field-by-field creation of the same file, plus the day-to-day loop.

- `services` keys: `image` vs `build`, `ports` (host:container, and why order bites), `environment`
  vs `env_file`, `volumes` (named volume vs bind mount), `restart`.
- `depends_on` and what it does _not_ wait for; `healthcheck` as the actual fix.
- Top-level `volumes:` and `networks:` — why the named volume must be declared twice.
- The loop: `up -d`, `logs -f`, `exec`, `down` vs `down -v`, and when `up --build` is required.
- Project name / `-p`, and the `.env` file next to the compose file.

### Part 2 page — rebuilt 2026-08-30

Same content, rebuilt against the rewritten `design.md` (now content-first guidance, not a page spec).

- Diagrams are Mermaid: nine blocks, flowcharts plus two sequence diagrams for the `depends_on` race.
  Monospace blocks carry the compose file and the terminal transcripts; tables carry the reference
  lists. No hand-drawn SVG on the page.
- Type scale locked at 40 / 28 / 20 / 18 / 16 / 14.
- Fixed a real defect: `max-width: 68ch` resolved against each element's own font-size, so headings,
  prose, captions and tables each landed on a different left edge. The measure is absolute now and all
  35 reading blocks share one edge.
- The eight-question quiz stays dropped; the checkpoint block does the self-check job.

### Part 2 — A/B rebuild 2026-08-30 (two pages, same content)

Requested by the user to compare learning patterns. Same Part 2 syllabus, same running example,
two different guidance stacks. Both live at once; delete the loser.

| | Version A | Version B |
| --- | --- | --- |
| URL | `localhost:5173/` (`index.html`) | `localhost:5173/version-b.html` |
| Built from | `eli5` + `artifact-design` + `artifact-diagramming` + `CLAUDE.md` + `design.md` | the same skills, **without** `CLAUDE.md` or `design.md` |
| Diagrams | 6 Mermaid (flowcharts + 2 sequence), re-themed on dark | 6 hand-authored inline SVG, `currentColor` |
| Structure | anchor diagram replaces the intro; every section is one figure or one table | lead sentence, then figure, per section |
| Frame | three questions a service answers; the three hues carry it everywhere | walk the file top to bottom, key 1 of 7 |
| Tables | 6, every last column checkable | 2 |
| Prose | 1214 words, no intro paragraph, ~150 words/section cap | 1451 words, a lead paragraph per section |
| Type | locked 40/28/20/18/16/14; Literata / Public Sans / Source Code Pro | free scale; Source Serif 4 / Archivo / IBM Plex Mono |
| Reading time | stated, 10 minutes | not stated |

Verified on both: Google Fonts families measured against a nonexistent-family control (all loaded),
no SVG or Mermaid text past its `viewBox`, no overlapping labels, no text sitting on a stroke, no
page-level horizontal scroll at 1280px or 390px, and contrast above 6:1 in light and dark.

Two real defects found and fixed during verification:
- A: `<br/>` written literally inside `<pre class="mermaid">` is eaten by the HTML parser, so every
  multi-line node label silently rendered as one run-on line. It has to be `&lt;br/&gt;`.
- B: `section { display: flex }` gives children `min-width: auto`, so a wide `<pre>` pushed the whole
  page sideways at 390px. Fixed with `min-width: 0` on the flex children.

## Track complete

Part 1 quiz: 8/8. Part 2 delivered with its own eight-question quiz.

Running example evolved in Part 2: `web` moved from `image: nginx:alpine` to `build: .` over a real
Python app, with `./app` bind-mounted, `.env` for interpolation, `env_file:` on `db`, a `pg_isready`
healthcheck and `condition: service_healthy`. The `depends_on` race was reproduced live
(`web  Exited (1)`, `[Errno 111] Connection refused`) before the fix was applied.

Not covered, and the natural next steps if a project needs them:
`profiles:`, layering several `-f` files for dev against prod, `deploy:`/`replicas`, and a
top-level `networks:` block.
