# chan-meng Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-04-21

## Active Technologies
- Node.js 22+ / JavaScript + JSX (ES2022)
- Ink 7 (React 19 renderer for the terminal) with @inkjs/ui
- esbuild for JSX → single-file ESM bundle (`dist/cli.js`)
- Jest 29 + esbuild-jest + ink-testing-library

## Project Structure
```
src/
  App.jsx                 # <App/> root, routes screens by reducer state
  cli.js                  # Ink bootstrap shim (startSession / render / endSession)
  components/             # Ink/React UI components
  content/                # Module content data (unchanged across the migration)
  contexts/               # React context providers (e.g. CapabilitiesContext)
  hooks/                  # Custom hooks (e.g. useCapabilities)
  services/progress.js    # Persistence wrapper around `conf`
  state/navigationReducer.js  # Pure reducer, testable without React
  utils/                  # terminal.js, config.js
tests/
  unit/                   # Reducer + component + service unit tests
  integration/            # ink-testing-library app-level flows
```

## Commands
```
npm run build       # Bundle src/ → dist/cli.js via esbuild
npm run dev         # Watch-mode build
npm start           # Run dist/cli.js
npm test            # Full Jest suite (unit + integration)
```

## Releasing
See `RELEASING.md` at the repo root for the full procedure. Summary: bump with
`npm version <patch|minor|major>` and push the tag — GitHub Actions handles
build, test, and npm publish via OIDC Trusted Publishing. Never run
`npm publish` locally; never add an `NPM_TOKEN` secret.

## Code Style
- ES Modules everywhere; `"type": "module"` in package.json
- JSX files use `.jsx` extension; non-JSX logic uses `.js`
- Follow Ink's declarative patterns: `<Box>` for layout, `<Text>` for styling, no `console.log` in components
- Pure reducers in `src/state/`; side effects (progress persistence) flow in as callbacks from `src/cli.js`

## Recent Changes
- 2026-04-21: Migrated from inquirer + chalk + boxen + figlet + gradient-string + ora to Ink 7 + React 19 + @inkjs/ui. Entry point now ships pre-built at `dist/cli.js`. Engines bumped to Node >=22.
- 2025-10-02: Initial interactive CLI using inquirer/chalk/boxen.

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
