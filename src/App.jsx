/**
 * <App /> — root component for chan-meng CLI.
 *
 * Owns:
 *   - The navigation state machine (useReducer over navigationReducer).
 *   - Lifecycle side effects that need React timing (exit on 'quit' screen,
 *     firing onClose when transitioning into 'closing').
 *   - Top-level <CapabilitiesProvider> so every child observes the same
 *     terminal metrics and reflows on resize.
 *
 * All progress-persistence side effects are plumbed in as props from the
 * cli.js shim so the reducer + components stay pure/testable.
 */
import React, { useReducer, useEffect, useCallback } from 'react';
import { Box } from 'ink';
import { useApp } from 'ink';
import { useCapabilities } from './hooks/useCapabilities.js';
import { CapabilitiesProvider } from './contexts/CapabilitiesContext.js';

import WelcomeScreen from './components/WelcomeScreen.jsx';
import MainMenu from './components/MainMenu.jsx';
import QuickTour from './components/QuickTour.jsx';
import ModuleView from './components/ModuleView.jsx';
import ConnectView from './components/ConnectView.jsx';
import ClosingScreen from './components/ClosingScreen.jsx';
import ErrorBanner from './components/ErrorBanner.jsx';

import {
  SCREENS,
  navigationReducer,
  createInitialState,
  selectMode,
  enterModule,
  nextSegment,
  backToMenu,
  advanceQuickTour,
  switchToFullExperience,
  close,
  quit,
} from './state/navigationReducer.js';

import { allModules, quickTourFlow } from './content/stories.js';

/* ------------------------------------------------------------------ */
/* Inner component: reads capabilities via context                     */
/* ------------------------------------------------------------------ */
function AppBody({
  initialState,
  visitedModules,
  onVisit,
  onCompleteModule,
  onCompleteQuickTour,
  onSessionEnd,
  getSessionDuration,
}) {
  const capabilities = useCapabilities();
  const { exit } = useApp();
  const [state, dispatch] = useReducer(navigationReducer, initialState);

  // When the reducer lands on 'quit', trigger Ink's exit() so render() resolves.
  useEffect(() => {
    if (state.screen === SCREENS.QUIT) {
      // Fire session-end hook before unmounting. Ink's exit() unmounts synchronously.
      onSessionEnd?.();
      exit();
    }
  }, [state.screen, exit, onSessionEnd]);

  // Memoize per-screen callbacks so child useEffects don't churn.
  const handleSelectMode = useCallback((mode) => dispatch(selectMode(mode)), []);
  const handleEnterModule = useCallback((moduleId) => {
    if (moduleId === 'exit') dispatch(quit());
    else dispatch(enterModule(moduleId));
  }, []);
  const handleNext = useCallback(() => dispatch(nextSegment()), []);
  const handleBack = useCallback(() => dispatch(backToMenu()), []);
  const handleQuit = useCallback(() => dispatch(close()), []);
  const handleAdvanceTour = useCallback(() => dispatch(advanceQuickTour()), []);
  const handleSwitchToFull = useCallback(
    () => dispatch(switchToFullExperience()),
    [],
  );

  // ------------------------------ Routing ------------------------------
  switch (state.screen) {
    case SCREENS.WELCOME:
      return (
        <WelcomeScreen
          capabilities={capabilities}
          isFirstRun={state.isFirstRun}
          hasCompletedQuickTour={state.hasCompletedQuickTour}
          lastSession={state.lastSession}
          onSelectMode={handleSelectMode}
        />
      );

    case SCREENS.QUICK_TOUR:
      return (
        <QuickTour
          flow={quickTourFlow}
          modules={allModules}
          index={state.quickTourIndex}
          capabilities={capabilities}
          onAdvance={handleAdvanceTour}
          onSwitchToFull={handleSwitchToFull}
          onQuit={handleQuit}
          onVisit={onVisit}
          onCompleteTour={onCompleteQuickTour}
        />
      );

    case SCREENS.MENU:
      return (
        <MainMenu
          modules={allModules}
          visitedModules={visitedModules}
          capabilities={capabilities}
          onSelect={handleEnterModule}
        />
      );

    case SCREENS.MODULE: {
      const mod = allModules.find((m) => m.id === state.currentModuleId);
      if (!mod) {
        return (
          <ErrorBanner
            message={`Unknown module: ${state.currentModuleId}`}
            capabilities={capabilities}
          />
        );
      }
      if (mod.id === 'connect') {
        return (
          <ConnectView
            module={mod}
            capabilities={capabilities}
            onBack={handleBack}
            onQuit={handleQuit}
            onVisit={onVisit}
            onComplete={onCompleteModule}
          />
        );
      }
      return (
        <ModuleView
          module={mod}
          segmentIndex={state.currentSegmentIndex}
          capabilities={capabilities}
          onNext={handleNext}
          onBack={handleBack}
          onQuit={handleQuit}
          onVisit={onVisit}
          onComplete={onCompleteModule}
        />
      );
    }

    case SCREENS.CLOSING:
      return (
        <ClosingWithExit
          mode={state.mode}
          durationSeconds={getSessionDuration?.() ?? 0}
          capabilities={capabilities}
          onDone={() => dispatch(quit())}
        />
      );

    case SCREENS.QUIT:
      // Render an empty Box while Ink tears down; the effect above has fired exit().
      return <Box />;

    default:
      return (
        <ErrorBanner
          message={`Unknown screen: ${state.screen}`}
          capabilities={capabilities}
        />
      );
  }
}

/**
 * Renders the closing screen for a brief moment, then dispatches QUIT so the
 * app unmounts. This gives the user time to read the thank-you before exit.
 */
function ClosingWithExit({ mode, durationSeconds, capabilities, onDone }) {
  useEffect(() => {
    const t = setTimeout(() => onDone?.(), 700);
    t.unref?.();
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <ClosingScreen
      mode={mode}
      durationSeconds={durationSeconds}
      capabilities={capabilities}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Public export: wraps children in the capabilities provider          */
/* ------------------------------------------------------------------ */
export default function App(props) {
  const initialState = props.initialState ?? createInitialState();
  return (
    <CapabilitiesProvider initialCapabilities={props.capabilities}>
      <AppBody {...props} initialState={initialState} />
    </CapabilitiesProvider>
  );
}

// Re-export for convenience in tests.
export { createInitialState };
