import { describe, it, expect } from '@jest/globals';
import {
  SCREENS,
  ACTIONS,
  createInitialState,
  navigationReducer,
  selectMode,
  enterModule,
  nextSegment,
  backToMenu,
  advanceQuickTour,
  switchToFullExperience,
  close,
  quit,
} from '../../src/state/navigationReducer.js';

describe('navigationReducer - initial state', () => {
  it('starts on welcome screen by default', () => {
    const state = createInitialState();
    expect(state.screen).toBe(SCREENS.WELCOME);
    expect(state.mode).toBeNull();
    expect(state.currentModuleId).toBeNull();
    expect(state.currentSegmentIndex).toBe(0);
    expect(state.quickTourIndex).toBe(0);
  });

  it('honors resume:true + lastSession to start in a module', () => {
    const state = createInitialState({
      resume: true,
      lastSession: { moduleId: 'practical' },
    });
    expect(state.screen).toBe(SCREENS.MODULE);
    expect(state.mode).toBe('resume');
    expect(state.currentModuleId).toBe('practical');
    expect(state.currentSegmentIndex).toBe(0);
  });

  it('ignores resume:true if lastSession has no moduleId', () => {
    const state = createInitialState({ resume: true, lastSession: null });
    expect(state.screen).toBe(SCREENS.WELCOME);
    expect(state.mode).toBeNull();
  });

  it('preserves first-run flags on the state', () => {
    const state = createInitialState({ isFirstRun: false, hasCompletedQuickTour: true });
    expect(state.isFirstRun).toBe(false);
    expect(state.hasCompletedQuickTour).toBe(true);
  });
});

describe('navigationReducer - SELECT_MODE', () => {
  const base = createInitialState({
    isFirstRun: false,
    hasCompletedQuickTour: false,
    lastSession: { moduleId: 'journey' },
  });

  it('routes to quick-tour screen', () => {
    const next = navigationReducer(base, selectMode('quick-tour'));
    expect(next.screen).toBe(SCREENS.QUICK_TOUR);
    expect(next.mode).toBe('quick-tour');
    expect(next.quickTourIndex).toBe(0);
  });

  it('routes to menu for full-experience', () => {
    const next = navigationReducer(base, selectMode('full-experience'));
    expect(next.screen).toBe(SCREENS.MENU);
    expect(next.mode).toBe('full-experience');
  });

  it('routes to the resumed module', () => {
    const next = navigationReducer(base, selectMode('resume'));
    expect(next.screen).toBe(SCREENS.MODULE);
    expect(next.mode).toBe('resume');
    expect(next.currentModuleId).toBe('journey');
    expect(next.currentSegmentIndex).toBe(0);
  });

  it('routes to quit on exit', () => {
    const next = navigationReducer(base, selectMode('exit'));
    expect(next.screen).toBe(SCREENS.QUIT);
  });

  it('noops if resume chosen without a lastSession', () => {
    const orphan = createInitialState();
    const next = navigationReducer(orphan, selectMode('resume'));
    expect(next).toBe(orphan);
  });
});

describe('navigationReducer - module navigation', () => {
  it('ENTER_MODULE transitions to module screen at segment 0', () => {
    const state = createInitialState();
    const next = navigationReducer(state, enterModule('philosophy'));
    expect(next.screen).toBe(SCREENS.MODULE);
    expect(next.currentModuleId).toBe('philosophy');
    expect(next.currentSegmentIndex).toBe(0);
  });

  it('NEXT_SEGMENT increments the segment index', () => {
    const state = { ...createInitialState(), currentSegmentIndex: 2 };
    const next = navigationReducer(state, nextSegment());
    expect(next.currentSegmentIndex).toBe(3);
  });

  it('BACK_TO_MENU returns to the main menu and clears the module pointer', () => {
    const state = {
      ...createInitialState(),
      screen: SCREENS.MODULE,
      mode: 'resume',
      currentModuleId: 'journey',
      currentSegmentIndex: 3,
    };
    const next = navigationReducer(state, backToMenu());
    expect(next.screen).toBe(SCREENS.MENU);
    expect(next.mode).toBe('resume');
    expect(next.currentModuleId).toBeNull();
    expect(next.currentSegmentIndex).toBe(0);
  });

  it('BACK_TO_MENU upgrades a quick-tour mode to full-experience', () => {
    const state = { ...createInitialState(), mode: 'quick-tour', screen: SCREENS.MODULE };
    const next = navigationReducer(state, backToMenu());
    expect(next.mode).toBe('full-experience');
  });
});

describe('navigationReducer - quick tour', () => {
  it('ADVANCE_QUICK_TOUR increments the tour index', () => {
    const state = { ...createInitialState(), quickTourIndex: 2 };
    const next = navigationReducer(state, advanceQuickTour());
    expect(next.quickTourIndex).toBe(3);
  });

  it('SWITCH_TO_FULL_EXPERIENCE leaves quick tour for the main menu', () => {
    const state = { ...createInitialState(), mode: 'quick-tour', screen: SCREENS.QUICK_TOUR, quickTourIndex: 4 };
    const next = navigationReducer(state, switchToFullExperience());
    expect(next.screen).toBe(SCREENS.MENU);
    expect(next.mode).toBe('full-experience');
    expect(next.quickTourIndex).toBe(0);
  });
});

describe('navigationReducer - close & quit', () => {
  it('CLOSE routes to the closing screen', () => {
    const next = navigationReducer(createInitialState(), close());
    expect(next.screen).toBe(SCREENS.CLOSING);
  });

  it('QUIT routes to the quit screen', () => {
    const next = navigationReducer(createInitialState(), quit());
    expect(next.screen).toBe(SCREENS.QUIT);
  });
});

describe('navigationReducer - unknown actions', () => {
  it('returns current state unchanged', () => {
    const state = createInitialState();
    const next = navigationReducer(state, { type: 'SOMETHING_UNKNOWN' });
    expect(next).toBe(state);
  });
});

describe('ACTIONS constants', () => {
  it('exposes all expected action types', () => {
    expect(ACTIONS.SELECT_MODE).toBe('SELECT_MODE');
    expect(ACTIONS.ENTER_MODULE).toBe('ENTER_MODULE');
    expect(ACTIONS.NEXT_SEGMENT).toBe('NEXT_SEGMENT');
    expect(ACTIONS.BACK_TO_MENU).toBe('BACK_TO_MENU');
    expect(ACTIONS.ADVANCE_QUICK_TOUR).toBe('ADVANCE_QUICK_TOUR');
    expect(ACTIONS.SWITCH_TO_FULL_EXPERIENCE).toBe('SWITCH_TO_FULL_EXPERIENCE');
    expect(ACTIONS.CLOSE).toBe('CLOSE');
    expect(ACTIONS.QUIT).toBe('QUIT');
  });
});
