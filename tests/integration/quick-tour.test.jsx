/**
 * Quick Tour Integration Test
 *
 * Rewritten for Ink. Drives the tour via <App /> state-machine transitions
 * and verifies the expected rendering at each step.
 */
import React from 'react';
import { render } from 'ink-testing-library';
import { describe, it, expect, jest } from '@jest/globals';
import App from '../../src/App.jsx';
import {
  SCREENS,
  createInitialState,
} from '../../src/state/navigationReducer.js';
import { quickTourFlow } from '../../src/content/quick-tour.js';
import { allModules } from '../../src/content/stories.js';

const CAPS = { width: 120, height: 30, supportsColor: true, supportsEmoji: true };

describe('Quick Tour content flow', () => {
  it('covers multiple modules', () => {
    const uniqueModules = new Set(quickTourFlow.map((item) => item.moduleId));
    expect(uniqueModules.size).toBeGreaterThan(1);
  });

  it('every referenced segment exists in its module', () => {
    for (const item of quickTourFlow) {
      const mod = allModules.find((m) => m.id === item.moduleId);
      expect(mod).toBeDefined();
      const segment = mod.segments.find((s) => s.id === item.segmentId);
      expect(segment).toBeDefined();
    }
  });

  it('totals to a ~3 minute tour at 30-60s per segment', () => {
    const itemCount = quickTourFlow.length;
    expect(180).toBeGreaterThanOrEqual(itemCount * 30 * 0.8);
    expect(180).toBeLessThanOrEqual(itemCount * 60 * 1.2);
  });
});

describe('<App /> — Quick Tour screen', () => {
  const initialState = (index = 0) => ({
    ...createInitialState(),
    screen: SCREENS.QUICK_TOUR,
    mode: 'quick-tour',
    quickTourIndex: index,
  });

  it('renders the intro block + progress indicator on the first item', () => {
    const { lastFrame } = render(
      <App
        initialState={initialState(0)}
        capabilities={CAPS}
        visitedModules={[]}
      />,
    );
    const frame = lastFrame();
    expect(frame).toContain('Quick Tour');
    expect(frame).toContain(`[1/${quickTourFlow.length}]`);
  });

  it('renders the completion celebration on the last item', () => {
    const { lastFrame } = render(
      <App
        initialState={initialState(quickTourFlow.length - 1)}
        capabilities={CAPS}
        visitedModules={[]}
      />,
    );
    expect(lastFrame()).toContain('Quick Tour Complete');
    expect(lastFrame()).toContain('Explore Full Experience');
  });

  it('calls onCompleteQuickTour exactly once when the last item mounts', () => {
    const onCompleteQuickTour = jest.fn();
    render(
      <App
        initialState={initialState(quickTourFlow.length - 1)}
        capabilities={CAPS}
        visitedModules={[]}
        onCompleteQuickTour={onCompleteQuickTour}
      />,
    );
    expect(onCompleteQuickTour).toHaveBeenCalledTimes(1);
  });

  it('records visits for each item shown', () => {
    const onVisit = jest.fn();
    render(
      <App
        initialState={initialState(0)}
        capabilities={CAPS}
        visitedModules={[]}
        onVisit={onVisit}
      />,
    );
    expect(onVisit).toHaveBeenCalled();
    const [moduleId, segmentId] = onVisit.mock.calls[0];
    const expected = quickTourFlow[0];
    expect(moduleId).toBe(expected.moduleId);
    expect(segmentId).toBe(expected.segmentId);
  });
});
