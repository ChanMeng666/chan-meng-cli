# Spec-Kit Live Demonstration - Complete Presentation Script

> Complete narration with timing, audience interaction points, and screen actions

**Total Time**: ~27 minutes
**Project**: Daily Quote CLI
**Format**: Live coding demonstration

---

## 🎬 Phase 1: Introduction (2 minutes)

### Screen: Terminal showing empty directory

**[0:00-0:30] Opening Hook**

> "Imagine you're building a new feature. You write a spec, create a design doc, then start coding. Three months later, a new developer joins and reads your docs. They're confused—because your code evolved, but your docs didn't. Sound familiar?"

**[Pause for nods, wait 2 seconds]**

> "Today I'm going to show you Spec-Driven Development, where this problem doesn't exist. Why? Because specifications don't just guide code—they generate it."

**[0:30-1:30] What We're Building**

**[Action: Show terminal]**

> "We're going to build a simple CLI tool called 'daily-quote' that shows you an inspiring quote each day. Simple enough to complete in this demo, but it'll show you every phase of the spec-kit workflow."

**[Action: Write on screen or show slide]**

```
daily-quote CLI will:
✓ Display daily inspiring quotes
✓ Let users save favorites
✓ Show quote history
✓ Work offline
```

> "More importantly, we'll see how spec-kit ensures our code stays aligned with our intentions, always."

**[1:30-2:00] The Six Commands**

> "Spec-kit gives us six commands that take us from idea to working code:"

**[Action: Show or write]**

```
1. /constitution - Establish principles
2. /specify      - Define requirements
3. /clarify      - Resolve ambiguities
4. /plan         - Technical design
5. /tasks        - Break down work
6. /implement    - Generate code
```

> "Let's start with a clean slate and build this together."

**[Action: Create project directory]**

```bash
mkdir daily-quote-demo
cd daily-quote-demo
git init
```

---

## 🎬 Phase 2: Constitution (3 minutes)

### Screen: Empty directory, Claude Code ready

**[2:00-2:30] Why Constitution Matters**

> "Before we write any code—or even define what we're building—we establish our project's constitution. These are immutable principles that guide every decision the AI makes."

> "Think of it as the architectural DNA. For our daily-quote CLI, what principles matter?"

**[Pause, then answer your own question]**

> "I can think of three: Simplicity, Speed, and Inspiration."

**[2:30-4:00] Creating the Constitution**

**[Action: Launch Claude Code]**

```bash
claude
```

> "Now I'll use the /constitution command with our principles:"

**[Action: Type slowly, narrating as you type]**

```
/constitution Create a constitution for the daily-quote CLI with these principles:

1. Simplicity First: Maximum 5 npm dependencies, no external APIs
2. Speed Matters: Startup time under 1 second, instant quote display
3. Inspiration Over Features: Focus on meaningful quotes, not bells and whistles

Rationale: This is a tool people use every morning. It should be fast,
reliable, and focused on its core mission - inspiration.
```

> "Notice I'm being specific. 'Maximum 5 dependencies' is measurable. 'Under 1 second startup' is testable."

**[Action: Press Enter, wait for Claude to generate]**

**[4:00-5:00] Review the Output**

> "Let's see what Claude generated..."

**[Action: Show the constitution.md file]**

> "Look at this. Claude has created our constitution with:"

**[Read aloud key sections]**

- "Article I: Simplicity First - Max 5 dependencies"
- "Article II: Speed Matters - <1s startup target"
- "Article III: Inspiration Over Features - No feature creep"

> "This constitution will now guide every technical decision. If Claude tries to add a 6th dependency later, it'll have to justify why. Let's see that in action."

**[Pause for questions - "Any questions about the constitution?"]**

---

## 🎬 Phase 3: Specification (4 minutes)

### Screen: Constitution created, ready for /specify

**[5:00-5:30] From Idea to Spec**

> "Now that we have our principles, let's define WHAT we're building—not HOW, just WHAT."

> "This is where spec-kit shines. I give Claude a natural language description, and it generates a structured specification with functional requirements, user stories, and acceptance criteria."

**[5:30-7:30] Creating the Specification**

**[Action: Type the /specify command]**

```
/specify Build a CLI tool called 'daily-quote' that displays an inspiring quote
each time it's run. Users should be able to:

- See a different quote each day (not random, same quote all day)
- Save their favorite quotes to a local favorites list
- View their quote history (last 30 days)
- See who said the quote and optionally a category (motivation, wisdom, humor, etc.)

The tool should work completely offline, storing quotes locally. Quotes should be
curated for quality and appropriate for professional settings.
```

> "Notice what I'm NOT saying. I'm not mentioning Node.js, I'm not talking about JSON files or databases. Just the user's needs."

**[Action: Press Enter, let Claude work]**

**[7:30-9:00] Review the Generated Spec**

> "Claude is now:"
- "Creating a new branch (001-daily-quote)"
- "Generating specs/001-daily-quote/spec.md"
- "Parsing my description into structured requirements"

**[Action: Show the generated spec.md]**

> "Look at what it created. Let me read a few functional requirements:"

**[Read 2-3 FRs aloud]**

```markdown
FR-001: System MUST display a different quote each calendar day
FR-002: System MUST allow users to save quotes to a favorites list
FR-003: System MUST store last 30 days of displayed quotes for history
```

> "These are testable, specific, and technology-agnostic. But notice something..."

**[Action: Scroll to find NEEDS CLARIFICATION markers]**

> "Claude has marked some areas as 'NEEDS CLARIFICATION'. For example:"

```markdown
[NEEDS CLARIFICATION: How many quotes should be in the local database? 100? 1000?]
[NEEDS CLARIFICATION: Should users be able to share quotes via email/social?]
```

> "This is brilliant. Instead of guessing, Claude asks. Let's resolve these ambiguities."

---

## 🎬 Phase 4: Clarification (2 minutes)

### Screen: Spec with NEEDS CLARIFICATION markers

**[9:00-9:30] Why Clarification Matters**

> "This step is often skipped in traditional development. We let the AI—or developers—make assumptions. Spec-kit forces us to be explicit."

**[9:30-10:30] Answering Clarifications**

**[Action: Type /clarify command]**

```
/clarify Here are the answers:

- Quote database: Start with 365 quotes (one per day of the year), can expand later
- No sharing features in v1 - keeps it simple per our constitution
- Categories: motivation, wisdom, humor, reflection (4 categories)
- Storage: Plain JSON file in ~/.daily-quote/
- Favorites: No limit, but UI shows most recent 20
```

> "I'm being decisive. Clear answers now prevent rework later."

**[Action: Let Claude update the spec]**

**[10:30-11:00] Spec is Complete**

> "Now our spec is complete. No more ambiguities. Every requirement is clear. This spec is now our source of truth—not the code we'll write, but this document."

**[Show updated spec with clarifications filled in]**

**[Pause for questions - "Questions about specification or clarification?"]**

---

## 🎬 Phase 5: Planning (4 minutes)

### Screen: Complete, clarified specification

**[11:00-11:30] From WHAT to HOW**

> "Now we get technical. The /plan command takes our spec and generates an implementation plan with tech stack choices, architecture decisions, and constitutional validation."

**[11:30-13:30] Creating the Technical Plan**

**[Action: Type /plan command]**

```
/plan Implement daily-quote using:

- Node.js 18+ with ES modules
- Commander.js for CLI interface
- Chalk for colored output
- A single JSON file for quotes database
- Another JSON file for user data (favorites, history)
- No external API calls - completely offline

Keep it under 5 dependencies as per our constitution.
```

> "Watch what happens here. Claude will:"

**[Narrate as Claude works]**

1. "Check our tech choices against the constitution"
2. "Generate a detailed plan.md"
3. "Create research.md with library comparisons"
4. "Define data models"
5. "Generate API contracts—even though it's a CLI, it has internal contracts"

**[Action: Show the constitutional check in plan.md]**

**[13:30-14:30] Constitutional Gates**

> "Look at this section: 'Constitution Check'"

**[Read aloud]**

```markdown
### Principle I (Simplicity First)
✅ PASS: 3 dependencies (commander, chalk, conf)
- commander: CLI framework
- chalk: Terminal colors
- conf: Config storage

Note: Under 5-dependency limit
```

> "See that? Claude counted dependencies and validated against our constitution. If I had said 'use React Ink, Zustand, Axios, etc.', this would FAIL, and Claude would make me justify the complexity."

**[14:30-15:00] Review Generated Files**

**[Action: Show file tree]**

```
specs/001-daily-quote/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
└── quickstart.md
```

> "All of these docs generated from two commands. This is living documentation—it matches what we'll build because it generates what we'll build."

---

## 🎬 Phase 6: Tasks (2 minutes)

### Screen: Complete plan ready

**[15:00-15:30] Breaking Down the Work**

> "The /tasks command takes all these design docs and creates an ordered, dependency-aware task list."

**[Action: Type /tasks command]**

```
/tasks
```

> "No arguments needed. Claude reads the plan, data model, and contracts, then generates tasks in the right order."

**[15:30-16:30] Review Generated Tasks**

**[Action: Show tasks.md]**

> "Look at the structure:"

**[Read key sections aloud]**

```markdown
## Phase 3.1: Setup
- [ ] T001 Initialize Node.js project
- [ ] T002 Install dependencies (commander, chalk, conf)

## Phase 3.2: Tests First (TDD)
- [ ] T003 [P] Contract test for quote display
- [ ] T004 [P] Integration test for favorites
- [ ] T005 [P] Integration test for history

## Phase 3.3: Core Implementation
- [ ] T006 Quote manager module
- [ ] T007 Favorites manager
- [ ] T008 CLI command interface
```

> "Notice two things:"

1. "**[P] markers** - These tasks can run in parallel because they touch different files"
2. "**Tests before implementation** - T003-T005 come before T006-T008. That's TDD."

**[16:30-17:00] Why Order Matters**

> "In traditional development, we write code then tests. In spec-kit, tests come first. Why? Because tests ARE the specification. They define behavior before we implement it."

---

## 🎬 Phase 7: Implementation (8 minutes)

### Screen: Tasks ready, ready to code

**[17:00-17:30] The Magic Moment**

> "This is where it all comes together. Watch what happens when I run /implement."

**[Build suspense]**

> "Claude will read tasks.md and execute each task in order, following TDD: write test, watch it fail, write code, watch it pass, move to next task."

**[17:30-20:00] Running Implementation**

**[Action: Type /implement]**

```
/implement
```

> "Now we wait. Let me narrate what's happening:"

**[As Claude works, comment on each phase]**

**When T001 runs:**
> "Creating package.json... standard Node.js setup."

**When T003 starts:**
> "Writing the first test. Notice—no implementation yet, just the test."

**When test runs and fails:**
> "Red phase! The test fails because we haven't written the code. That's correct."

**When T006 starts:**
> "Now implementing quote manager. Watch—Claude writes just enough to pass the test. No extra features."

**When T007 runs:**
> "Favorites manager next. These files are independent, so this could've run in parallel, but we're doing it sequentially for the demo."

**[20:00-23:00] Watch for Constitutional Compliance**

> "Here's where the constitution matters. Watch what Claude does—or doesn't do."

**[Point out when Claude makes a choice]**

> "See that? Claude could have added 'axios' for future API integration. But the constitution says 'no external APIs', so it doesn't. The constitution is enforcing constraints in real-time."

**[When implementation completes]**

**[23:00-25:00] Review the Generated Code**

**[Action: Show file structure]**

```
daily-quote/
├── package.json
├── src/
│   ├── quote-manager.js
│   ├── favorites-manager.js
│   ├── history-manager.js
│   └── cli.js
├── data/
│   └── quotes.json
└── tests/
    ├── contract/
    ├── integration/
    └── unit/
```

**[Action: Open one file, show code]**

> "Let's look at quote-manager.js..."

**[Read a few lines]**

```javascript
// No external dependencies - respecting constitution
class QuoteManager {
  constructor(quotesPath) {
    this.quotes = require(quotesPath);
  }

  getQuoteOfDay(date) {
    // Same quote all day - FR-001
    const dayOfYear = this.getDayOfYear(date);
    return this.quotes[dayOfYear % this.quotes.length];
  }
}
```

> "Look at those comments. 'Respecting constitution', 'FR-001'. The code is self-documenting because it traces back to the spec."

---

## 🎬 Phase 8: Wrap-up (2 minutes)

### Screen: Completed project

**[25:00-25:30] Test the Result**

**[Action: Run the CLI]**

```bash
node src/cli.js
```

**[Show the output]**

> "There's our quote! Let's test favorites..."

```bash
node src/cli.js --save-favorite
node src/cli.js --list-favorites
```

> "It works! From idea to working code in 25 minutes."

**[25:30-26:00] What Just Happened**

> "Let's recap what we did:"

**[Show or write on screen]**

```
1. Constitution → Established constraints (5 dependencies, <1s startup)
2. Specification → Defined 12 functional requirements
3. Clarification → Resolved 5 ambiguities
4. Planning → Generated tech design with constitutional validation
5. Tasks → Created 15 ordered tasks with TDD
6. Implementation → Generated working, tested code
```

**[26:00-26:30] The Key Insight**

> "Here's what's revolutionary: our spec.md is still the source of truth. If I want to add a feature, I update the spec, regenerate the plan, and implement. The docs never become outdated because they generate the code."

> "In traditional development, code is truth and docs drift. In Spec-Driven Development, specs are truth and code serves specs."

**[26:30-27:00] Next Steps**

> "Want to try this yourself?"

**[Show resources]**

1. "Clone spec-kit from github.com/github/spec-kit"
2. "Read SPEC-KIT-GUIDE.md (comprehensive guide)"
3. "Start with a simple CLI like we did today"
4. "Share your experience!"

**[Final statement]**

> "The future of software development isn't about replacing developers with AI. It's about amplifying developers by automating the mechanical translation from intent to code. That's what spec-kit enables."

> "Questions?"

---

## 🎤 Audience Interaction Points

Throughout the demo, use these moments for interaction:

### Good Times to Ask Questions

1. **After Constitution** (5:00): "What principles would you add to your projects?"
2. **After Clarification** (11:00): "Have you experienced ambiguity causing rework?"
3. **During Implementation** (20:00): "What do you think will happen next?"
4. **End** (27:00): "What would you try first?"

### Common Questions & Answers

**Q: "Can I use this with Python/Go/Rust?"**
A: "Yes! The spec is language-agnostic. Just specify your language in /plan."

**Q: "What if I disagree with Claude's choices?"**
A: "You can refine the plan. The spec is locked, but implementation can vary."

**Q: "Does this work for web apps?"**
A: "Absolutely. Same workflow, different tech stack in /plan."

**Q: "How do I handle edge cases?"**
A: "That's what /clarify is for. Mark ambiguities, resolve them explicitly."

**Q: "Can multiple developers work on this?"**
A: "Yes! The spec is versioned in git. Teams review specs, not just code."

---

## 📊 Timing Adjustments

If running long, skip:
- Detailed code review (23:00-25:00) → Show file tree only (-2 min)
- Testing the CLI (25:00-25:30) → Show pre-recorded demo (-0.5 min)

If running short, expand:
- Constitution discussion → Explain each principle in detail (+2 min)
- Show more generated files → Open research.md, data-model.md (+2 min)
- Live troubleshooting → Intentionally violate constitution, show failure (+3 min)

---

## 🎯 Success Indicators

Your demo succeeded if audience:
- ✅ Can explain why specs are "executable"
- ✅ Understands constitution's role
- ✅ Sees value of test-first development
- ✅ Recognizes documentation sync problem solved
- ✅ Asks specific follow-up questions

---

**Remember**: The goal isn't to show off Claude's capabilities. It's to demonstrate how structured workflows + AI = predictable, maintainable software development.

**Good luck with your presentation!** 🚀
