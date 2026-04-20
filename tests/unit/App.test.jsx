import React from 'react';
import { render } from 'ink-testing-library';
import { describe, it, expect, jest } from '@jest/globals';
import App, { createInitialState } from '../../src/App.jsx';
import { SCREENS } from '../../src/state/navigationReducer.js';

const CAPS = { width: 120, supportsColor: true, supportsEmoji: true };

describe('<App /> routing', () => {
  it('renders the WelcomeScreen when the initial screen is welcome', () => {
    const { lastFrame } = render(
      <App
        initialState={createInitialState({ isFirstRun: true })}
        capabilities={CAPS}
        visitedModules={[]}
      />,
    );
    expect(lastFrame()).toContain('Welcome');
    expect(lastFrame()).toContain('How would you like to proceed?');
  });

  it('renders the MainMenu when the initial screen is menu', () => {
    const initialState = {
      ...createInitialState({ isFirstRun: false }),
      screen: SCREENS.MENU,
      mode: 'full-experience',
    };
    const { lastFrame } = render(
      <App initialState={initialState} capabilities={CAPS} visitedModules={[]} />,
    );
    expect(lastFrame()).toContain('Choose Your Journey');
  });

  it('renders a module when resuming', () => {
    const initialState = createInitialState({
      resume: true,
      lastSession: { moduleId: 'journey' },
    });
    const { lastFrame } = render(
      <App initialState={initialState} capabilities={CAPS} visitedModules={[]} />,
    );
    expect(lastFrame()).toContain('The Journey');
  });

  it('renders the QuickTour screen', () => {
    const initialState = {
      ...createInitialState(),
      screen: SCREENS.QUICK_TOUR,
      mode: 'quick-tour',
    };
    const { lastFrame } = render(
      <App initialState={initialState} capabilities={CAPS} visitedModules={[]} />,
    );
    expect(lastFrame()).toContain('Quick Tour');
    expect(lastFrame()).toContain('[1/');
  });

  it('invokes onVisit when a module segment mounts', () => {
    const onVisit = jest.fn();
    const initialState = {
      ...createInitialState(),
      screen: SCREENS.MODULE,
      currentModuleId: 'practical',
      currentSegmentIndex: 0,
    };
    render(
      <App
        initialState={initialState}
        capabilities={CAPS}
        visitedModules={[]}
        onVisit={onVisit}
      />,
    );
    expect(onVisit).toHaveBeenCalled();
    expect(onVisit.mock.calls[0][0]).toBe('practical');
  });

  it('shows an error banner when the module id is unknown', () => {
    const initialState = {
      ...createInitialState(),
      screen: SCREENS.MODULE,
      currentModuleId: 'does-not-exist',
    };
    const { lastFrame } = render(
      <App initialState={initialState} capabilities={CAPS} visitedModules={[]} />,
    );
    expect(lastFrame()).toContain('Unknown module');
  });
});
