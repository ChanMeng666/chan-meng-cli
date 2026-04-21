# Releasing chan-meng

This document describes how to publish a new version of `chan-meng` to npm. It is written for both humans and Claude Code / other AI agents, so every step is executable verbatim.

## TL;DR

```powershell
# 1. Make sure master is clean and all intended changes are merged
cd D:\github_repository\chan-meng-cli
git checkout master
git pull

# 2. Bump the version (pick one) — this commits package.json + creates a tag
npm version patch -m "chore: release v%s - <short description>"   # bug fixes, CI/build changes
npm version minor -m "chore: release v%s - <short description>"   # new backward-compatible features
npm version major -m "chore: release v%s - <short description>"   # breaking changes

# 3. Push the commit AND the tag
git push
git push --tags

# 4. Done. Watch the workflow; no OTP prompt, no token entry.
gh run watch --exit-status
```

Everything from this point is automated: GitHub Actions builds, tests, and publishes via OIDC-authenticated Trusted Publishing with a cryptographic provenance attestation. If the workflow goes green, the version is live on npm.

---

## Infrastructure in place

These are the pieces that make this work. **Do not change them without understanding what breaks.**

| Piece | Where | Notes |
|---|---|---|
| GitHub Actions workflow | `.github/workflows/publish.yml` | Triggers on tags matching `v*.*.*`. Runs on Node 24 so npm 11+ is bundled (required for OIDC). |
| npm Trusted Publisher | npm package settings on npmjs.com | Links GitHub repo `ChanMeng666/chan-meng-cli` + workflow `publish.yml` to the npm package `chan-meng`. No NPM_TOKEN secret exists in the repo. |
| Provenance | `--provenance --access public` flags in the workflow | Each published tarball gets a sigstore attestation linking it to the exact commit + workflow run. Visible on npm as a "Provenance" badge. |
| Version guard | Step in the workflow | Fails the run if the pushed tag version doesn't match `package.json` version. Prevents publishing the wrong version by accident. |
| `prepublishOnly` hook | `package.json` scripts | Runs `npm run build && npm test` before `npm publish`. Also runs in CI as a safety net, and also runs if someone tries a local `npm publish`. |

---

## Choosing the version number (semver)

| Change type | Bump | Examples |
|---|---|---|
| **patch** (`X.Y.Z` → `X.Y.Z+1`) | `npm version patch` | Bug fix in a component, docs tweak, dependency bump within range, CI improvement, test fix, README update that's shipped in the tarball |
| **minor** (`X.Y.Z` → `X.Y+1.0`) | `npm version minor` | New CLI feature, new module, additive API surface, new content added without removing old content |
| **major** (`X.Y.Z` → `X+1.0.0`) | `npm version major` | Breaking changes — bump `engines.node`, remove a module, change a public API or command-line flag's meaning, restructure content in an incompatible way |

**Heuristic for AI agents:** if you're unsure between patch and minor, err on the side of minor. A new `--flag`, a new content segment, a new interactive mode → minor. A fix to existing behavior → patch. Anything that could break existing users' scripts or habits → major.

---

## Standard release flow (step by step)

### 1. Confirm repo state

```powershell
cd D:\github_repository\chan-meng-cli
git checkout master
git pull
git status          # must print "nothing to commit, working tree clean"
npm test            # must be green locally before tagging
```

If `npm test` fails, do not proceed. Fix the failure first, commit the fix, then restart from step 1.

### 2. Bump the version

`npm version` does three things in one command: edits `package.json`, commits the change, creates an annotated tag. Never edit `package.json`'s version field by hand — keep it and the tag in lockstep.

```powershell
# Pick the right level — see the semver table above.
npm version patch -m "chore: release v%s - <what this release contains>"
```

The `%s` is replaced by npm with the resolved version number. Write a short description so the tag commit message is useful in git history.

### 3. Push commit + tag

```powershell
git push            # pushes the new commit on master
git push --tags     # pushes the new tag — this is what triggers the workflow
```

The workflow fires on the tag push, not the commit push. Both are required.

### 4. Monitor the workflow

```powershell
# Lists recent runs for the publish workflow
gh run list --workflow=publish.yml --limit=3

# Waits for the latest run to complete, exits non-zero on failure
gh run watch --exit-status
```

A successful run takes about 25–35 seconds. You should see:
- `✓ Setup Node.js 24`
- `✓ Verify tag matches package.json version`
- `✓ Install dependencies`
- `✓ Build`
- `✓ Test`  (90+ tests should pass)
- `✓ Publish to npm with provenance`

### 5. Verify the publish

```powershell
# Registry should now show the new version as `latest`
npm view chan-meng version dist-tags

# The _npmUser should be "GitHub Actions", confirming OIDC publishing
npm view chan-meng@<VERSION> _npmUser.name

# For a published provenance badge, check:
#   https://www.npmjs.com/package/chan-meng/v/<VERSION>
```

If the `_npmUser.name` is anything other than `GitHub Actions` for this release, the publish went through a different path — investigate before celebrating.

---

## Troubleshooting

### Workflow failed before `Publish` step

Nothing reached the npm registry. Fix the failing step, then **reuse the same version tag**:

```powershell
# Delete the bad tag locally and on origin
git push origin :refs/tags/v<VERSION>
git tag -d v<VERSION>

# Fix whatever broke, commit the fix
git add <files>
git commit -m "<fix message>"
git push

# Retag at the new HEAD
git tag v<VERSION>
git push origin v<VERSION>      # re-triggers the workflow
```

### Workflow failed at or after the `Publish` step, but npm rejected (4xx)

Check the log for the exact npm error. The registry did not accept the upload, so the version is still available. Treat this the same as "failed before Publish" — delete the tag, fix, re-tag.

**Common 4xx causes:**
- **422 `Failed to validate repository information`**: `package.json`'s `repository.url` must match the GitHub repo running the workflow (`https://github.com/ChanMeng666/chan-meng-cli`). Provenance verification is strict.
- **403 `Not authorized`**: Trusted Publisher link on npmjs.com was removed or misconfigured. Check the npm package Settings → Trusted publisher page. Repo owner must be `ChanMeng666`, repo name `chan-meng-cli`, workflow filename `publish.yml`, environment blank.
- **409 `Cannot publish over previously published version`**: Bump the version — you can't overwrite.

### Workflow succeeded, but something is wrong in the published package

Once a version is on npm, **do not** try to unpublish or overwrite (npm blocks both within 24h and makes them messy after). Instead:

```powershell
# Fix the issue
git add <files>
git commit -m "fix: <what>"
git push

# Ship a new patch
npm version patch -m "chore: release v%s - <fix summary>"
git push --tags
```

As a last resort for catastrophic issues within 72 hours:
```powershell
npm unpublish chan-meng@<VERSION>     # DESTRUCTIVE — requires 2FA, disrupts downstream consumers
```
Ask the human owner before using `unpublish`.

### CI Node version or npm version issue

The runner uses **Node 24**. Do not change this to a lower major without checking that the bundled npm still supports OIDC Trusted Publishing (requires npm ≥ 11.5.1). Node 22 LTS bundles npm 10 and will **not** work. If Node 24 becomes unavailable on GitHub's hosted runners in the future, upgrade the workflow to whatever Node version ships with npm ≥ 11.5.1 — do not try to `npm install -g npm@latest` on the runner (it self-corrupts).

---

## What NOT to do

- **Do not run `npm publish` locally.** The local path requires OTP and lacks provenance. Always tag + push.
- **Do not edit `package.json`'s `version` field by hand.** Use `npm version`. Keeping the tag and the file in lockstep is load-bearing — the workflow's version guard will refuse to publish on mismatch.
- **Do not change `repository.url`, `bugs.url`, or `homepage`** to point anywhere other than `ChanMeng666/chan-meng-cli`. Provenance will reject the publish.
- **Do not delete the workflow file** or the Trusted Publisher entry on npmjs.com without also removing references in this file.
- **Do not add an `NPM_TOKEN` secret to the repo.** Trusted Publishing makes it unnecessary, and having both paths available increases the blast radius if either is compromised.
- **Do not force-push over a released tag** (e.g., `git tag -f v2.0.1 && git push --force origin v2.0.1`). If the release already published to npm, the tag no longer matches what users see — ship a new patch instead.
- **Do not publish pre-release versions** (e.g. `2.1.0-rc.0`) through this workflow without explicitly adding a `--tag beta` or `--tag next` to the publish step. Otherwise the pre-release would take over the `latest` tag.

---

## Quick reference — the minimum release recipe

For a routine patch release:

```powershell
cd D:\github_repository\chan-meng-cli
git checkout master && git pull
git status                                          # must be clean
npm test                                            # must be green
npm version patch -m "chore: release v%s - <desc>"
git push && git push --tags
gh run watch --exit-status                          # wait for CI
npm view chan-meng@$(node -p "require('./package.json').version") _npmUser.name   # should print: GitHub Actions
```

If that sequence completes without error, the release is live.
