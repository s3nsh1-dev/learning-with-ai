# Curriculum

## Track: docker-compose (started 2026-08-26)

**Scope chosen by user:** essentials, 2 parts.
**Running example:** one web service + one Postgres service, carried through both parts.
**Assumed knowledge:** solid on images vs containers, `docker build`, `docker run`, roughly what a volume is.
Prior pages in this project already covered: build/layers, image vs container, writable layer & volumes, image extensions/tar.

**Goal of the track:** be able to read a `docker-compose.yml` a stranger wrote, and write one for a
web + database stack without copying a template.

---

### Part 1 — Why the file exists  ✅ delivered 2026-08-26

The problem Compose solves and what the file *is*, before any field-by-field detail.

- Running web + db by hand: two `docker run` calls, a network you must create first, flags that
  survive only in shell history.
- Compose does nothing you could not do by hand — it writes it down. Same runtime, declared instead of typed.
- The payoff that sells it: one project network + service names as DNS hostnames (`db:5432`).
- The whole web + db file shown at a glance, annotated — the shape, not yet the details.
- Worked run: `docker compose up -d`, `ps`, and proving `db` resolves from inside `web`.

### Part 1 follow-up — Engine, networks, ports, and file lookup  ✅ delivered 2026-08-27

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

### Part 2 — Writing one yourself  ✅ delivered 2026-08-27

Field-by-field creation of the same file, plus the day-to-day loop.

- `services` keys: `image` vs `build`, `ports` (host:container, and why order bites), `environment`
  vs `env_file`, `volumes` (named volume vs bind mount), `restart`.
- `depends_on` and what it does *not* wait for; `healthcheck` as the actual fix.
- Top-level `volumes:` and `networks:` — why the named volume must be declared twice.
- The loop: `up -d`, `logs -f`, `exec`, `down` vs `down -v`, and when `up --build` is required.
- Project name / `-p`, and the `.env` file next to the compose file.

---

## Track complete

Part 1 quiz: 8/8. Part 2 delivered with its own eight-question quiz.

Running example evolved in Part 2: `web` moved from `image: nginx:alpine` to `build: .` over a real
Python app, with `./app` bind-mounted, `.env` for interpolation, `env_file:` on `db`, a `pg_isready`
healthcheck and `condition: service_healthy`. The `depends_on` race was reproduced live
(`web  Exited (1)`, `[Errno 111] Connection refused`) before the fix was applied.

Not covered, and the natural next steps if a project needs them:
`profiles:`, layering several `-f` files for dev against prod, `deploy:`/`replicas`, and a
top-level `networks:` block.
