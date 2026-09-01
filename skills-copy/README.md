# skills-copy

Snapshot of the six skills in play for this project, copied 2026-09-01.
Not used by anything — reference only. Safe to delete.

| Folder | Where the original lives |
|---|---|
| `eli5/` | `~/.claude/plugins/cache/claude-community/eli5/1.0.0/skills/eli5/` (plugin, enabled in `.claude/settings.json`) |
| `unslop/` | `~/.claude/skills/unslop/` (personal skill) |
| `using-superpowers/` | `~/.claude/plugins/cache/claude-plugins-official/superpowers/6.3.0/skills/using-superpowers/` (plugin; injected at session start by a hook) |
| `artifact-design/` | Built into the Claude Code binary — no SKILL.md on disk. Captured by invoking the skill and saving what it returned. |
| `artifact-diagramming/` | Same as above. |
| `frontend-design/` | `~/.claude/plugins/cache/claude-plugins-official/frontend-design/ed404106fcd8/skills/frontend-design/` (plugin; invoked manually, not part of the CLAUDE.md flow) |

The two `artifact-*` files carry the body text verbatim; their YAML front matter is
reconstructed (name/description from the skill listing), since the on-disk original
is not exposed.
