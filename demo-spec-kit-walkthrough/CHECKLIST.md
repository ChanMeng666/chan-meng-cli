# Pre-Demonstration Checklist

> Complete this checklist 15-30 minutes before your presentation

## ✅ Environment Setup

### Software Verification

- [ ] **Claude Code installed and authenticated**
  ```bash
  claude --version
  # Should show version number
  ```

- [ ] **Node.js 18+ installed**
  ```bash
  node --version
  # Should show v18.x.x or higher
  ```

- [ ] **Git configured**
  ```bash
  git config --global user.name
  git config --global user.email
  # Should show your name and email
  ```

- [ ] **spec-kit CLI installed**
  ```bash
  specify check
  # Should show installed tools
  ```

### Directory Preparation

- [ ] **Create clean demo directory**
  ```bash
  mkdir ~/daily-quote-demo
  cd ~/daily-quote-demo
  git init
  git commit --allow-empty -m "Initial commit"
  ```

- [ ] **Initialize spec-kit**
  ```bash
  specify init . --ai claude --here --force
  ```

- [ ] **Verify commands available**
  ```bash
  ls .claude/commands/
  # Should show: constitution.md, specify.md, clarify.md, plan.md, tasks.md, implement.md
  ```

### Test Claude Code

- [ ] **Launch Claude Code successfully**
  ```bash
  claude
  # Should open interactive session
  ```

- [ ] **Test basic command**
  ```
  Type: /help
  # Should show available commands including /speckit.*
  ```

- [ ] **Exit Claude Code**
  ```
  Type: exit or press Ctrl+D
  ```

## 📄 Documentation Preparation

### Print or Display

- [ ] **Have PRESENTATION-SCRIPT.md open on separate device/screen**
  - Tablet or second monitor ideal
  - Printout as backup

- [ ] **Have prompts ready**
  - prompts/ folder open in file browser
  - OR: Copy-paste-ready from text file
  - OR: Memorize key prompts

- [ ] **Have expected outputs ready**
  - In case live demo fails
  - expected-outputs/ folder accessible
  - Can show pre-generated files as backup

### Timing

- [ ] **Practice run completed**
  - Note: Where you tend to run long
  - Note: Where you might skip if short on time
  - Total time recorded (should be ~25-30 min)

- [ ] **Pause points marked**
  - After constitution (~5:00)
  - After clarification (~11:00)
  - After planning (~15:00)
  - During implementation (~20:00)

## 🖥️ Screen Setup

### Terminal Configuration

- [ ] **Font size increased**
  - Minimum 14pt (16pt+ better for large rooms)
  - Test from back of room if possible

- [ ] **High contrast theme**
  - Light text on dark background
  - OR: Dark text on light background
  - Avoid low-contrast themes

- [ ] **Terminal dimensions**
  - 120+ columns width
  - 40+ rows height
  - Full screen or nearly full

### Window Management

- [ ] **Terminal positioned prominently**
  - Primary screen
  - Maximum size
  - Easy to read from distance

- [ ] **File browser ready (optional)**
  - VS Code or Finder/Explorer
  - Can show generated files
  - Secondary screen or side-by-side

- [ ] **Browser tabs closed**
  - Minimize distractions
  - Only docs you need open

### Display Settings

- [ ] **Projector/screen tested**
  - Colors appear correctly
  - Text is legible from back row
  - No weird aspect ratio issues

- [ ] **Presentation mode enabled (if applicable)**
  - Hide notifications
  - Hide menu bar/dock
  - Disable screen saver

## 🎤 Presentation Materials

### Speaking Notes

- [ ] **Introduction memorized** (2 min)
  - Hook about outdated docs
  - What is spec-kit
  - What we're building today

- [ ] **Key talking points prepared**
  - Why constitution matters
  - What makes specs "executable"
  - Value of test-first development
  - Living documentation concept

- [ ] **Wrap-up ready** (2 min)
  - Summary of what happened
  - Key takeaways
  - Next steps for audience

### Audience Interaction

- [ ] **Questions prepared for audience**
  - "What principles would you add?"
  - "Have you experienced doc drift?"
  - "What do you think happens next?"

- [ ] **Common Q&A reviewed**
  - Can I use Python/Go?
  - Works for web apps?
  - Multiple developers?
  - How handle edge cases?

## 🔧 Backup Plans

### Technical Backups

- [ ] **Pre-recorded video** (optional but recommended)
  - Full 15-minute walkthrough
  - Can play if live demo fails
  - Have video file local (not streaming)

- [ ] **Screenshots captured**
  - Key moments at each phase
  - Can show if commands fail
  - Stored in accessible location

- [ ] **Expected outputs printed/ready**
  - Constitution.md
  - Spec.md snippet
  - Plan.md snippet
  - Tasks.md
  - Can show if generation fails

### Contingency Plans

- [ ] **Network access verified**
  - If demo requires internet (shouldn't for this one)
  - Backup hotspot available

- [ ] **Battery charged**
  - Laptop at 100%
  - Power adapter accessible
  - Test outlets in presentation room

- [ ] **Backup laptop available** (if critical demo)
  - Same setup as primary
  - Ready to switch if primary fails

## 📊 Content Verification

### Prompts Tested

- [ ] **Constitution prompt tested once**
  - Generates expected output
  - No surprising errors
  - Timing acceptable (~3 min)

- [ ] **Specify prompt tested once**
  - Creates branch correctly
  - Generates spec.md
  - Identifies ambiguities

- [ ] **All commands tested end-to-end**
  - Full workflow works
  - No unexpected failures
  - Output matches expectations

### Timing Verified

- [ ] **Full demo completed in practice**
  - Under 30 minutes
  - Identified skip points if needed
  - Identified expansion points if time left

- [ ] **Checkpoints noted**
  - 5:00 - Constitution done
  - 11:00 - Clarification done
  - 17:00 - Tasks done
  - 25:00 - Implementation done

## 🎯 Final Checks (5 minutes before)

### Last Minute

- [ ] **Phone on silent** ✈️
- [ ] **Notifications disabled** 🔕
- [ ] **Water bottle nearby** 💧
- [ ] **Confident and ready** 💪

### Mental Preparation

- [ ] **Review key message**: Specs as source of truth
- [ ] **Review hook**: Outdated docs problem
- [ ] **Review wrap-up**: Specs generate code
- [ ] **Breathe deeply**: You've got this! 😊

### Venue Check

- [ ] **Arrived 15 minutes early**
- [ ] **Tested projector**
- [ ] **Tested audio (if using)**
- [ ] **Water available**
- [ ] **Comfortable with space**

## 🚨 Emergency Contacts

If something goes wrong:

- **Spec-kit repo**: https://github.com/github/spec-kit (issues)
- **Claude support**: (if authentication fails)
- **Backup presenter**: (if you're sick)

## ✨ You're Ready When...

You can confidently say "YES" to all of these:

✅ I can explain what makes specs "executable"
✅ I know all 6 commands in order
✅ I can describe the constitution's role
✅ I've tested the full workflow once
✅ I have backup plans if something fails
✅ My screen is visible from the back row
✅ I'm excited to share spec-kit with others!

---

## Post-Demo Checklist

After your presentation:

- [ ] **Collect feedback**
  - What was clear?
  - What was confusing?
  - What would they try first?

- [ ] **Share resources**
  - Link to spec-kit repo
  - Link to SPEC-KIT-GUIDE.md
  - Link to this demo folder

- [ ] **Note improvements**
  - What went well?
  - What would you change?
  - Timing adjustments needed?

- [ ] **Celebrate!** 🎉
  - You just taught people about the future of development
  - You made a difference
  - Great job!

---

**Ready to present?** Check off every item above, then go show them what spec-kit can do! 🚀

**First time presenting?** It's okay to be nervous. You know the material. You've practiced. The audience wants you to succeed. You've got this! 💪
