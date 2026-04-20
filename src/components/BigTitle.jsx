/**
 * <BigTitle /> — the welcome-screen "CHAN MENG" banner.
 *
 * Uses a pre-rendered "ANSI Shadow" figlet of the name as a string constant so
 * we don't drag figlet/gradient-string into the runtime. A cyan→magenta
 * gradient is applied per-line via Ink's hex color prop.
 *
 * Falls back to plain white rendering when the terminal has no color support
 * or is narrower than the title (width < ~76 cols).
 */
import React from 'react';
import { Box, Text } from 'ink';

// Pre-rendered: figlet.textSync('CHAN MENG', { font: 'ANSI Shadow' })
const TITLE_LINES = [
  ' ██████╗██╗  ██╗ █████╗ ███╗   ██╗    ███╗   ███╗███████╗███╗   ██╗ ██████╗ ',
  '██╔════╝██║  ██║██╔══██╗████╗  ██║    ████╗ ████║██╔════╝████╗  ██║██╔════╝ ',
  '██║     ███████║███████║██╔██╗ ██║    ██╔████╔██║█████╗  ██╔██╗ ██║██║  ███╗',
  '██║     ██╔══██║██╔══██║██║╚██╗██║    ██║╚██╔╝██║██╔══╝  ██║╚██╗██║██║   ██║',
  '╚██████╗██║  ██║██║  ██║██║ ╚████║    ██║ ╚═╝ ██║███████╗██║ ╚████║╚██████╔╝',
  ' ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝    ╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝ ',
];

const TITLE_WIDTH = TITLE_LINES[0].length;

// Compact fallback for very narrow terminals.
const COMPACT_TITLE = [
  '╔═════════════════════════╗',
  '║       CHAN MENG         ║',
  '╚═════════════════════════╝',
];

// Linear interpolation between two hex-coded RGB values.
function lerp(a, b, t) {
  return Math.round(a + (b - a) * t);
}

function parseHex(hex) {
  const clean = hex.replace('#', '');
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

function toHex({ r, g, b }) {
  return (
    '#' +
    [r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('')
  );
}

// Cyan (#00ffff) to magenta (#ff00ff) across the six title rows.
const GRADIENT_START = parseHex('#00ffff');
const GRADIENT_END = parseHex('#ff00ff');

function gradientForLine(index, total) {
  const t = total <= 1 ? 0 : index / (total - 1);
  return toHex({
    r: lerp(GRADIENT_START.r, GRADIENT_END.r, t),
    g: lerp(GRADIENT_START.g, GRADIENT_END.g, t),
    b: lerp(GRADIENT_START.b, GRADIENT_END.b, t),
  });
}

export default function BigTitle({ capabilities }) {
  const width = capabilities?.width ?? 80;
  const supportsColor = capabilities?.supportsColor ?? true;

  // Narrow terminals: compact fallback (no gradient — just cyan).
  if (width < TITLE_WIDTH + 4) {
    return (
      <Box flexDirection="column" alignItems="flex-start">
        {COMPACT_TITLE.map((line, i) => (
          <Text key={i} color={supportsColor ? 'cyan' : undefined} bold>
            {line}
          </Text>
        ))}
        <Text color={supportsColor ? 'cyan' : undefined} dimColor>
          极简生活 · Minimalist Living
        </Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column">
      {TITLE_LINES.map((line, i) => (
        <Text
          key={i}
          color={supportsColor ? gradientForLine(i, TITLE_LINES.length) : undefined}
        >
          {line}
        </Text>
      ))}
      <Text color={supportsColor ? 'cyan' : undefined} dimColor>
        {' '.repeat(Math.max(0, Math.floor((TITLE_WIDTH - 30) / 2)))}
        极简生活 · Minimalist Living
      </Text>
    </Box>
  );
}
