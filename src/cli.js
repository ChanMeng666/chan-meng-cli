/**
 * CLI shim — the bootstrap for the Ink render tree.
 *
 * Reads persisted state from progressService, constructs the initial reducer
 * state, renders <App />, and wires session-persistence side effects. All
 * rendering lives in src/App.jsx and src/components/*. All state transitions
 * live in src/state/navigationReducer.js.
 */
import React from 'react';
import { render } from 'ink';
import App from './App.jsx';
import { createInitialState } from './state/navigationReducer.js';
import progressService from './services/progress.js';
import {
  getTerminalCapabilities,
  checkMinimumRequirements,
} from './utils/terminal.js';

/**
 * Entry point. Resolves when the user exits or Ink tears down.
 */
export async function startCLI() {
  const capabilities = getTerminalCapabilities();

  // Soft gate on terminal size/TTY — don't block; just don't crash.
  const requirements = checkMinimumRequirements(capabilities);
  if (!requirements.meets && requirements.issues.length > 0) {
    console.warn('\nTerminal requirements not met:');
    requirements.issues.forEach((issue) => {
      console.warn(`  • ${issue}`);
    });
    console.warn('The CLI may not display correctly.\n');
    // Don't prompt via inquirer — Ink will handle the rest. Continue anyway.
  }

  const isFirstRun = progressService.isFirstRun();
  const hasCompletedQuickTour = progressService.hasCompletedQuickTour();
  const lastSession = progressService.getLastSession();

  const initialState = createInitialState({
    isFirstRun,
    hasCompletedQuickTour,
    lastSession,
    resume: false, // Always land on welcome; users pick "Resume" from there.
  });

  progressService.startSession(null);

  if (isFirstRun) {
    progressService.completeFirstRun();
  }

  // Side-effect callbacks passed into <App /> so the render tree stays pure.
  const appProps = {
    initialState,
    capabilities,
    visitedModules: progressService.getVisitedModules(),
    onVisit: (moduleId, segmentId) => {
      progressService.updatePosition(moduleId, segmentId);
    },
    onCompleteModule: (moduleId) => {
      progressService.completeModule(moduleId);
    },
    onCompleteQuickTour: () => {
      progressService.completeQuickTour();
    },
    onSessionEnd: () => {
      // Fires when the reducer reaches 'quit' — before Ink unmounts.
      progressService.endSession();
    },
    getSessionDuration: () => progressService.getCurrentSessionDuration(),
  };

  const { waitUntilExit } = render(<App {...appProps} />, {
    exitOnCtrlC: true,
    patchConsole: false,
  });

  // Belt-and-suspenders: if the process is killed (SSH disconnect, SIGTERM),
  // still persist session timing before exit.
  const persistOnSignal = () => {
    try {
      progressService.endSession();
    } catch {
      // Config writes may race with process teardown; ignore.
    }
  };
  process.once('SIGTERM', persistOnSignal);
  process.once('SIGHUP', persistOnSignal);

  try {
    await waitUntilExit();
  } finally {
    // endSession is idempotent for our purposes (no-op after sessionStartTime is null).
    try {
      progressService.endSession();
    } catch {
      // ignore
    }
  }
}

export default startCLI;
