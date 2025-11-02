# Tasks: Daily Quote CLI

**Input**: Design documents from `/specs/001-daily-quote/`
**Branch**: `001-daily-quote`

## Execution Summary

This task list implements the daily-quote CLI following Test-Driven Development. Total of 16 tasks organized in 4 phases: Setup (2), Tests (5), Implementation (7), Polish (2).

## Phase 3.1: Setup

- [ ] **T001** Initialize Node.js project with package.json and ES module support
  - Path: `package.json`
  - Type: module, Node 18+
  - Entry point: src/cli.js

- [ ] **T002** Install dependencies (commander, chalk, conf) per constitutional limit
  - Run: `npm install commander chalk conf`
  - Verify: `npm ls --depth=0` shows exactly 3 dependencies

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3

**CRITICAL**: These tests MUST be written and MUST FAIL before ANY implementation

- [ ] **T003** [P] Contract test for Quote data structure in `tests/contract/quote.test.js`
  - Validates: id, text, author, category fields
  - Validates: text length 20-300 chars
  - Validates: category enum

- [ ] **T004** [P] Contract test for UserData structure in `tests/contract/user-data.test.js`
  - Validates: favorites array structure
  - Validates: history array structure
  - Validates: savedAt/displayedAt timestamps

- [ ] **T005** [P] Integration test for default display command in `tests/integration/display.test.js`
  - Test: Running CLI displays today's quote
  - Test: Quote has author and category
  - Test: Startup time <1 second (constitutional requirement)

- [ ] **T006** [P] Integration test for save-favorite command in `tests/integration/favorites.test.js`
  - Test: `--save-favorite` persists quote
  - Test: `--show-favorites` retrieves saved quotes
  - Test: Favorites survive restarts

- [ ] **T007** [P] Integration test for history command in `tests/integration/history.test.js`
  - Test: `--show-history` shows recent quotes
  - Test: History limited to 30 days
  - Test: Old entries auto-pruned

## Phase 3.3: Core Implementation (ONLY after tests are failing)

- [ ] **T008** [P] Create quotes database in `data/quotes.json`
  - 365 quotes minimum
  - All 4 categories represented
  - Valid JSON structure

- [ ] **T009** [P] Implement QuoteManager in `src/quote-manager.js`
  - Method: `getQuoteOfDay(date)` using dayOfYear % quotes.length
  - Method: `getQuoteById(id)`
  - Method: `getAllQuotes()`
  - No external dependencies

- [ ] **T010** [P] Implement FavoritesManager in `src/favorites-manager.js`
  - Method: `addFavorite(quoteId, note)`
  - Method: `getFavorites(limit)`
  - Method: `removeFavorite(quoteId)`
  - Uses conf for persistence

- [ ] **T011** [P] Implement HistoryManager in `src/history-manager.js`
  - Method: `addEntry(quoteId, date)`
  - Method: `getHistory(days)`
  - Method: `pruneOld(maxDays)`
  - Auto-prune on startup

- [ ] **T012** [P] Create date utilities in `src/utils/date-utils.js`
  - Function: `getDayOfYear(date)` returns 1-366
  - Function: `isSameDay(date1, date2)`
  - Function: `daysAgo(days)`

- [ ] **T013** Implement CLI interface in `src/cli.js`
  - Command: default (display quote)
  - Command: --save-favorite
  - Command: --show-favorites
  - Command: --show-history
  - Command: --help
  - Command: --version
  - Uses commander, chalk for formatting

- [ ] **T014** Wire up all modules in `src/cli.js`
  - Instantiate QuoteManager with quotes.json
  - Instantiate FavoritesManager with conf
  - Instantiate HistoryManager with conf
  - Connect commands to managers
  - Handle errors gracefully

## Phase 3.4: Polish

- [ ] **T015** [P] Add error handling and fallbacks
  - Handle missing quotes.json (built-in fallback)
  - Handle corrupted user data (recreate)
  - Never crash, always show something useful
  - Clear error messages

- [ ] **T016** [P] Create README.md with usage examples
  - Installation instructions
  - Command examples
  - Screenshot or example output
  - License (MIT)

## Dependencies

**Must complete in order**:
- T001, T002 before all others (setup)
- T003-T007 before T008-T014 (tests before implementation)
- T008-T012 before T013 (modules before CLI)
- T013 before T014 (CLI structure before wiring)
- T015, T016 after T014 (polish after core complete)

**Can run in parallel** (marked with [P]):
- T003, T004 (different test files)
- T005, T006, T007 (different test scenarios)
- T008, T009, T010, T011, T012 (independent modules)
- T015, T016 (independent polish tasks)

## Parallel Execution Example

```bash
# Launch T003-T007 together (test phase):
Task: "Write contract test for Quote structure"
Task: "Write contract test for UserData structure"
Task: "Write integration test for display command"
Task: "Write integration test for favorites"
Task: "Write integration test for history"
```

## Validation Checklist

Before considering implementation complete:

- [ ] All tests passing (`npm test`)
- [ ] Startup time <1 second (measured)
- [ ] Exactly 3 dependencies (`npm ls --depth=0`)
- [ ] No external network calls (code review)
- [ ] All 26 FRs from spec.md implemented
- [ ] Constitutional compliance verified

## Notes

- **TDD is non-negotiable**: Tests T003-T007 must FAIL before writing T008-T014
- **Constitutional compliance**: T002 enforces dependency limit, T005 enforces speed requirement
- **Graceful degradation**: T015 ensures robustness per FR-017
- **Parallel [P] tasks**: Touch different files, no shared state
- **Commit strategy**: One commit per task after validation

---

Total estimated implementation time: 2-3 hours for a single developer following TDD.
