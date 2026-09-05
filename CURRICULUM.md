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
| 2 — Writing one yourself | ✅ 2026-08-30 | ✅ 2026-09-02 | **6/8** |
| 2R — Re-teach: storage and settings | ✅ 2026-09-02 | ✅ 2026-09-02 | **4/4** |
| 3 — Capstone: the Rainfall brief | ✅ 2026-09-02 | the exercise *is* the test | draft 1: **6 / 4 / 10** |
| 3M — Draft 1 marked | ✅ 2026-09-03 | — | 4/10 |
| 3G — The six questions (guided build) | ✅ 2026-09-03 | — | ⏳ **awaiting draft 2** |
| 3Q — Three follow-ups on the file | ✅ 2026-09-05 · live at `localhost:5173/` | — | not a test |

**TRACK COMPLETE — 2026-09-02.** Stage 2 scored 6/8, missing Q6 (`down` vs `down -v`) and Q7
(`.env` vs `environment` vs `env_file`). Both were re-taught on one page framed around ownership,
and the re-check came back 4/4. No gaps outstanding.

**Goal check.** The stated goal was: read a `docker-compose.yml` a stranger wrote, and write one
for a web + database stack without copying a template. Both halves are evidenced — 8/8 on Stage 1,
6/8 then 4/4 on Stage 2, with the two misses closed rather than papered over.

**Outstanding: capstone draft 2.** Draft 1 was marked 6/4/10 and ranked 4/10. The user then said
the brief and the marking were confusing, that they know the basics but have never built a file
from scratch, and asked to be *guided and corrected* rather than tested again. That request
overrides the earlier "do not write the solution" note — **the worked answer is now on the page and
that was the right call.**

Mark draft 2 against the same twenty when it lands. The curriculum finishes there.

**Next track is unchosen and should not be started.** The user has said this is the last thing.
Do not assume the "not covered" list below is a plan.

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

**Result: 6/8 on 2026-09-02.** Missed Q6 and Q7. Everything else clean, including the two
distractors written to be arguable (Q4 A and Q5 B), so the pitch of the material is right.

**What the two misses had in common:** both are boundary questions. Q6 assumed a command crosses
into the user's own filesystem; Q7 assumed a file crosses into the container. Neither was a
memory failure, so the re-teach reframes both around ownership rather than re-listing the rules.

---

## Stage 2 re-teach — Which side of the wall ✅ delivered 2026-09-02

Built in response to the 6/8. One page covering only the two misses, framed by the thing they
share: **the wall is an ownership boundary, and the question is always which side a thing is on.**

Question 6 half — storage:
- Reach of `stop` / `down` / `down -v` drawn as one axis, with `./app` past the wall and out of
  range of all three. `down --rmi local` mentioned in prose, not drawn.
- Where the bytes physically sit: named volume → `/var/lib/docker/volumes/myapp_pgdata/_data`,
  bind mount → your own path, and the third case that was never taught in Stage 2 —
  **anonymous volumes.** The postgres image declares `VOLUME /var/lib/postgresql/data` itself, so
  with no `volumes:` line Docker still makes one, under a random 64-char name, and `down` orphans
  it. That is the real mechanism behind "my rows disappeared without `-v`".
- `docker compose config --volumes` against `docker volume ls` as the check before typing `-v`,
  and `docker volume ls -f dangling=true` for finding orphans.

Question 7 half — settings:
- Redrawn as a **timeline rather than a wall**, because the true difference is *when* each file is
  read, not where it sits. Moment 1 parses text and consumes `.env`; moment 2 creates containers
  and consumes `environment:` / `env_file:`.
- New material Stage 2 did not cover: **precedence** (`environment:` > `env_file:` > Dockerfile
  `ENV`, with `.env` not on that ladder at all).
- The resolution: `TAG: ${TAG}` carries a `.env` value across in two deliberate steps. Writing the
  name twice is what crossing the wall costs.

Re-check on the page: 4 MCQs, key C A D B. Q1 tests the anonymous-volume mechanism, Q2 asks the
`down -v` question inverted (choose it deliberately, for a fresh DB, without losing `./app`),
Q3 uses `docker compose --env-file` as the sharp distractor, Q4 tests precedence.

**Scored 4/4 on 2026-09-02, which closed the track.** Both boundary questions came back clean,
including the inverted `down -v` question and the `--env-file` distractor. The reframe worked:
the misses were never memory failures, so re-listing the rules would not have fixed them.

---

## Stage 3 — Capstone: the Rainfall brief ✅ delivered 2026-09-02

Requested by the user in place of more theory: one detailed imaginary project, drawn, that they
write a compose file for. Declared by them to be the final item in the curriculum.

**The scenario.** *Rainfall*, a rain-radar archive for an amateur weather club. Four services:
`api` and `collector` built from one Dockerfile in `./api` and required to run the same image,
plus `postgres:16` and `redis:7` pulled. The collector wakes on a timer, fetches a frame from an
upstream feed, writes the file and records the timestamp; the api serves the archive.

**The rule the whole brief is written under: every requirement states a behaviour, never a key.**
Verified — the rendered page contains no occurrence of `healthcheck:`, `depends_on:`, `restart:`,
`env_file:`, `volumes:`, `service_healthy`, `unless-stopped`, `127.0.0.1:5432`, or `${`. There is
no compose YAML on the page at all. Do not add one.

Twenty requirements, each mapping to something the track taught:

| Group | Reqs | What it forces |
| --- | --- | --- |
| What runs | R1–R3 | `build` vs `image`; one image serving two services |
| Reachability | R4–R7 | host:container order; not publishing a db; `127.0.0.1:` binding; outbound needs nothing |
| Storage | R8–R11 | named volume vs bind mount, both directions; not adding a volume to the cache |
| Config | R12–R15 | `env_file` for secrets, `environment` for wiring, `.env` for interpolation, service name as hostname |
| Ordering | R16–R17 | `healthcheck` + `condition`, on two dependencies |
| Failure, identity | R18–R20 | `unless-stopped` over `always`; top-level `name:` |

`.env` and `.env.db` are **given** on the page as inputs, so the exercise is `compose.yaml` alone.

**One key deliberately outside what was taught:** `command:`, flagged openly as such, to make the
collector run something other than the image's default. Told to look it up rather than work around
it, because the workaround (building twice) breaks R2.

Five figures: the system on one network bus, a three-row reachability table where rows 2 and 3
differ only in *who*, the three stores with different survival requirements, a cold-start timeline
marking the earliest legal start, and the repo tree. Plus a self-marking shell block, since every
requirement is observable.

**Marking guidance for when the file arrives.** The traps most likely to show up, in order:
one image built twice (R2); a volume on the cache (R10); `DATABASE_URL` with the password typed
into `compose.yaml` (R12 vs R15, resolved by interpolating from the env_file values); `always`
instead of `unless-stopped` (R19); `depends_on` with no condition (R16); and `./frames` mounted as
a named volume, which passes "it survives" and fails "the host can read it" (R9).

---

## Stage 3G — The six questions ✅ delivered 2026-09-03

**Why it exists.** The user's feedback on the brief: confusing, and not what someone who has just
learned the basics needs in order to write a file from scratch. Acted on, not defended.

**What the brief got wrong, recorded so it does not recur:**

1. Every requirement stated a behaviour and never a key, deliberately. But behaviour to key *is* the
   skill, and it had never been demonstrated once. The brief graded a step the track skipped.
2. Twenty requirements across five sections with no place where the file ever appears taking shape.
   No scaffold, all state held in the reader's head.
3. **R12 and R15 were not jointly satisfiable.** `.env.db` was declared committed-exempt but is only
   read as `env_file`, which is applied at container-create time and never feeds `${...}`
   interpolation. So `DATABASE_URL` could not contain the password without writing it literally.
   The fix is to keep the credentials in `.env` (the interpolation source) and gitignore *that*;
   `.env.db` is deleted. The brief's "`.env` is committed" line was arbitrary and created the
   contradiction. **This was the brief's defect, not the user's error.**

**The page's contribution: a procedure, which is what was missing.** Six questions, asked in order,
once per service, each producing one key. Source, ports, storage, config, ordering, restart, plus
one file-level question (`name:`) asked first. Then the same six as a 4x6 grid filled in for
Rainfall before any YAML is typed, then six passes that build the file one question at a time
across all four services (across, not down — going down is what made the user forget `collector`),
then the complete file, then a 17-row table mapping every correction back to its question number.

**The finished file is verified, not just reasoned about.** Extracted from the page, parsed, and run
through `docker compose config` with the new `.env`. Confirmed resolved output: password
interpolated into `DATABASE_URL`, `published: "4000"` from `${WEB_PORT}`, `host_ip: 127.0.0.1` on
the db port, `image: postgres:16` from `${PG_TAG}`, `type: bind` for the two `./` mounts against
`type: volume` for `db_data`, both healthchecks present for the four `service_healthy` conditions,
and `rainfall_db_data` showing the project-name prefix. Redo that check on any future answer page.

**Deliberately fewer figures (3, not 7).** The complaint was confusion; the response was heavier
annotated YAML and a lighter diagram load, keeping figures only where they carry a mechanism the
prose cannot.

The user's `docker-compose.yml` was left untouched. Writing the finished file to disk was offered,
not done.

---

## Capstone draft 1 — marked 2026-09-03

Delivered as `docker-compose.yml` in the project root. **6 met · 4 half met · 10 not met**, and six
separate faults stop it before it serves anything.

**Met:** R1 (four services, right sources), R4 (`"4000:8000"`, order correct), R7 (nothing added for
outbound), R8 (`db_data` mounted *and* declared), R18 and R19 (`unless-stopped`, not `always`).

**Half met:** R3 (`postgres:15-alpine`, brief said 16 and `.env` says `PG_TAG=16`), R6 (treasurer can
connect, but so can everyone), R13 (`db` and `api` have credentials, `collector` has none),
R15 (`DATABASE_URL` present with the correct `db` hostname; no `REDIS_URL`, none on `collector`).

**Blockers, in the order they surface:**

1. `collectors_data:` top-level against `collector_data:` in the service. The stage 2 Q1 error, verbatim.
2. `env_file:` points at `.env.collector` and `.env.cache`, neither of which exists. `.env` and `.env.db`, which do, are never opened.
3. `build: context: .` — no Dockerfile at the repo root; it is in `./api`.
4. `image: api` on `collector` resolves to `docker.io/library/api`. There is no `image:` form meaning "what the service above built".
5. `- ./api` and `- cache_data/var/lib/redis/data` have no colon, so their target is a relative path. Both rejected.
6. Consequence of 4: `collector` would never run the project's code.

**Concept gaps, as opposed to slips:** storage (R9/R10/R11 — a named volume where the host must
read the bytes, a volume on the cache that should not exist, a bind mount with no target),
configuration (R12/R14 — password twice in a committed file, no interpolation at all), ordering
(R16/R17 — `depends_on` with no condition, and a healthcheck written on `api`, the asker, rather
than on `db` and `cache`, the answerers), and identity (R20 — no top-level `name:`).

**The shape of the result, worth carrying into draft 2:** the four hardest individual calls in the
brief are all correct. What is missing is those same ideas applied to the services that are not
`api`. Framed that way in the report rather than as ten scattered misses.

Report carries 7 figures: the scorecard by group, the five-stage failure chain, where `image: api`
resolves, the four-row access table against what the brief required, three volume lines against
three requirements, the env-file inversion (referenced files missing, existing files unread), and
the ordering gap.

---

## Stage 3Q — Three follow-ups on the file ✅ delivered 2026-09-05

Not a stage and not a test. Three questions the user asked after reading their own
`docker-compose.yml`, answered as one page titled *Address, folder, moment*. The framing that made
it one page rather than three: **each question is a default that was decided before the user got to
look at it.**

**Q1 — `127.0.0.1:` when the phone cannot even reach Vite.** The user's evidence was real and their
conclusion was wrong: the phone failed because *Vite* binds loopback, not because laptops are
unreachable. Measured live on their machine and put on the page as real output:

- `ss -ltn` → `[::1]:5173` (vite), `127.0.0.1:8082` (`-p 127.0.0.1:8082:80`), `0.0.0.0:8081` (`-p 8081:80`).
- `curl 192.168.1.12:8081` → **HTTP 200**; `:8082` and `:5173` → **connection refused**.
- So `-p 8081:80` and `-p 0.0.0.0:8081:80` are the same instruction — omitting the address means
  *all* addresses, not none. `npm run dev -- --host` flips Vite to the same side.

Also covered: the same file on three wifi networks (5 / 40 / 200 strangers, one unchanged line, and
no way to tell from the laptop whether a public network isolates clients); what is behind the door
(HTML vs a Postgres login prompt whose password is in `.env`); and **the ufw bypass** — a published
port is not closed by `ufw deny`, because after Docker's DNAT the packet is judged in `FORWARD`
while ufw's rules live in `INPUT`. That last one is **flagged on the page as documented behaviour,
not measured** — proving it needs a second device on the wifi, and there is no passwordless sudo
here to read `iptables`. Do not upgrade that claim without evidence.

**Q2 — what a collector is, and why it repeats the api's volumes.** Answered as: *there are two ways
a program gets work — somebody asks it, or a clock tells it.* The mechanism drawn is **which side
opens the connection**, because that is what decides the `ports:` line: something dials in to the
api, nothing ever dials in to the collector. Then five keys shown identical on purpose against two
that differ (`ports:` and `command:`), with the measured note that Compose tags the two builds
separately (`rainfall-api`, `rainfall-collector`) but the second build reported `0.0s`.

The volumes half is drawn as a **comparison**: one shared `./frames` against the version where each
service gets its own volume — which boots cleanly, passes both healthchecks, logs successful fetches
every five minutes, and serves an empty site forever with no error anywhere. Demonstrated live with
two containers on one bind mount: the api container's `ls`, the host's `ls`, and
`docker exec api cat …` all agreeing.

**Answered the "none of the compose files online have this" objection directly**, because it was the
real question: tutorial stacks are web + db, where only one service owns files, so sharing is never
demonstrated and the reader generalises "one volume, one service". The rule as stated on the page:
*share a directory when two processes must see the same files* — with the exception named (never two
Postgres containers on one data directory).

**Q3 — where `${WEB_PORT}` comes from with no `env_file`.** This is Stage 2R's timeline, which the
user scored 4/4 on, not reconnected to their own file. Reframed and proved rather than restated.
The proof, built and run for this page:

```
services:
  web:
    image: nginx:alpine
    env_file: .env.web          # WEB_PORT=9999
    ports: ["${WEB_PORT}:8000"] # .env says WEB_PORT=4000
```
`docker compose config` renders `published: "4000"` **and** `environment: WEB_PORT: "9999"` — one
name, two values, one file, no conflict reported, because there isn't one. Delete `.env` and
`published:` vanishes from the output while the container keeps its 9999; it is a **warning, not an
error**, so `up` proceeds.

**Closed on the user's own file.** `docker compose config` in this repo right now emits 13 warnings
and renders `DATABASE_URL: postgresql://:@db:5432/`, `image: 'postgres:'`, and an api port with no
`published:` — because **there is no `.env` in the repo** (gitignored, never created). The line that
survives is `host_ip: 127.0.0.1`, since it was typed rather than interpolated. That contrast is the
sharpest single teaching moment on the page and it came from their own file.

**On the compose file itself.** It carries every property recorded as verified for the Stage 3G
answer: `name: rainfall`, `build: ./api` on both services with `command:` only on `collector`,
`"${WEB_PORT}:8000"`, `"127.0.0.1:5432:5432"`, `postgres:${PG_TAG}`, `db_data` mounted and declared,
`./api` and `./frames` as bind mounts, both healthchecks, four `service_healthy` conditions, and
`unless-stopped` throughout — plus the six-question checklist kept as comments at the foot. **It was
not marked as draft 2 and should not be**: marking it would be marking the worked answer. What
arrived instead were these three questions, which is the better signal. **The one actionable gap is
the missing `.env`**, and the page says which five names it needs.

**Verification.** Playwright at 1280 and 390. Nine hand-authored inline SVG figures, all captioned,
no text outside any `viewBox`, zero text-on-text overlaps across all nine, all three Google Fonts
families measured as loaded against a nonexistent-family control. One real defect found and fixed:
a long inline `<code>` (`white-space: nowrap`) pushed the page sideways at 390px — 412 vs 390 — so
the narrow media query now sets `white-space: normal; overflow-wrap: anywhere` on `code`. **Keep
that rule**, alongside the existing `min-width: 0` on flex children. Screenshots and
`.playwright-mcp/` deleted.

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

Left out of this track on purpose. Any of these could seed a follow-up track, but none is chosen:

- `profiles:` for services only some people run.
- Layering several `-f` files, dev against prod, on one base.
- `deploy:` and `replicas`.
- A top-level `networks:` block, for when one network stops being enough.
- Multi-stage builds and image size, which is Dockerfile territory rather than Compose.
