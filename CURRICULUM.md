# CI/CD for the Docker Todo app

## Track outcome

You will add a GitHub Actions delivery pipeline to
`docker-beginner-simulation`. The project will test pull requests, publish
private client and server images to GitHub Container Registry, and deploy the
approved `main` commit to one AWS EC2 instance.

This is a project-first track for a software engineer who understands why CI
and CD exist but has not wired a pipeline together before. Every stage changes
or verifies a real part of the Todo app. The final result is intentionally
small enough to run and debug yourself, while using the habits that matter in
production: isolated tests, immutable releases, secrets outside images,
health checks, serialized deployments, and a rollback path.

## Capstone contract

- Pull requests run quality, integration, and end-to-end checks. They never
  publish images or use deployment secrets.
- A merge to `main` runs the same checks, publishes two GHCR images tagged
  with the Git commit SHA, then deploys that exact tag.
- EC2 pulls private images, keeps `DATABASE_URL` in a host-only environment
  file, and exposes only the Nginx frontend on port 80.
- A short restart during deployment is acceptable. A domain, TLS, load
  balancer, and zero-downtime deployment are follow-up work.

## Prerequisites

- A GitHub account and access to the `s3nsh1-dev/docker-beginner-simulation`
  repository.
- Docker Desktop or Docker Engine with Docker Compose.
- Node 24 with Corepack and pnpm 12.4.2.
- An AWS account for the final EC2 stage. You do not need an instance yet.

## Acceptance criteria

- The lesson page renders correctly at desktop and phone widths, preserves topic state, requires explicit completion, and has working keyboard controls.
- A broken pull request fails CI without publishing an image or reaching EC2.
- CI uses only disposable Postgres data, never the production Neon database.
- A merged main commit publishes both SHA-tagged images, deploys those exact tags, and passes the public health endpoint.
- A deliberately bad release triggers automatic restoration of the prior tag.
- Deployment logs contain no database URL, GitHub token, or SSH key.

## Stages

## Stage 1: Map the delivery system

**Status:** Current

Learn how this specific Todo app moves from a feature branch to a running
container stack. Identify the React and Nginx client image, Express server
image, Neon database, health endpoint, GitHub Actions runner, GHCR, and EC2.

**Capstone work:** Draw the delivery path and separate the untrusted pull
request path from the trusted `main` deployment path. Decide which data stays
on EC2 and which values must never enter a Docker image or Git repository.

**Ready to continue when:** You can explain why the client and server are
separate images, why the server has no public host port, and why a commit SHA
is safer than `latest` for deployment.

## Stage 2: Make tests safe and repeatable

Turn the existing checks into reliable CI inputs. The current server test
writes to its configured database, and the browser tests need a full stack.

**Capstone work:** Create an ephemeral PostgreSQL test environment, replace
console-only assertions with failing assertions, clean up test data, and run
Playwright against the Dockerized client, server, and disposable database.

**Ready to continue when:** Tests never reach Neon production data, pass from
a clean checkout, and leave no containers or test data behind.

## Stage 3: Build the pull-request CI gate

Create the first version of the GitHub Actions workflow. Learn triggers,
jobs, permissions, dependency caching, service containers, artifacts, and
failure logs.

**Capstone work:** Run client lint and build checks, server typecheck, build,
and integration tests, then run full-stack end-to-end tests. Trigger them for
pull requests and pushes to `main`.

**Ready to continue when:** A deliberately broken pull request fails in
GitHub before it can be merged, while a green pull request has not published
or deployed anything.

## Stage 4: Publish immutable images to GHCR

Package the client and server only after trusted checks pass. Learn registry
authentication, job permissions, build cache, image labels, and immutable
tags.

**Capstone work:** Build and push private images named
`ghcr.io/s3nsh1-dev/docker-beginner-simulation-client` and
`ghcr.io/s3nsh1-dev/docker-beginner-simulation-server`, each tagged with the
merged commit SHA.

**Ready to continue when:** Both images can be found in GHCR and their tags
identify the exact commit that created them. Pull requests still cannot push
packages.

## Stage 5: Define the production Compose contract

Split local Docker development from production deployment. Learn why
production pulls prebuilt images instead of building source code on EC2.

**Capstone work:** Keep the existing local Compose setup, add a production
Compose file that consumes GHCR images, reads `IMAGE_TAG` from `release.env`,
reads runtime secrets from a host-only `server.env`, exposes Nginx on port 80,
and keeps the API internal.

**Ready to continue when:** `docker compose config` validates the production
file and changing only `IMAGE_TAG` selects a different complete release.

## Stage 6: Prepare and secure EC2

Create a small Ubuntu 24.04 x86 EC2 instance and make it a predictable Docker
host. Learn the minimum roles of a security group, SSH keys, environment
files, Docker Compose, and registry login.

**Capstone work:** Install Docker and Compose, create `/opt/todo-app`, store
the database URL in a permission-restricted `server.env`, and authenticate the
host to private GHCR images with a read-only package token.

**Ready to continue when:** EC2 can pull an image manually, start the
production Compose file, and respond to `/api/health` through Nginx.

## Stage 7: Deploy from main

Finish continuous delivery with a small, visible deployment sequence. Learn
repository secrets, SSH host verification, concurrency protection, remote
commands, health polling, and deploy logs.

**Capstone work:** After the publish jobs succeed on `main`, copy the
production Compose file to EC2, write the release SHA, pull the two images,
recreate the services, and verify the health endpoint. Keep the previous tag
for rollback.

**Ready to continue when:** Merging a green pull request updates EC2 to the
same SHA shown in GHCR, and two deployments cannot run over each other.

## Stage 8: Practice rollback and operate the pipeline

Treat the pipeline as a system you own, not a one-time setup. Learn how to
read Actions logs, inspect image tags, view Docker logs, distinguish build
failures from deployment failures, and recover safely.

**Capstone work:** Simulate a failing health check, restore the previous
release tag, review logs, document the recovery commands, and verify the
normal delivery path once more.

**Ready to finish when:** You can diagnose which stage failed, roll back to a
known-good SHA, and explain what would need to change before adding TLS or
zero-downtime deployment.

## Security boundaries for this capstone

The CI runner receives only the permissions it needs. Pull request jobs do not
receive package-write or deployment credentials. The Actions token publishes
GHCR images, while EC2 uses its own read-only registry credential. The
database URL exists only in an ignored local environment file and in the
restricted EC2 `server.env` file.

The deployment lesson uses SSH because it is the most approachable route for
this small project. It still uses key-only login, a dedicated deploy key, and
a verified host key. A later advanced track can replace this with AWS Systems
Manager and GitHub OIDC to avoid automation over public SSH.

