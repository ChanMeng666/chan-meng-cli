# Implementation Plan: Daily Quote CLI

**Branch**: `001-daily-quote` | **Date**: 2025-11-02 | **Spec**: [spec.md](./spec.md)

## Summary

Build a Node.js CLI tool that displays daily inspiring quotes from a local database. Users can save favorites and view history. The implementation prioritizes simplicity (<5 dependencies), speed (<1s startup), and focused inspiration without feature creep.

## Technical Context

**Language/Version**: Node.js 18+ / JavaScript (ES modules)
**Primary Dependencies**:
- `commander` (v11+) - CLI argument parsing and command structure
- `chalk` (v5+) - Terminal colors and formatting
- `conf` (v12+) - User data persistence (~/.daily-quote/)

**Storage**:
- `data/quotes.json` - Embedded quote database (365 quotes)
- `~/.daily-quote/user-data.json` - Favorites and history (managed by conf)

**Testing**: Jest for unit and integration tests
**Target Platform**: Cross-platform (Linux, macOS, Windows)
**Performance Goals**: <1 second startup, instant quote display
**Constraints**: No external APIs, no network calls, max 5 dependencies

## Constitution Check

*GATE: Must pass before Phase 0 research*

### Principle I (Simplicity First)
- [x] Using ≤5 dependencies? **YES** (3 dependencies: commander, chalk, conf)
- [x] No external APIs? **YES** (fully offline)
- [x] Single responsibility? **YES** (only displays quotes)

**Status**: ✅ PASS

### Principle II (Speed Matters)
- [x] Startup time target documented? **YES** (<1 second)
- [x] No blocking operations? **YES** (quotes loaded synchronously once)
- [x] Minimal I/O? **YES** (single file read on startup)

**Status**: ✅ PASS

### Principle III (Inspiration Over Features)
- [x] No feature creep? **YES** (only core features: display, favorites, history)
- [x] Quality content focus? **YES** (curated 365 quotes)
- [x] No tracking/analytics? **YES** (completely private)

**Status**: ✅ PASS

**Overall**: ✅ All constitutional gates passed

## Project Structure

### Documentation (this feature)
```
specs/001-daily-quote/
├── spec.md              # Completed specification
├── plan.md              # This file
├── research.md          # Library research and decisions
├── data-model.md        # Quote and user data structures
└── quickstart.md        # Integration test scenarios
```

### Source Code (repository root)
```
daily-quote/
├── package.json
├── data/
│   └── quotes.json      # 365 embedded quotes
├── src/
│   ├── quote-manager.js      # Quote selection logic
│   ├── favorites-manager.js  # Favorites CRUD
│   ├── history-manager.js    # History tracking
│   ├── cli.js                # Main entry point
│   └── utils/
│       └── date-utils.js     # Day-of-year calculation
└── tests/
    ├── contract/             # Data contract tests
    ├── integration/          # CLI command tests
    └── unit/                 # Module unit tests
```

## Phase 0: Research

**Research completed:**

1. **CLI Framework Selection**
   - **Decision**: Commander.js
   - **Rationale**: Battle-tested, 50k+ stars, clear API, tree-shakeable
   - **Alternatives considered**: Yargs (too heavy), Meow (less features)

2. **Terminal Formatting**
   - **Decision**: Chalk
   - **Rationale**: Industry standard, works everywhere, simple API
   - **Alternatives considered**: Kleur (similar), Colors.js (deprecated)

3. **User Data Persistence**
   - **Decision**: Conf
   - **Rationale**: Handles cross-platform paths, JSON schema validation, atomic writes
   - **Alternatives considered**: lowdb (overkill), plain fs (cross-platform issues)

4. **Quote Selection Algorithm**
   - **Decision**: Deterministic day-of-year based
   - **Implementation**: `dayOfYear % totalQuotes`
   - **Benefit**: Same quote for all users on same day, predictable, testable

## Phase 1: Design & Contracts

### Data Model

**Quote Structure**:
```json
{
  "id": 1,
  "text": "The only way to do great work is to love what you do.",
  "author": "Steve Jobs",
  "category": "motivation"
}
```

**User Data Structure**:
```json
{
  "favorites": [
    {
      "quoteId": 42,
      "savedAt": "2025-11-02T10:30:00Z",
      "note": ""
    }
  ],
  "history": [
    {
      "quoteId": 306,
      "displayedAt": "2025-11-02"
    }
  ]
}
```

### API Contracts (Internal Modules)

**QuoteManager.getQuoteOfDay(date)**:
- Input: Date object
- Output: Quote object
- Contract: Always returns same quote for same date

**FavoritesManager.addFavorite(quoteId)**:
- Input: number (quote ID)
- Output: boolean (success)
- Contract: Persists immediately, max no limit

**HistoryManager.addEntry(quoteId)**:
- Input: number (quote ID)
- Output: void
- Contract: Maintains last 30 entries, auto-prunes

### Integration Tests (from quickstart.md)

1. Test: Display today's quote
2. Test: Save and retrieve favorite
3. Test: History tracks correctly
4. Test: Same quote shown for same day
5. Test: Startup time <1 second

## Phase 2: Task Planning Approach

*Will be executed by `/speckit.tasks` command*

**Task Generation Strategy**:
- Setup tasks: Initialize project, install dependencies
- Contract tests: One per data structure (Quote, Favorite, HistoryEntry)
- Integration tests: One per CLI command
- Implementation tasks: One per module (quote-manager, favorites-manager, etc.)
- Polish tasks: Error handling, README, performance validation

**Estimated Output**: 16-18 numbered, ordered tasks in tasks.md

## Phase 3-5: Future Implementation

*These phases are beyond the scope of the `/speckit.plan` command*

- **Phase 3**: Task execution (via `/speckit.tasks` then `/speckit.implement`)
- **Phase 4**: Validation (run tests, check constitutional compliance)
- **Phase 5**: Documentation polish and release preparation

## Complexity Tracking

*Only if constitutional gates had violations*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | All gates passed |

## Progress Tracking

- [x] Phase 0: Research complete
- [x] Phase 1: Design complete
- [x] Phase 2: Task planning approach documented
- [ ] Phase 3: Tasks generated (run `/speckit.tasks`)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Constitutional Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All ambiguities resolved
- [x] No complexity deviations

---

*Based on Constitution v1.0.0 - See `.specify/memory/constitution.md`*
