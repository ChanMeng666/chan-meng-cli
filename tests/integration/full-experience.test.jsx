/**
 * Full Experience Integration Test
 *
 * Rewritten for the Ink stack. Uses ink-testing-library to render <App />
 * directly into various initial states and asserts on `lastFrame()`.
 */
import React from 'react';
import { render } from 'ink-testing-library';
import { describe, it, expect, jest } from '@jest/globals';
import App from '../../src/App.jsx';
import {
  SCREENS,
  createInitialState,
} from '../../src/state/navigationReducer.js';
import { allModules } from '../../src/content/stories.js';

const CAPS = { width: 120, height: 30, supportsColor: true, supportsEmoji: true };

describe('Full Experience — rendered App', () => {
  it('lands on the welcome screen for a first-time user', () => {
    const { lastFrame } = render(
      <App
        initialState={createInitialState({ isFirstRun: true })}
        capabilities={CAPS}
        visitedModules={[]}
      />,
    );
    expect(lastFrame()).toContain('Welcome!');
  });

  it('shows the main menu with every module listed', () => {
    const initialState = {
      ...createInitialState({ isFirstRun: false }),
      screen: SCREENS.MENU,
      mode: 'full-experience',
    };
    const { lastFrame } = render(
      <App initialState={initialState} capabilities={CAPS} visitedModules={[]} />,
    );
    const frame = lastFrame();
    allModules.forEach((mod) => {
      expect(frame).toContain(mod.title);
    });
  });

  it('renders each module correctly when visited directly', () => {
    for (const mod of allModules) {
      const initialState = {
        ...createInitialState(),
        screen: SCREENS.MODULE,
        currentModuleId: mod.id,
        currentSegmentIndex: 0,
      };
      const { lastFrame } = render(
        <App
          initialState={initialState}
          capabilities={CAPS}
          visitedModules={[]}
        />,
      );
      expect(lastFrame()).toContain(mod.title);
    }
  });

  it('jumps to the resumed module when resume: true', () => {
    const initialState = createInitialState({
      resume: true,
      lastSession: { moduleId: 'practical' },
    });
    const { lastFrame } = render(
      <App initialState={initialState} capabilities={CAPS} visitedModules={[]} />,
    );
    // practicalModule.title === 'Practical Minimalism'
    expect(lastFrame()).toContain('Practical Minimalism');
  });

  it('fires onVisit + onCompleteModule on last segment', () => {
    const onVisit = jest.fn();
    const onCompleteModule = jest.fn();

    const philosophy = allModules.find((m) => m.id === 'philosophy');
    const lastIndex = philosophy.segments.length - 1;

    render(
      <App
        initialState={{
          ...createInitialState(),
          screen: SCREENS.MODULE,
          currentModuleId: 'philosophy',
          currentSegmentIndex: lastIndex,
        }}
        capabilities={CAPS}
        visitedModules={[]}
        onVisit={onVisit}
        onCompleteModule={onCompleteModule}
      />,
    );

    expect(onVisit).toHaveBeenCalled();
    expect(onCompleteModule).toHaveBeenCalledWith('philosophy');
  });
});

describe('Content surface', () => {
  it('exposes all four modules via stories.js', () => {
    const ids = allModules.map((m) => m.id);
    expect(ids).toEqual(expect.arrayContaining(['journey', 'philosophy', 'practical', 'connect']));
  });

  it('every module has required display properties', () => {
    for (const mod of allModules) {
      expect(mod).toHaveProperty('id');
      expect(mod).toHaveProperty('title');
      expect(mod).toHaveProperty('description');
      expect(mod).toHaveProperty('estimatedTime');
      expect(mod.segments.length).toBeGreaterThan(0);
    }
  });
});
