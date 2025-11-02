# Spec-Kit Development Workflow - Live Demonstration Guide

> A complete, ready-to-present demonstration of Spec-Driven Development using a simple CLI project

## 🎯 Demonstration Project: Daily Quote CLI

**Project Name**: `daily-quote`
**Complexity**: Beginner-friendly
**Estimated Demo Time**: 15-20 minutes
**Audience**: Developers new to spec-kit and Spec-Driven Development

### What We're Building

A simple but functional CLI tool that:
- Displays an inspiring quote each day
- Allows users to save their favorite quotes
- Shows quote history
- Works offline with local storage

**Why This Example?**
- Simple enough to complete in a live demo
- Complex enough to show all spec-kit phases
- Relatable to everyone (who doesn't need inspiration?)
- Demonstrates constitutional principles clearly

## 📁 What's in This Folder

```
demo-spec-kit-walkthrough/
├── README.md                      # This file - overview
├── PRESENTATION-SCRIPT.md         # Complete narration script with timing
├── STEP-BY-STEP-GUIDE.md          # Detailed execution guide
├── CHECKLIST.md                   # Pre-demo checklist
├── prompts/
│   ├── 01-constitution.txt        # Constitution creation prompt
│   ├── 02-specify.txt             # Feature specification prompt
│   ├── 03-clarify.txt             # Clarification questions prompt
│   ├── 04-plan.txt                # Technical planning prompt
│   ├── 05-tasks.txt               # Task generation prompt
│   └── 06-implement.txt           # Implementation prompt
└── expected-outputs/
    ├── constitution.md            # Expected constitution output
    ├── spec.md                    # Expected specification output
    ├── plan.md                    # Expected plan output
    └── tasks.md                   # Expected tasks output
```

## 🚀 Quick Start for Presenters

### Before the Presentation

1. **Read through all documents** (30 minutes):
   - `PRESENTATION-SCRIPT.md` - Your speaking notes
   - `STEP-BY-STEP-GUIDE.md` - Technical execution steps
   - Review all prompts in `prompts/`

2. **Practice once** (20 minutes):
   - Run through the entire workflow
   - Time yourself on each phase
   - Familiarize yourself with expected outputs

3. **Prepare your environment** (5 minutes):
   - Follow `CHECKLIST.md`
   - Ensure Claude Code is running
   - Terminal window is visible and large
   - Demo directory is clean

### During the Presentation

1. **Introduction** (2 min) - Explain what spec-kit is
2. **Constitution** (3 min) - Establish project principles
3. **Specification** (4 min) - Define requirements
4. **Clarification** (2 min) - Resolve ambiguities
5. **Planning** (4 min) - Technical design
6. **Tasks** (2 min) - Break down work
7. **Implementation** (8 min) - Generate code
8. **Wrap-up** (2 min) - Review what happened

**Total: ~27 minutes** (adjust based on your pace)

## 🎓 Learning Objectives

After this demonstration, audience will understand:

1. **What is Spec-Driven Development**
   - How specs become executable
   - Why this is different from traditional development

2. **Constitutional Principles**
   - How to establish project constraints
   - How constitution guides AI decisions

3. **The Complete Workflow**
   - All six commands: `/constitution`, `/specify`, `/clarify`, `/plan`, `/tasks`, `/implement`
   - When and why to use each command

4. **Template-Driven Quality**
   - How templates prevent over-engineering
   - How AI is constrained productively

5. **Living Documentation**
   - Why specs never become outdated
   - How regeneration maintains sync

## 📊 Demonstration Flow Diagram

```mermaid
graph TD
    START([Start Demo])

    INTRO[Introduction<br/>2 min]
    CONST[Constitution<br/>3 min]
    SPEC[Specification<br/>4 min]
    CLARIFY[Clarification<br/>2 min]
    PLAN[Planning<br/>4 min]
    TASKS[Tasks<br/>2 min]
    IMPL[Implementation<br/>8 min]
    WRAP[Wrap-up<br/>2 min]

    END([End Demo])

    START --> INTRO
    INTRO --> CONST
    CONST --> SPEC
    SPEC --> CLARIFY
    CLARIFY --> PLAN
    PLAN --> TASKS
    TASKS --> IMPL
    IMPL --> WRAP
    WRAP --> END

    style START fill:#4caf50
    style CONST fill:#e91e63
    style SPEC fill:#2196f3
    style CLARIFY fill:#ff9800
    style PLAN fill:#9c27b0
    style TASKS fill:#00bcd4
    IMPL fill:#f44336
    style WRAP fill:#4caf50
    style END fill:#4caf50
```

## 🎬 Presentation Tips

### Do's ✅

- **Pause after each command** - Let audience see what happened
- **Read generated content aloud** - Don't assume everyone can see
- **Explain why, not just what** - "We're doing X because Y"
- **Show failures too** - If a gate fails, explain why that's good
- **Relate to real projects** - "In a real app, you might..."
- **Encourage questions** - Pause points are marked in the script

### Don'ts ❌

- **Don't rush** - 27 minutes is realistic, don't try to do it in 10
- **Don't skip steps** - Each phase teaches something important
- **Don't wing it** - Use the prepared prompts
- **Don't assume knowledge** - Explain abbreviations like "TDD", "FR"
- **Don't troubleshoot live** - If something breaks, have backup outputs ready

## 🔧 Technical Requirements

### Software Needed

- **Claude Code CLI** installed and authenticated
- **Node.js 18+** (for the actual implementation)
- **Git** (for branch management)
- **Terminal** with good font size (Fira Code 14pt+ recommended)

### Screen Setup

Recommended layout for live demos:

```
┌─────────────────────────────────────┐
│  Terminal (70% of screen)           │
│  - Large font (14pt+)                │
│  - High contrast theme               │
│  - Full-screen or nearly full        │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│  VS Code / File Browser (optional)   │
│  - Show generated files              │
│  - Side-by-side view                 │
└─────────────────────────────────────┘
```

## 📖 Terminology Used

Quick reference for terms used in the demo:

| Term | Meaning |
|------|---------|
| **Constitution** | Project principles that guide all decisions |
| **Specification** | What to build (requirements, user stories) |
| **Plan** | How to build (technical approach, tech stack) |
| **Tasks** | Ordered TODO list for implementation |
| **TDD** | Test-Driven Development (tests before code) |
| **FR** | Functional Requirement (e.g., FR-001) |
| **Constitutional Gate** | Checkpoint that validates against principles |
| **Template** | Structured format that guides AI generation |

## 🎯 Success Criteria

Your demo is successful if the audience can:

1. Explain what makes specs "executable" in SDD
2. Describe the role of the constitution
3. List the six main commands in order
4. Understand why tests come before implementation
5. See why documentation stays current

## 🔗 Related Resources

- **SPEC-KIT-GUIDE.md** (in parent directory) - Comprehensive guide
- **Official spec-kit repo** - https://github.com/github/spec-kit
- **chan-meng CLI** - Real example project (parent directory)

## 🆘 Troubleshooting

### If Claude Code Doesn't Respond

**Symptom**: Commands don't trigger workflows
**Solution**: Check that `.claude/commands/` exists and has `.md` files

### If Git Branch Creation Fails

**Symptom**: Script errors when creating feature branch
**Solution**: Ensure you're in a git repository (`git status` should work)

### If Implementation Takes Too Long

**Symptom**: `/implement` runs longer than 8 minutes
**Solution**:
- Skip to showing the generated code
- Have pre-generated output ready as backup

### If Audience Loses Interest

**Symptom**: People checking phones, looking away
**Solution**:
- Ask a question: "What do you think will happen next?"
- Show a failure: "Let's see what happens if I violate the constitution"
- Relate to their work: "Have you experienced docs becoming outdated?"

## 📝 Customization Notes

Want to adjust the demo for your audience?

### For Beginners (add 5 min)
- Spend more time on "what is spec-kit"
- Show more of the generated files
- Explain each constitutional principle in detail

### For Experienced Developers (reduce 5 min)
- Skip basic explanations
- Focus on constitutional enforcement
- Show parallel task execution
- Discuss template customization

### For Architects (shift focus)
- Emphasize constitutional principles
- Show complexity tracking
- Discuss how to establish principles for large teams
- Compare to other architecture governance tools

## 🎉 After the Demo

1. **Share resources**:
   - Link to official spec-kit repo
   - Link to SPEC-KIT-GUIDE.md
   - Share this demo folder

2. **Encourage hands-on**:
   - "Try building your own simple CLI"
   - "Start with a 3-principle constitution"
   - "Share your experience"

3. **Collect feedback**:
   - What was clearest?
   - What was most confusing?
   - What would they try first?

---

**Ready to present?** Start with `PRESENTATION-SCRIPT.md` for your speaking notes!

**Need technical details?** See `STEP-BY-STEP-GUIDE.md` for exact commands!

**First time?** Complete `CHECKLIST.md` before going live!
