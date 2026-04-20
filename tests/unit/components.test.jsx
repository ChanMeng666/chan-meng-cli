import React from 'react';
import { render } from 'ink-testing-library';
import { describe, it, expect } from '@jest/globals';

import BigTitle from '../../src/components/BigTitle.jsx';
import Divider from '../../src/components/Divider.jsx';
import SegmentView from '../../src/components/SegmentView.jsx';

const WIDE = { width: 120, supportsColor: true, supportsEmoji: true };
const NARROW = { width: 40, supportsColor: true, supportsEmoji: true };
const MONO = { width: 120, supportsColor: false, supportsEmoji: false };

// Strips ANSI escape sequences. Asserting the *presence* of ANSI codes in
// Ink's rendered output is environment-dependent: chalk inspects stdout.isTTY
// at the library level and may emit reset sequences even when every <Text>
// has color={undefined}. For mono-capability assertions we strip and then
// verify structural content.
const stripAnsi = (s) => s.replace(/\x1b\[[0-9;]*m/g, '');

describe('<BigTitle />', () => {
  it('renders the full ANSI Shadow banner on a wide terminal', () => {
    const { lastFrame } = render(<BigTitle capabilities={WIDE} />);
    const frame = lastFrame();
    expect(frame).toContain('███');
    expect(frame).toContain('极简生活');
  });

  it('falls back to the compact title on a narrow terminal', () => {
    const { lastFrame } = render(<BigTitle capabilities={NARROW} />);
    const frame = lastFrame();
    expect(frame).toContain('CHAN MENG');
    expect(frame).not.toContain('███');
  });

  it('still renders the full title text when color support is off', () => {
    const { lastFrame } = render(<BigTitle capabilities={MONO} />);
    const stripped = stripAnsi(lastFrame());
    expect(stripped).toContain('███');
    expect(stripped).toContain('极简生活');
  });
});

describe('<Divider />', () => {
  it('renders a horizontal line', () => {
    const { lastFrame } = render(<Divider capabilities={WIDE} />);
    expect(lastFrame()).toMatch(/─+/);
  });

  it('caps at 80 cells even on very wide terminals', () => {
    const { lastFrame } = render(
      <Divider capabilities={{ ...WIDE, width: 500 }} />,
    );
    const line = stripAnsi(lastFrame()).trim();
    expect(line.length).toBeLessThanOrEqual(80);
  });
});

describe('<SegmentView />', () => {
  const segment = {
    id: 1,
    title: 'The Breaking Point',
    content: 'In 2018, something had to give.\nShe decided to leave.',
    metadata: {
      quote: 'You can\'t even sell yourself.',
      year: 2018,
      location: 'Guilin, China',
    },
  };
  const mod = { id: 'journey', title: 'The Journey' };

  it('renders title, content, and metadata', () => {
    const { lastFrame } = render(
      <SegmentView segment={segment} module={mod} capabilities={WIDE} />,
    );
    const frame = lastFrame();
    expect(frame).toContain('[The Journey]');
    expect(frame).toContain('The Breaking Point');
    expect(frame).toContain('In 2018, something had to give');
    expect(frame).toContain('She decided to leave');
    expect(frame).toContain('Year: 2018');
    expect(frame).toContain('Location: Guilin, China');
  });

  it('skips the title box on narrow terminals', () => {
    const { lastFrame } = render(
      <SegmentView segment={segment} module={mod} capabilities={NARROW} />,
    );
    const frame = lastFrame();
    expect(frame).toContain('The Breaking Point');
    // Narrow fallback does not use the rounded-border glyphs.
    expect(frame).not.toContain('╭');
  });

  it('handles segments without metadata', () => {
    const bare = { id: 2, title: 'Short', content: 'Hello.' };
    const { lastFrame } = render(
      <SegmentView segment={bare} capabilities={WIDE} />,
    );
    expect(lastFrame()).toContain('Hello.');
  });
});
