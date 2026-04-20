import React from 'react';
import { render } from 'ink-testing-library';
import { describe, it, expect, jest } from '@jest/globals';

import WelcomeScreen from '../../src/components/WelcomeScreen.jsx';
import MainMenu from '../../src/components/MainMenu.jsx';
import ModuleView from '../../src/components/ModuleView.jsx';
import ConnectView from '../../src/components/ConnectView.jsx';
import QuickTour from '../../src/components/QuickTour.jsx';
import ClosingScreen from '../../src/components/ClosingScreen.jsx';
import FirstTimeTips from '../../src/components/FirstTimeTips.jsx';
import ErrorBanner from '../../src/components/ErrorBanner.jsx';
import { allModules, quickTourFlow } from '../../src/content/stories.js';

const CAPS = { width: 120, supportsColor: true, supportsEmoji: true };

describe('<WelcomeScreen />', () => {
  it('renders the BigTitle + first-run greeting + tips', () => {
    const { lastFrame } = render(
      <WelcomeScreen
        capabilities={CAPS}
        isFirstRun={true}
        hasCompletedQuickTour={false}
        lastSession={null}
        onSelectMode={() => {}}
      />,
    );
    const frame = lastFrame();
    expect(frame).toContain('极简生活');
    expect(frame).toContain('Welcome!');
    expect(frame).toContain('How would you like to proceed?');
    expect(frame).toContain('Quick Tour');
    expect(frame).toContain('Full Experience');
  });

  it('shows Resume for returning users with a lastSession', () => {
    const { lastFrame } = render(
      <WelcomeScreen
        capabilities={CAPS}
        isFirstRun={false}
        hasCompletedQuickTour={true}
        lastSession={{ moduleId: 'journey', timestamp: Date.now() }}
        onSelectMode={() => {}}
      />,
    );
    const frame = lastFrame();
    expect(frame).toContain('Welcome back!');
    expect(frame).toContain('Resume');
    expect(frame).not.toContain('Quick Tour');
  });
});

describe('<MainMenu />', () => {
  it('lists all modules with visited markers and time estimates', () => {
    const { lastFrame } = render(
      <MainMenu
        modules={allModules}
        visitedModules={['journey']}
        capabilities={CAPS}
        onSelect={() => {}}
      />,
    );
    const frame = lastFrame();
    expect(frame).toContain('Choose Your Journey');
    expect(frame).toContain('The Journey');
    expect(frame).toContain('Philosophy');
    expect(frame).toContain('Practical');
    expect(frame).toContain('Connect');
    expect(frame).toContain('min)');
    expect(frame).toContain('✓');
    expect(frame).toContain('Exit');
  });
});

describe('<ModuleView />', () => {
  const journey = allModules.find((m) => m.id === 'journey');

  it('renders the first segment with Continue/Back/Exit', () => {
    const { lastFrame } = render(
      <ModuleView
        module={journey}
        segmentIndex={0}
        capabilities={CAPS}
        onNext={() => {}}
        onBack={() => {}}
        onQuit={() => {}}
      />,
    );
    const frame = lastFrame();
    expect(frame).toContain(journey.title);
    expect(frame).toContain(journey.segments[0].title);
    expect(frame).toContain('Continue');
    expect(frame).toContain('Back to Menu');
    expect(frame).toContain('Exit');
  });

  it('calls onVisit on mount and onComplete on the last segment', () => {
    const onVisit = jest.fn();
    const onComplete = jest.fn();
    const lastIndex = journey.segments.length - 1;
    render(
      <ModuleView
        module={journey}
        segmentIndex={lastIndex}
        capabilities={CAPS}
        onVisit={onVisit}
        onComplete={onComplete}
      />,
    );
    expect(onVisit).toHaveBeenCalledWith(journey.id, journey.segments[lastIndex].id);
    expect(onComplete).toHaveBeenCalledWith(journey.id);
  });

  it('hides Continue on the final segment', () => {
    const lastIndex = journey.segments.length - 1;
    const { lastFrame } = render(
      <ModuleView module={journey} segmentIndex={lastIndex} capabilities={CAPS} />,
    );
    const frame = lastFrame();
    expect(frame).toContain('complete');
    expect(frame).not.toMatch(/\bContinue\b/);
  });
});

describe('<ConnectView />', () => {
  const connect = allModules.find((m) => m.id === 'connect');

  it('renders contact info and marks the module complete on mount', () => {
    const onComplete = jest.fn();
    const { lastFrame } = render(
      <ConnectView
        module={connect}
        capabilities={CAPS}
        onVisit={() => {}}
        onComplete={onComplete}
      />,
    );
    expect(lastFrame()).toContain(connect.title);
    expect(lastFrame()).toContain('chanmeng');
    expect(onComplete).toHaveBeenCalledWith('connect');
  });
});

describe('<QuickTour />', () => {
  it('renders the first tour item with "Quick Tour" intro', () => {
    const { lastFrame } = render(
      <QuickTour
        flow={quickTourFlow}
        modules={allModules}
        index={0}
        capabilities={CAPS}
      />,
    );
    const frame = lastFrame();
    expect(frame).toContain('Quick Tour');
    expect(frame).toContain('[1/6]');
  });

  it('renders the "complete" celebration on the last item', () => {
    const { lastFrame } = render(
      <QuickTour
        flow={quickTourFlow}
        modules={allModules}
        index={quickTourFlow.length - 1}
        capabilities={CAPS}
      />,
    );
    const frame = lastFrame();
    expect(frame).toContain('Quick Tour Complete');
    expect(frame).toContain(`[${quickTourFlow.length}/${quickTourFlow.length}]`);
    expect(frame).toContain('Explore Full Experience');
  });

  it('fires onCompleteTour exactly once on the last item', () => {
    const onCompleteTour = jest.fn();
    render(
      <QuickTour
        flow={quickTourFlow}
        modules={allModules}
        index={quickTourFlow.length - 1}
        capabilities={CAPS}
        onCompleteTour={onCompleteTour}
      />,
    );
    expect(onCompleteTour).toHaveBeenCalledTimes(1);
  });
});

describe('<ClosingScreen />', () => {
  it('shows the thank-you + duration', () => {
    const { lastFrame } = render(
      <ClosingScreen
        mode="full-experience"
        durationSeconds={125}
        capabilities={CAPS}
      />,
    );
    const frame = lastFrame();
    expect(frame).toContain('Thank you');
    expect(frame).toContain('2m 5s');
  });

  it('uses the quick-tour followup when mode === quick-tour', () => {
    const { lastFrame } = render(
      <ClosingScreen mode="quick-tour" durationSeconds={10} capabilities={CAPS} />,
    );
    expect(lastFrame()).toContain('Run again to explore the full experience');
  });
});

describe('<FirstTimeTips />', () => {
  it('renders three tip lines', () => {
    const { lastFrame } = render(<FirstTimeTips capabilities={CAPS} />);
    expect(lastFrame()).toContain('exit at any time');
    expect(lastFrame()).toContain('Time estimates');
    expect(lastFrame()).toContain('return to explore');
  });
});

describe('<ErrorBanner />', () => {
  it('renders the message with a red "Error:" label', () => {
    const { lastFrame } = render(
      <ErrorBanner message="Something broke" capabilities={CAPS} />,
    );
    expect(lastFrame()).toContain('Error:');
    expect(lastFrame()).toContain('Something broke');
  });
});
