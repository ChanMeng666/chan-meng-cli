/**
 * Navigation Reducer
 *
 * Pure reducer + initial-state factory + action creators that drive the Ink
 * <App /> state machine. Replaces the old class-based NavigationState and is
 * exported without React so tests can hit it directly.
 *
 * Screens:
 *   'welcome' | 'quick-tour' | 'menu' | 'module' | 'closing' | 'quit'
 *
 * Mode = the user's top-level choice once they leave the welcome screen:
 *   'quick-tour' | 'full-experience' | 'resume'
 */

export const SCREENS = Object.freeze({
  WELCOME: 'welcome',
  QUICK_TOUR: 'quick-tour',
  MENU: 'menu',
  MODULE: 'module',
  CLOSING: 'closing',
  QUIT: 'quit',
});

export const ACTIONS = Object.freeze({
  SELECT_MODE: 'SELECT_MODE',
  ENTER_MODULE: 'ENTER_MODULE',
  NEXT_SEGMENT: 'NEXT_SEGMENT',
  BACK_TO_MENU: 'BACK_TO_MENU',
  ADVANCE_QUICK_TOUR: 'ADVANCE_QUICK_TOUR',
  SWITCH_TO_FULL_EXPERIENCE: 'SWITCH_TO_FULL_EXPERIENCE',
  CLOSE: 'CLOSE',
  QUIT: 'QUIT',
});

/**
 * Build the initial reducer state.
 *
 * @param {object} [options]
 * @param {boolean} [options.isFirstRun=true]         — first invocation ever (used only informationally)
 * @param {boolean} [options.hasCompletedQuickTour=false]
 * @param {{moduleId?: string}} [options.lastSession] — if the caller wants to jump straight into a module
 * @param {boolean} [options.resume=false]            — if true and lastSession.moduleId is present, start in 'module'
 * @returns {object} initial state
 */
export function createInitialState({
  isFirstRun = true,
  hasCompletedQuickTour = false,
  lastSession = null,
  resume = false,
} = {}) {
  const resumeModuleId = resume && lastSession && lastSession.moduleId ? lastSession.moduleId : null;

  return {
    screen: resumeModuleId ? SCREENS.MODULE : SCREENS.WELCOME,
    mode: resumeModuleId ? 'resume' : null,
    currentModuleId: resumeModuleId,
    currentSegmentIndex: 0,
    quickTourIndex: 0,
    isFirstRun,
    hasCompletedQuickTour,
    lastSession,
    sessionStart: new Date(),
  };
}

/* ------------------------------------------------------------------ */
/* Action creators                                                     */
/* ------------------------------------------------------------------ */

export const selectMode = (mode) => ({ type: ACTIONS.SELECT_MODE, mode });
export const enterModule = (moduleId) => ({ type: ACTIONS.ENTER_MODULE, moduleId });
export const nextSegment = () => ({ type: ACTIONS.NEXT_SEGMENT });
export const backToMenu = () => ({ type: ACTIONS.BACK_TO_MENU });
export const advanceQuickTour = () => ({ type: ACTIONS.ADVANCE_QUICK_TOUR });
export const switchToFullExperience = () => ({ type: ACTIONS.SWITCH_TO_FULL_EXPERIENCE });
export const close = () => ({ type: ACTIONS.CLOSE });
export const quit = () => ({ type: ACTIONS.QUIT });

/* ------------------------------------------------------------------ */
/* Reducer                                                             */
/* ------------------------------------------------------------------ */

export function navigationReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SELECT_MODE: {
      // From the welcome screen the user chooses their path.
      if (action.mode === 'quick-tour') {
        return { ...state, mode: 'quick-tour', screen: SCREENS.QUICK_TOUR, quickTourIndex: 0 };
      }
      if (action.mode === 'full-experience') {
        return { ...state, mode: 'full-experience', screen: SCREENS.MENU };
      }
      if (action.mode === 'resume' && state.lastSession && state.lastSession.moduleId) {
        return {
          ...state,
          mode: 'resume',
          screen: SCREENS.MODULE,
          currentModuleId: state.lastSession.moduleId,
          currentSegmentIndex: 0,
        };
      }
      if (action.mode === 'exit') {
        return { ...state, screen: SCREENS.QUIT };
      }
      return state;
    }

    case ACTIONS.ENTER_MODULE: {
      return {
        ...state,
        screen: SCREENS.MODULE,
        currentModuleId: action.moduleId,
        currentSegmentIndex: 0,
      };
    }

    case ACTIONS.NEXT_SEGMENT: {
      return { ...state, currentSegmentIndex: state.currentSegmentIndex + 1 };
    }

    case ACTIONS.BACK_TO_MENU: {
      // "Back" from a module always returns to the full-experience main menu,
      // regardless of whether the module was entered via Resume or the menu.
      return {
        ...state,
        screen: SCREENS.MENU,
        mode: state.mode === 'quick-tour' ? 'full-experience' : (state.mode || 'full-experience'),
        currentModuleId: null,
        currentSegmentIndex: 0,
      };
    }

    case ACTIONS.ADVANCE_QUICK_TOUR: {
      return { ...state, quickTourIndex: state.quickTourIndex + 1 };
    }

    case ACTIONS.SWITCH_TO_FULL_EXPERIENCE: {
      return {
        ...state,
        screen: SCREENS.MENU,
        mode: 'full-experience',
        quickTourIndex: 0,
      };
    }

    case ACTIONS.CLOSE: {
      return { ...state, screen: SCREENS.CLOSING };
    }

    case ACTIONS.QUIT: {
      return { ...state, screen: SCREENS.QUIT };
    }

    default:
      return state;
  }
}

export default navigationReducer;
