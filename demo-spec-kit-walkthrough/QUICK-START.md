# Quick Start - 5 Minutes to Demo-Ready

> Fast track to presenting the spec-kit demonstration

## For the Impatient Presenter 🏃‍♂️

Want to present spec-kit TODAY? Follow these 5 steps:

### Step 1: Setup (2 minutes)

```bash
# Create demo directory
mkdir ~/daily-quote-demo
cd ~/daily-quote-demo

# Initialize git
git init
git commit --allow-empty -m "Initial commit"

# Install spec-kit
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git

# Initialize in current directory
specify init . --ai claude --here --force

# Launch Claude Code
claude
```

### Step 2: Copy-Paste Prompts (3 minutes)

Open these files and copy-paste each in order:

```bash
# In Claude Code, type each command:

1. Copy from prompts/01-constitution.txt → Paste → Enter
2. Copy from prompts/02-specify.txt → Paste → Enter
3. Copy from prompts/03-clarify.txt → Paste → Enter
4. Copy from prompts/04-plan.txt → Paste → Enter
5. Copy from prompts/05-tasks.txt → Paste → Enter
6. Copy from prompts/06-implement.txt → Paste → Enter
```

### Step 3: Present! 🎤

Follow `PRESENTATION-SCRIPT.md` and narrate as commands run.

---

## What Each File Does

### Main Documents (Read these)

| File | Purpose | Read Time |
|------|---------|-----------|
| `README.md` | Overview of demo project | 5 min |
| `PRESENTATION-SCRIPT.md` | **YOUR SPEAKING NOTES** | 15 min |
| `STEP-BY-STEP-GUIDE.md` | Technical execution details | 10 min |
| `CHECKLIST.md` | Pre-demo preparation | 5 min |

### Prompts (Copy-paste these)

| File | Command | When |
|------|---------|------|
| `prompts/01-constitution.txt` | `/speckit.constitution` | Phase 1 (2-5 min) |
| `prompts/02-specify.txt` | `/speckit.specify` | Phase 2 (5-9 min) |
| `prompts/03-clarify.txt` | `/speckit.clarify` | Phase 3 (9-11 min) |
| `prompts/04-plan.txt` | `/speckit.plan` | Phase 4 (11-15 min) |
| `prompts/05-tasks.txt` | `/speckit.tasks` | Phase 5 (15-17 min) |
| `prompts/06-implement.txt` | `/speckit.implement` | Phase 6 (17-25 min) |

### Expected Outputs (Your backup plan)

| File | Shows | Use When |
|------|-------|----------|
| `expected-outputs/constitution.md` | What constitution looks like | Live gen fails |
| `expected-outputs/spec.md` | What spec looks like | Live gen fails |
| `expected-outputs/plan.md` | What plan looks like | Live gen fails |
| `expected-outputs/tasks.md` | What tasks look like | Live gen fails |

---

## The 10-Minute Practice Run

Want to practice quickly? Do this:

### 1. Setup (2 min)
```bash
mkdir ~/daily-quote-practice
cd ~/daily-quote-practice
git init
git commit --allow-empty -m "Initial"
specify init . --ai claude --here --force
claude
```

### 2. Run All Commands Fast (8 min)

Just paste and run, don't wait:

```
/speckit.constitution Create principles: Simplicity (max 5 deps), Speed (<1s startup), Inspiration (no feature creep)

/speckit.specify Build 'daily-quote' CLI that shows inspiring quotes, save favorites, view history. Offline only.

/speckit.clarify 365 quotes, no limit on favorites (show 20), 30-day history, deterministic selection

/speckit.plan Node.js 18+ with commander, chalk, conf. Offline JSON storage. <5 dependencies.

/speckit.tasks

/speckit.implement
```

Watch what happens. This is what you'll present, but slower with narration.

---

## Minimum Viable Demo (15 minutes)

Don't have 27 minutes? Here's the condensed version:

### Skip These Parts

- ❌ Detailed code review (show file tree only)
- ❌ Testing the CLI (show screenshot)
- ❌ Constitution amendment discussion
- ❌ Extra Q&A in the middle (save for end)

### Keep These Parts

- ✅ Introduction (2 min) - The hook about outdated docs
- ✅ Constitution (3 min) - Show principle enforcement
- ✅ Specification (3 min) - Show FR generation
- ✅ Planning (3 min) - Show constitutional check
- ✅ Tasks (1 min) - Show TDD ordering
- ✅ Implementation (5 min) - Watch it generate
- ✅ Wrap-up (2 min) - Key takeaways

**Total: 19 minutes**

---

## Emergency Backup Plan

If live demo fails completely:

### Option 1: Show Pre-Generated Files

```bash
# From demo-spec-kit-walkthrough directory:
cat expected-outputs/constitution.md
cat expected-outputs/spec.md
cat expected-outputs/plan.md
cat expected-outputs/tasks.md
```

Narrate: "This is what Claude generated. Let me explain each part..."

### Option 2: Show Screenshots

Have screenshots ready of:
1. Constitution with 3 principles
2. Spec with functional requirements
3. Plan with constitutional check ✅
4. Tasks with [P] markers
5. Generated code structure

### Option 3: Switch to Explanation Mode

If tech fails, pivot to whiteboard/slides:
- Draw the workflow diagram
- Explain each phase conceptually
- Show printed examples
- Answer questions

**Don't panic!** The concepts matter more than the live demo.

---

## Presenter's Cheat Sheet

Keep this visible during presentation:

### The 6 Commands (in order)

```
1. /speckit.constitution  → Establish principles
2. /speckit.specify       → Define requirements
3. /speckit.clarify       → Resolve ambiguities
4. /speckit.plan          → Technical design
5. /speckit.tasks         → Break down work
6. /speckit.implement     → Generate code
```

### Key Messages to Emphasize

1. **Specs are executable** - Not just documentation
2. **Constitution prevents drift** - AI checks every decision
3. **Tests come first** - TDD is baked in
4. **Documentation stays current** - It generates the code
5. **This amplifies developers** - Not replaces them

### When to Pause for Questions

- ⏸️ After constitution (5 min mark)
- ⏸️ After clarification (11 min mark)
- ⏸️ During implementation (20 min mark)
- ⏸️ At the end (27 min mark)

---

## Technical Requirements

Before presenting, verify:

✅ Claude Code installed: `claude --version`
✅ Node.js 18+: `node --version`
✅ Git configured: `git config --global user.name`
✅ Spec-kit ready: `specify check`
✅ Terminal font 14pt+
✅ Screen visible from back row

---

## Success Metrics

Your demo succeeded if audience can answer:

1. **What makes specs executable?**
   → They generate code, not just guide it

2. **What is the constitution?**
   → Immutable principles that constrain AI decisions

3. **Why test-first?**
   → Tests define behavior before implementation

4. **How does doc stay current?**
   → Because docs generate the code

5. **What would you try first?**
   → Start with simple CLI, create constitution

---

## After Your Demo

### Immediate Follow-up

1. **Share resources**:
   - GitHub: github.com/github/spec-kit
   - Guide: Point to SPEC-KIT-GUIDE.md
   - This folder: Share demo-spec-kit-walkthrough/

2. **Collect emails** for:
   - Follow-up Q&A
   - Success stories
   - Office hours invitation

3. **Note feedback**:
   - What resonated most?
   - What was confusing?
   - What should be improved?

### Long-term

1. **Record a video** of your successful demo
2. **Write a blog post** about your experience
3. **Contribute improvements** back to spec-kit
4. **Mentor others** who want to present

---

## You're Ready! 🚀

If you've read this far, you're prepared. Remember:

- 🎯 Focus on the concepts, not perfect execution
- 💡 Enthusiasm matters more than polish
- 🤝 Audience wants you to succeed
- 📖 You have backup plans
- 🎉 You're teaching something valuable

**Now go show them the future of software development!**

---

## Quick Reference Links

- **Full overview**: `README.md`
- **Speaking notes**: `PRESENTATION-SCRIPT.md`
- **Technical steps**: `STEP-BY-STEP-GUIDE.md`
- **Pre-demo prep**: `CHECKLIST.md`
- **This file**: `QUICK-START.md`

Pick your learning style, prepare, practice once, present with confidence! 💪
