# Step-by-Step Execution Guide

> Precise commands and actions for executing the spec-kit demonstration

## Pre-Demo Setup

### 1. Environment Preparation

```bash
# Create clean demo directory
mkdir ~/daily-quote-demo
cd ~/daily-quote-demo

# Initialize git repository
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Initial commit (empty repo)
git add .
git commit --allow-empty -m "Initial commit"
```

### 2. Initialize Spec-Kit

```bash
# Install spec-kit (if not already installed)
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git

# Initialize spec-kit in current directory
specify init . --ai claude --here --force

# Verify commands are available
ls .claude/commands/
# Should show: constitution.md, specify.md, clarify.md, plan.md, tasks.md, implement.md
```

### 3. Launch Claude Code

```bash
# Start Claude Code in this directory
claude

# Wait for Claude to be ready (you should see the prompt)
```

**Checkpoint**: You should now be in Claude Code with `/speckit.*` commands available.

---

## Phase 1: Constitution (3 minutes)

### Command 1: Create Constitution

**What to type**:

```
/speckit.constitution Create a constitution for the daily-quote CLI with these core principles:

PRINCIPLE I: Simplicity First
- Maximum 5 npm dependencies (no exceptions)
- No external APIs or network calls
- Single responsibility: display inspiring quotes
- Rationale: A tool used daily must be reliable and lightweight

PRINCIPLE II: Speed Matters
- Startup time < 1 second on average hardware
- Quote display must be instant (no loading spinners)
- Minimal disk I/O (quotes loaded once)
- Rationale: Users check this in the morning; every second counts

PRINCIPLE III: Inspiration Over Features
- Focus on high-quality curated quotes
- No feature creep (sharing, themes, etc. in v1)
- Professional and appropriate content only
- Rationale: One thing done excellently beats ten things done poorly

Establish gates to enforce these principles during planning and implementation.
```

**What happens**:
1. Claude creates `.specify/memory/constitution.md`
2. Constitution includes enforcement mechanisms
3. Governance process for amendments

**Verify**:

```bash
# Check constitution was created
cat .specify/memory/constitution.md
```

**Expected output structure**:
- Core Principles section with 3 principles
- Rationale for each
- Enforcement section
- Amendment process

---

## Phase 2: Specification (4 minutes)

### Command 2: Create Specification

**What to type**:

```
/speckit.specify Build a CLI tool called 'daily-quote' that displays an inspiring quote each time it's run.

Core functionality:
- Show a different quote each calendar day (consistent for the same day)
- Allow users to save quotes to a favorites list
- Display quote history for the last 30 days
- Show quote author and optional category

Requirements:
- Work completely offline (no API calls)
- Store quotes locally in a simple format
- Categories: motivation, wisdom, humor, reflection
- Quotes should be appropriate for professional settings
- Support basic commands: display (default), save-favorite, show-favorites, show-history

The target user is a developer who wants daily inspiration but values simplicity and speed.
```

**What happens**:
1. Claude runs `.specify/scripts/create-new-feature.sh`
2. Creates branch `001-daily-quote`
3. Generates `specs/001-daily-quote/spec.md`
4. Identifies ambiguities with `[NEEDS CLARIFICATION]` markers

**Verify**:

```bash
# Check current branch
git branch
# Should show: * 001-daily-quote

# Check spec was created
cat specs/001-daily-quote/spec.md | head -50
```

**Expected output**:
- Feature name and branch info
- 10-15 Functional Requirements (FR-001, FR-002, etc.)
- User stories with Given-When-Then scenarios
- Key entities identified
- Some `[NEEDS CLARIFICATION]` markers

---

## Phase 3: Clarification (2 minutes)

### Command 3: Resolve Ambiguities

**What to type**:

```
/speckit.clarify Answer the clarification questions:

1. Quote database size: Start with 365 quotes (one per day for a year)
   - Can expand later if needed
   - Stored in data/quotes.json

2. Favorites limit: No hard limit, but UI shows most recent 20
   - Stored in ~/.daily-quote/favorites.json

3. History retention: Last 30 days only
   - Automatically prune older entries
   - Stored in ~/.daily-quote/history.json

4. Sharing features: NOT in v1
   - Violates "Simplicity First" principle
   - May consider in v2 if user demand exists

5. Quote selection algorithm: Deterministic based on date
   - dayOfYear % totalQuotes
   - Same date = same quote for all users
   - Predictable and testable

6. Error handling: Graceful degradation
   - Missing quotes.json → show built-in fallback quote
   - Corrupted favorites → recreate empty file
   - Never crash; always show something useful
```

**What happens**:
1. Claude updates `specs/001-daily-quote/spec.md`
2. Removes `[NEEDS CLARIFICATION]` markers
3. Adds "Clarifications" section with Q&A
4. Updates requirements to be specific

**Verify**:

```bash
# Check clarifications were added
grep -A 10 "## Clarifications" specs/001-daily-quote/spec.md
```

**Expected output**:
- Clarifications section with session date
- Each Q&A documented
- No remaining `[NEEDS CLARIFICATION]` markers

---

## Phase 4: Planning (4 minutes)

### Command 4: Create Technical Plan

**What to type**:

```
/speckit.plan Implement daily-quote using this tech stack:

Language: Node.js 18+ with ES modules
Dependencies (max 5 per constitution):
1. commander - CLI argument parsing
2. chalk - Terminal colors and formatting
3. conf - User data persistence

Storage:
- quotes.json - Embedded quote database (365 quotes)
- User data in ~/.daily-quote/ using conf package

Architecture:
- quote-manager.js - Quote selection and retrieval
- favorites-manager.js - Save/list favorites
- history-manager.js - Track displayed quotes
- cli.js - Main entry point with commander

Testing:
- Jest for unit tests
- Integration tests for CLI commands
- Contract tests for data structures

No external APIs, no network calls, no optional dependencies.
Validate against constitutional principles.
```

**What happens**:
1. Claude loads `spec.md` and `constitution.md`
2. Validates tech choices against constitutional gates
3. Generates multiple documents:
   - `plan.md` - Technical approach
   - `research.md` - Library decisions
   - `data-model.md` - Data structures
   - `quickstart.md` - Test scenarios
4. Runs constitutional compliance check

**Verify**:

```bash
# Check all planning docs were created
ls specs/001-daily-quote/
# Should show: spec.md, plan.md, research.md, data-model.md, quickstart.md

# Check constitutional compliance
grep -A 20 "Constitution Check" specs/001-daily-quote/plan.md
```

**Expected output**:
- ✅ PASS on all constitutional gates
- 3 dependencies listed (under 5 limit)
- No external API calls
- Startup time target documented

---

## Phase 5: Tasks (2 minutes)

### Command 5: Generate Task List

**What to type**:

```
/speckit.tasks
```

**No arguments needed** - Claude reads all design documents automatically.

**What happens**:
1. Claude runs `.specify/scripts/check-prerequisites.sh`
2. Loads plan.md, data-model.md, quickstart.md
3. Generates ordered task list in `tasks.md`
4. Marks parallel tasks with `[P]`
5. Orders by dependencies (setup → tests → implementation)

**Verify**:

```bash
# Check tasks were created
cat specs/001-daily-quote/tasks.md

# Count total tasks
grep -c "^- \[ \] T" specs/001-daily-quote/tasks.md
# Should be 12-18 tasks
```

**Expected output structure**:

```markdown
## Phase 3.1: Setup (2-3 tasks)
- [ ] T001 Initialize Node.js project
- [ ] T002 Install dependencies

## Phase 3.2: Tests First (4-6 tasks with [P])
- [ ] T003 [P] Contract test for quotes
- [ ] T004 [P] Integration test for favorites
...

## Phase 3.3: Core Implementation (4-6 tasks)
- [ ] T008 Quote manager module
- [ ] T009 Favorites manager
...

## Phase 3.4: Polish (2-3 tasks)
- [ ] T015 Error handling
- [ ] T016 README documentation
```

---

## Phase 6: Implementation (8 minutes)

### Command 6: Execute Implementation

**What to type**:

```
/speckit.implement
```

**No arguments needed** - Claude follows tasks.md automatically.

**What happens** (narrate each phase):

1. **T001-T002: Setup**
   - Creates `package.json`
   - Installs dependencies (commander, chalk, conf)
   - Sets up project structure

2. **T003-T007: Tests First (TDD)**
   - Writes contract tests
   - Writes integration tests
   - Tests FAIL (no implementation yet)

3. **T008-T013: Implementation**
   - Implements quote-manager.js
   - Implements favorites-manager.js
   - Implements history-manager.js
   - Implements cli.js
   - Tests now PASS

4. **T014-T016: Polish**
   - Adds error handling
   - Updates README
   - Runs final validation

**Monitor progress**:

```bash
# In another terminal, watch files being created
watch -n 1 'ls -la src/ tests/'

# Check git status to see changes
git status
```

**Expected duration**:
- Setup: ~1 minute
- Tests: ~2 minutes
- Implementation: ~4 minutes
- Polish: ~1 minute

**Verify implementation**:

```bash
# Check all files were created
ls -R

# Run tests
npm test
# Should show all tests passing

# Try the CLI
node src/cli.js
# Should display today's quote

node src/cli.js --save-favorite
# Should save current quote

node src/cli.js --show-favorites
# Should list saved favorites
```

---

## Phase 7: Validation & Demo (3 minutes)

### Verify the Complete Implementation

**Test all features**:

```bash
# 1. Display today's quote (default)
node src/cli.js

# 2. Save as favorite
node src/cli.js --save-favorite

# 3. Show all favorites
node src/cli.js --show-favorites

# 4. Show history
node src/cli.js --show-history

# 5. Help command
node src/cli.js --help
```

### Verify Constitutional Compliance

**Check dependency count**:

```bash
# List dependencies from package.json
cat package.json | grep -A 10 '"dependencies"'

# Should show exactly 3: commander, chalk, conf
```

**Check startup time**:

```bash
# Time the startup
time node src/cli.js

# Should be under 1 second
```

**Check for external APIs**:

```bash
# Search for network calls in code
grep -r "http\|fetch\|axios" src/
# Should find nothing
```

### Verify Documentation Alignment

**Check spec vs. implementation**:

```bash
# Compare FRs in spec to features in code
grep "FR-" specs/001-daily-quote/spec.md

# Verify each FR has corresponding code
# Example: FR-001 (daily quote) -> quote-manager.js::getQuoteOfDay()
```

---

## Post-Demo Cleanup (Optional)

If you want to reset for another demo:

```bash
# Save the successful output
cd ..
mv daily-quote-demo daily-quote-demo-complete

# Create fresh demo directory
mkdir daily-quote-demo
cd daily-quote-demo
git init

# Re-run specify init
specify init . --ai claude --here --force
```

---

## Troubleshooting

### Issue: Commands not found

**Symptom**: `/speckit.specify` not recognized

**Solution**:
```bash
# Check commands exist
ls .claude/commands/

# If missing, re-initialize
specify init . --ai claude --here --force
```

### Issue: Git branch creation fails

**Symptom**: Error when running `/speckit.specify`

**Solution**:
```bash
# Ensure git is initialized
git init
git commit --allow-empty -m "Initial commit"
```

### Issue: Implementation takes too long

**Symptom**: `/speckit.implement` runs over 10 minutes

**Solution**:
```bash
# Stop Claude (Ctrl+C)
# Show pre-generated output from expected-outputs/
# Continue with manual explanation
```

### Issue: Tests fail

**Symptom**: `npm test` shows failures after implementation

**Solution**:
```bash
# Check what failed
npm test -- --verbose

# Usually due to:
# 1. Missing quotes.json file
# 2. Path issues

# Quick fix: copy sample data
cp data/quotes.json src/data/quotes.json
```

### Issue: Claude deviates from plan

**Symptom**: More than 5 dependencies installed

**Solution**:
```bash
# This is perfect for the demo! Show how to handle:

# 1. Stop implementation
# 2. Show the violation
npm ls --depth=0

# 3. Ask Claude to fix
"The constitution allows max 5 dependencies. We have 7. Please refactor to comply."

# 4. Show Claude removing extras
```

---

## Backup Plan

If live demo fails, have these ready:

### Pre-recorded Video

Record a successful run through all phases, 15 minutes, with narration.

### Static Screenshots

Capture key moments:
1. Constitution check ✅
2. Spec with FRs
3. Plan with dependency list
4. Tasks with [P] markers
5. Working CLI output

### Pre-generated Files

Keep a complete successful run in `expected-outputs/` directory:
- constitution.md
- spec.md
- plan.md
- tasks.md
- Complete src/ directory

Can show these if live demo fails.

---

## Timing Checkpoints

Stay on track with these milestones:

| Time | Phase | Checkpoint |
|------|-------|------------|
| 2:00 | Intro | Demo purpose explained |
| 5:00 | Constitution | Constitution created |
| 9:00 | Specification | Spec with FRs generated |
| 11:00 | Clarification | All ambiguities resolved |
| 15:00 | Planning | Plan with constitutional check |
| 17:00 | Tasks | Ordered task list created |
| 25:00 | Implementation | Code generated and tested |
| 27:00 | Wrap-up | Demo complete, Q&A |

If you're behind at any checkpoint, skip details and move forward.

---

## Success Checklist

After demo, you should have:

- ✅ `.specify/memory/constitution.md` with 3 principles
- ✅ `specs/001-daily-quote/spec.md` with 12+ FRs
- ✅ `specs/001-daily-quote/plan.md` with constitutional validation
- ✅ `specs/001-daily-quote/tasks.md` with 15+ ordered tasks
- ✅ Working `src/` directory with passing tests
- ✅ CLI that runs in <1 second
- ✅ Exactly 3 dependencies in package.json
- ✅ No external API calls in code
- ✅ Living documentation that matches implementation

**If you have all of these, your demo was successful!** 🎉
