# Curriculum

## GitHub Actions and CI/CD — practical intermediate level

**Started:** 2026-09-06. **Status:** planned; Stage 1 is next.
**Requested scope:** understand, read, implement, and debug real GitHub Actions pipelines.
**Current task:** update this file only. Do not change `index.html` or begin a lesson yet.

The Docker Compose learning content is finished. Carry forward the learner's understanding of
containers, ports, storage, and environment variables. Do not reopen the previous capstone.
Briefly check Git and npm prerequisites during the relevant lessons, rather than assuming fluency.

### Completion means demonstrated ability

By the end, the learner can:

- Trace a local change through commit, push, PR, checks, merge, and deployment, identifying the
  machine executing each command and the commit being tested or released.
- Read unfamiliar workflow YAML, follow referenced scripts/actions, explain what it does, and
  identify required settings outside the file.
- Translate requirements into a correct pipeline, validate it, and fix a failed run without
  weakening the check that caught the problem.
- Distinguish CI, continuous delivery, and continuous deployment; choose between Vercel's native
  automation and GitHub Actions orchestration.
- Handle secrets and permissions safely, control release order, and verify the deployed version.

Reading lessons alone does not establish independent implementation ability. Completion is based
on the assessments below, not a promise of an engineering job title.

### One consistent running project

Use **Rainfall Web**, a small standalone rainfall dashboard continuing the previous track's
weather-club theme. This is a teaching app, not an assumption about files already in this repo.

- A Node/npm-powered static web app using Vite, deployable to Vercel.
- One behavior to follow: convert and display a rainfall reading from deterministic sample data.
  No live API credentials, database, or background collector is needed.
- Stable commands: `npm ci`, `npm run lint`, `npm test` (single run, no watch mode), and
  `npm run build` (output: `dist/`). Supply and explain their actual package scripts.
- Stable names: production branch `main`, feature branch `feature/rainfall-units`, workflow
  `.github/workflows/ci.yml`, and initial job `verify`. Introduce `deploy.yml` only at Stage 7.
- Choose one supported Node LTS version at lesson time; use it consistently locally and in CI.
  Verify current action versions rather than hard-coding unverified releases into this plan.
- Begin with one job and extend the same workflow. Explain any renaming, especially where required
  status checks depend on job names. Keep the current complete example visible alongside changes.

A dedicated practice repository can be chosen when hands-on work begins. Explanations and paper
exercises do not require account access. Label evidence as local validation, a real remote run,
or a predicted result; never present a simulated run as GitHub execution.

### Teaching and assessment contract

Every stage follows **explain → demonstrate → guided change → independent assessment**.
When lessons are requested, use the repository's visual explainer workflow. A dense stage may
span several focused lesson pages while keeping the same project and stage number.

Before the next stage:

1. Give **6 MCQs**: four on the current stage's core ideas and two revisiting earlier dependencies.
   Stage 1 uses six foundational questions. Prefer predicting behavior from scenarios and snippets
   over recalling names. Reveal answers after submission.
2. Give the practical task specified for that stage. Begin with tracing; progress to reading,
   editing, and debugging. Assess only techniques already demonstrated.
3. Require **at least 5/6**, the practical outcome met, and every critical misconception corrected.
   A high score cannot compensate for exposing secrets or bypassing the intended release gate.
4. Explain misses, reteach the mechanism, and give fresh equivalent questions or a repair task.
   Record the original score and recheck separately; distinguish slips from conceptual gaps.
5. Record the evidence before advancing. If the user explicitly skips a test, record it as
   unassessed, not passed.

Documentation is allowed during practical work: finding and applying it is part of the skill.
Do not repeat the previous track's jump from worked examples to a large unexplained brief.
Demonstrate how requirements become YAML before asking for independent construction.

### Progress

| Stage | Focus | Lesson | MCQ / recheck | Practical evidence |
| --- | --- | --- | --- | --- |
| 1 | What happens after a push? | Not started | — | — |
| 2 | Read and create the first workflow | Not started | — | — |
| 3 | Useful CI and debugging | Not started | — | — |
| 4 | PR checks and merge rules | Not started | — | — |
| 5 | Jobs, data, and efficient execution | Not started | — | — |
| 6 | Configuration, secrets, and trust | Not started | — | — |
| 7 | Vercel and deployment control | Not started | — | — |
| 8 | Reading and maintaining real workflows | Not started | — | — |
| 9 | Independent capstone and transfer test | Not started | — | — |

After assessment, add a short result under that stage: date, score, misconceptions, practical
evidence, recheck, and next action. Do not mark the track complete with outstanding required tests.

## Stage 1 — What happens after a push?

**Outcome:** locate automation in the development lifecycle before reading YAML.

Teach the local working tree, local commits, remote branches on GitHub, the runner's checkout,
and the deployed site as distinct states. Follow one commit through edit → commit → push →
open/update PR → checks → merge → deployment. Show which transitions require configuration.

Introduce CI as automated integration feedback, continuous delivery as keeping changes releasable
with a release decision, and continuous deployment as automatically releasing eligible changes.
Separate the GitHub Actions platform, a workflow, and a reusable action. Pipelines can exist
without GitHub Actions. Briefly place Vercel beside GitHub as another system responding to a push.

A hosted runner does not execute on the learner's laptop. A failed check does not undo a push;
passing checks do not automatically merge a PR. A remote merge does not update the local working
tree until it is synchronized. Explicit bot commits are separate automation.

**Demonstration:** a timeline labelled by machine, branch, and commit identity.
**Practical gate:** trace a successful run and a failed test after a successful push; say what
changed locally, remotely, and on the live site, and what cannot be known without settings.
**Critical check:** push, test, merge, and deployment success are separate outcomes.

## Stage 2 — Read and create the first workflow

**Builds on:** Stage 1's event/runner model.
**Outcome:** construct a minimal workflow and explain every line.

Teach YAML mappings, lists, indentation, and `.github/workflows/*.yml`. Introduce `name`, `on`,
`jobs`, `runs-on`, `steps`, `uses`, `with`, and `run`, starting with `push` and
`workflow_dispatch`. YAML configures execution; `run` contains shell commands; scripts contain
application logic; `uses` invokes an action. Recognize JavaScript, Docker, and composite actions
without requiring custom action authoring.

Build in passes: event → runner → checkout → Node setup → locked installation → test/build.
Explain why checkout and dependency installation are needed, why a dev server is not a terminating
check, and how exit codes report failure. Use explicit read-only repository permissions from the
first example, with the full security explanation in Stage 6.

**Demonstration:** run the same project commands locally and find their corresponding remote steps.
**Practical gate:** assemble a minimal workflow from a small scaffold, follow `npm test` into
`package.json`, and fix missing checkout or an incorrect working directory.
**Critical check:** an action does not invent the project's tests; YAML coordinates executable code.

## Stage 3 — Useful CI and debugging

**Builds on:** Stage 2's single job.
**Outcome:** create meaningful checks and repair a failing run.

Add lint, deterministic unit tests, and a production build; explain the different defects each
finds. Use a rainfall conversion bug for a reproducible failure. Cover lockfiles, `npm ci`,
runtime mismatches, missing configuration, case-sensitive paths, and app failures versus setup
failures. Passing a build does not establish correct behavior.

Read the run's event/commit, job, first failing step, log, and exit code. Reproduce with the same
commands locally, repair, and push a new commit. Distinguish rerunning old code from testing new
code. Introduce timeouts and why `continue-on-error` undermines a required correctness check.

**Demonstration:** one failing assertion, its log, the repair, and a new run.
**Practical gate:** diagnose a supplied failure and fix it while preserving the test's intent;
explain what the green result proves and what remains untested.
**Critical check:** removing a test or suppressing failure is not fixing the underlying defect.

## Stage 4 — PR checks and merge rules

**Builds on:** trustworthy CI results.
**Outcome:** explain checks beside a PR and configure the intended merge gate.

Add `pull_request` and branch filters. Distinguish source and target branches, PR test-merge refs
and branch heads; inspect actual event/ref/SHA rather than assuming all runs test the same snapshot.
Trace an update to an open PR and the push to `main` after merging. Explain overlapping events
and duplicate runs.

Separate Actions results, external statuses such as Vercel's, review approvals, and merge conflicts.
Connect required checks to branch protection/rulesets: YAML alone does not make a check mandatory.
Cover stable check names, stale results, branch updates, and bypass permissions. Distinguish a
skipped job from a workflow that never reports due to filters. Recognize `merge_group` when a
repository uses a merge queue. Verify plan/visibility support when showing actual settings.

**Demonstration:** a PR with failed CI but a successful Vercel preview.
**Practical gate:** select events and required checks; explain failed, missing/pending, and passing
but still blocked PRs. Identify whether code, workflow configuration, or repository policy needs fixing.
**Critical check:** a preview does not prove CI passed; a green check is not automatically required.

## Stage 5 — Jobs, data, and efficient execution

**Builds on:** the single-job workflow and required check names.
**Outcome:** predict execution order and deliberately transfer data.

Split jobs only for a clear purpose: independent checks, dependent build, and output consumer.
Teach `needs`, `if`, default failure/skip propagation, and deliberate reporting/cleanup conditions.
Introduce Actions expressions and the `github`, `steps`, `needs`, and `matrix` contexts.

Distinguish files shared within a job from separate hosted jobs' fresh workspaces. Steps do not
share a shell process. Cover `$GITHUB_ENV`, `$GITHUB_OUTPUT`, job outputs, artifacts, and dependency
caches. `needs` orders jobs without transferring files. A cache miss must not break correctness.

Add a small Node-version matrix, lockfile-based cache, timeouts, artifact retention, and concurrency
to cancel obsolete branch CI. Explain fail-fast and why deployment cancellation needs different
judgment. Estimate usage from jobs × matrix × duration; separate GitHub usage from Vercel usage.

**Demonstration:** a consumer cannot access `dist/` until it downloads the build artifact.
**Practical gate:** repair the handoff, choose output/artifact/cache for three cases, and predict
behavior after a failed dependency, cache miss, and second push.
**Critical check:** job dependencies do not share files or shell exports automatically.

## Stage 6 — Configuration, secrets, and trust

**Builds on:** expressions and data flow.
**Outcome:** configure jobs without giving untrusted code deployment access.

Compare `env`, `vars`, `secrets`, action inputs, and `GITHUB_TOKEN`; teach relevant scopes and
Actions evaluation versus shell expansion. An ignored local `.env` does not travel to a runner.
Distinguish browser-visible build configuration from server secrets.

Teach least-privilege `permissions`, credential scope, masking limits, and pinning reviewed actions
to full commit SHAs. Read action inputs, permissions, and source before trusting them. Introduce
OIDC as short-lived cloud authentication where supported, not a universal provider capability.

Explain fork restrictions, approval-to-run versus trustworthy code, and the danger of executing
untrusted PR code with `pull_request_target` privileges. Pass untrusted event text through quoted
environment variables rather than inserting it directly into shell source. Keep privileged work
away from untrusted code and artifacts.

**Demonstration:** compare the access needed by a PR test and a trusted deployment.
**Practical gate:** repair excessive permissions, unsafe shell interpolation, and a fork check
that assumes secrets are available. Justify which jobs may receive deployment credentials.
**Critical check:** no production credentials exposed to untrusted execution or browser bundles.

## Stage 7 — Vercel and deployment control

**Builds on:** merge policy, job dependencies, and credential boundaries.
**Outcome:** choose and implement a coherent path from checked commit to live release.

Compare three versions of Rainfall Web:

| Setup | Checks | Deployment owner | Question to resolve |
| --- | --- | --- | --- |
| Vercel Git integration alone | Whatever its configured build runs | Vercel | Which tests actually run? |
| Actions CI + Vercel Git integration | Explicit CI and a separate Vercel build | Vercel | What blocks merge, and does deployment wait? |
| Actions coordinates release | Checks and release commands in the pipeline | Actions invokes Vercel | How are trust, version, and duplicate deployments controlled? |

Trace previews, the configured production branch, build, deployment readiness, and production
domain routing. Vercel can deploy without Actions YAML. Independent systems responding to a push
may run concurrently: adding CI does not inherently make Vercel wait. Separate GitHub merge gates
from Vercel deployment/promotion checks.

First demonstrate Git integration with required PR checks. Then build the controlled variant
using current Vercel CLI guidance: trusted events, successful checks for the same commit, explicit
preview/production configuration, and scoped credentials. Identify how automatic Git deployment
is disabled or coordinated to avoid a second uncontrolled release path. Reuse or rebuild artifacts
deliberately, accounting for environment-specific build values and provenance.

Distinguish upload success from a verified live app; add a smoke test and identify the deployed
commit. Explain rollback versus reverting source, and prevent an old run from silently replacing
a newer production release. Connect manual approval to delivery and automatic release to deployment.

**Free-tier lens:** verify Vercel Hobby eligibility, ownership/repository restrictions, quotas, and
deployment-check availability. Check GitHub plan/visibility support for branch rules and environment
approvals. Supply an available alternative to gated features. No paid feature is required to learn
or finish this track; quota numbers must be checked again when teaching.

**Demonstration:** failed CI alongside an independent successful preview, then an explicitly gated
release timeline. Identify exactly when production changes in both.
**Practical gate:** choose a design and implement or precisely specify its workflow/settings.
Account for failed tests, direct pushes, two quick pushes, missing credentials, deployment failure,
and recovery. Verify the deployed commit if remote deployment is available.
**Critical check:** every claimed release gate must control the actual active deployment path.

## Stage 8 — Reading and maintaining real workflows

**Builds on:** the complete pipeline.
**Outcome:** navigate another project's automation and make a justified change.

Read two short real public workflows selected at lesson time, citing repository and commit.
Use one typical web CI workflow and one with reusable automation/release logic. Follow `uses`
into action metadata or reusable workflows and `run` into project scripts. Compare composite
actions with reusable workflows (`workflow_call`, inputs, outputs, secrets); extract a small
repeated sequence only after demonstrating a reason for reuse.

Recognize scheduled/manual/tag triggers, monorepo working directories/path filters, and
platform-specific commands. Revisit required checks when filtering. Use prior Compose knowledge
for a bounded example of service containers and readiness, without adding a database to the
running app. Distinguish image/package publishing from deploying a running application.

Practice workflow validation, action/dependency updates, flaky-test diagnosis, artifact inspection,
and the limits of local emulation. Locate fixes in application code, YAML, credentials, repository
policy, or hosting configuration.

**Reading procedure:** event/ref → permissions → runner/setup → dependencies → scripts/actions →
data → failure behavior/check names → deployment effects → settings outside YAML.
**Practical gate:** annotate an unfamiliar workflow and implement one taught change; explain
effects on triggers, permissions, checks, and deployment, then validate it.
**Critical check:** understanding the YAML includes understanding the code and settings it depends on.

## Stage 9 — Independent capstone and transfer test

**Builds on:** eight assessed stages. The brief must require no untaught syntax.
**Outcome:** independently build, explain, and repair a small CI/CD pipeline.

Supply the working app, lockfile, command contract, tests, target branch, deployment choice, and
available account features. Requirements must be concrete and mutually consistent. Let the learner
plan before coding and consult documentation. Do not supply the completed workflow before the first
attempt. Give targeted guidance where needed, followed by an independent reassessment.

Required evidence:

1. CI for PRs and the production branch, including meaningful lint/test/build checks.
2. Correct required merge checks and an explanation of how updated PR code is retested.
3. The chosen Vercel release path with trusted credentials, known commit identity, and no
   uncontrolled duplicate deployment path.
4. A deliberate failure blocking the intended transition, repaired without weakening the check.
5. An explanation of configuration, permissions, data transfer, cancellation, and recovery.
6. A fresh short workflow read and repaired without a scaffold, demonstrating transfer beyond
   the worked project.

**Final assessment:** six cumulative MCQs plus a practical score out of 20:
execution/ref reasoning (4), meaningful CI (4), merge/deployment correctness (4),
security/data handling (4), and debugging/transfer (4).
For each category: 0 absent/incorrect; 1 major guided repair needed; 2 partly correct;
3 independently correct; 4 correct and well justified.
Require **16/20 or higher**, no category below **3/4**, **5/6 MCQs or higher**, and all critical gaps closed.

If remote access is unavailable, complete local validation and reasoning but record remote
execution/deployment as unverified. Agree on substitute evidence or leave the operational portion
pending; never claim a successful remote deployment without evidence.
Close the track only when the agreed evidence is met, stating any remaining operational limits.

## Official references and scope

Planning references checked 2026-09-06. Recheck relevant official documentation when teaching
versions, permissions, command syntax, plan availability, or billing. These are preparation
references, not extra prerequisite reading for the learner.

- [Actions concepts](https://docs.github.com/en/actions/get-started/understand-github-actions)
  — the platform and workflow execution model.
- [Workflow syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax)
  — triggers, permissions, dependencies, expressions, matrices, and reuse.
- [Job outputs](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/pass-job-outputs)
  and [artifacts](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflow-artifacts)
  — data transfer and persistence.
- [Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions)
  — usage and allowances.
- [Vercel for GitHub](https://vercel.com/docs/git/vercel-for-github) and
  [deployment checks](https://vercel.com/docs/deployment-checks) — native integration and release gates.
- [Vercel with Actions](https://vercel.com/kb/guide/how-can-i-use-github-actions-with-vercel)
  — controlled CLI deployments.
- [Vercel Hobby](https://vercel.com/docs/plans/hobby) and [limits](https://vercel.com/docs/limits)
  — free-tier feasibility.

Out of scope: Kubernetes, self-hosted runner fleet management, marketplace action development
from scratch, enterprise release governance, and a separate cloud deployment course. Recognize
these in unfamiliar workflows without expanding into another track.

**Next action:** when the user asks to begin, teach Stage 1 and assess it before Stage 2.
