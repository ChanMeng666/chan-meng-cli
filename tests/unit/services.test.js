/**
 * Service Unit Tests
 *
 * Tests for ProgressService and terminal-capability utilities.
 * The old NavigationState class has been replaced by a pure reducer — see
 * tests/unit/navigationReducer.test.js for its coverage.
 */

import { jest } from '@jest/globals';
import { ProgressService } from '../../src/services/progress.js';
import {
  detectTerminalCapabilities,
  checkMinimumRequirements,
  refreshTerminalCapabilities,
} from '../../src/utils/terminal.js';

describe('Progress Service', () => {
  let progressService;

  beforeEach(() => {
    progressService = new ProgressService();
  });

  test('startSession initializes session', () => {
    progressService.startSession('quick-tour');
    expect(progressService.sessionStartTime).not.toBeNull();
    expect(progressService.currentSessionData.mode).toBe('quick-tour');
  });

  test('updatePosition tracks current position', () => {
    progressService.updatePosition('journey', 1);
    expect(progressService.currentSessionData.moduleId).toBe('journey');
    expect(progressService.currentSessionData.segmentId).toBe(1);
  });

  test('getCurrentSessionDuration returns valid duration', () => {
    progressService.startSession('full-experience');
    const duration = progressService.getCurrentSessionDuration();
    expect(duration).toBeGreaterThanOrEqual(0);
    expect(typeof duration).toBe('number');
  });

  test('formatDuration handles seconds correctly', () => {
    expect(ProgressService.formatDuration(30)).toBe('30 seconds');
    expect(ProgressService.formatDuration(1)).toBe('1 second');
  });

  test('formatDuration handles minutes correctly', () => {
    expect(ProgressService.formatDuration(60)).toBe('1 minute');
    expect(ProgressService.formatDuration(120)).toBe('2 minutes');
    expect(ProgressService.formatDuration(90)).toBe('1m 30s');
  });

  test('getCompletionPercentage calculates correctly', () => {
    const mockModules = [
      { id: 'journey' },
      { id: 'philosophy' },
      { id: 'practical' },
      { id: 'connect' },
    ];
    progressService.getVisitedModules = jest.fn(() => ['journey', 'philosophy']);
    const percentage = progressService.getCompletionPercentage(mockModules);
    expect(percentage).toBe(50);
  });
});

describe('Terminal Capabilities', () => {
  test('detectTerminalCapabilities returns a valid object', () => {
    const capabilities = detectTerminalCapabilities();

    expect(capabilities).toHaveProperty('supportsColor');
    expect(capabilities).toHaveProperty('colorLevel');
    expect(capabilities).toHaveProperty('supportsUnicode');
    expect(capabilities).toHaveProperty('supportsEmoji');
    expect(capabilities).toHaveProperty('width');
    expect(capabilities).toHaveProperty('height');
    expect(capabilities).toHaveProperty('isTTY');

    expect(typeof capabilities.supportsColor).toBe('boolean');
    expect(typeof capabilities.colorLevel).toBe('number');
    expect(typeof capabilities.width).toBe('number');
    expect(typeof capabilities.height).toBe('number');
  });

  test('refreshTerminalCapabilities re-reads detection (used on resize)', () => {
    const caps = refreshTerminalCapabilities();
    expect(caps).toBeTruthy();
    expect(typeof caps.width).toBe('number');
  });

  test('checkMinimumRequirements detects narrow terminals', () => {
    const result = checkMinimumRequirements({ width: 60, height: 24, isTTY: true });
    expect(result.meets).toBe(false);
    expect(result.issues[0]).toMatch(/narrow/i);
  });

  test('checkMinimumRequirements detects short terminals', () => {
    const result = checkMinimumRequirements({ width: 80, height: 20, isTTY: true });
    expect(result.meets).toBe(false);
    expect(result.issues[0]).toMatch(/short/i);
  });

  test('checkMinimumRequirements passes for valid terminals', () => {
    const result = checkMinimumRequirements({ width: 100, height: 30, isTTY: true });
    expect(result.meets).toBe(true);
    expect(result.issues).toEqual([]);
  });
});
