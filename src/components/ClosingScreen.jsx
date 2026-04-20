/**
 * <ClosingScreen /> — final thank-you message with session duration.
 * Mirrors displayClosingMessage() in the old src/services/display.js.
 */
import React from 'react';
import { Box, Text } from 'ink';

function formatDuration(seconds) {
  if (!seconds || seconds < 1) return null;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export default function ClosingScreen({ mode, durationSeconds, capabilities }) {
  const width = capabilities?.width ?? 80;
  const supportsColor = capabilities?.supportsColor ?? true;
  const canBox = supportsColor && width >= 80;

  const intro = "Thank you for exploring Chan Meng's journey.";
  const followUp =
    mode === 'quick-tour'
      ? 'This was the Quick Tour. Run again to explore the full experience.'
      : 'Feel free to return anytime to explore more.';
  const timeLine = formatDuration(durationSeconds);

  const content = (
    <Box flexDirection="column" alignItems="center">
      <Text>{intro}</Text>
      <Box marginTop={1}>
        <Text>{followUp}</Text>
      </Box>
      {timeLine ? (
        <Box marginTop={1}>
          <Text dimColor>Time spent: {timeLine}</Text>
        </Box>
      ) : null}
    </Box>
  );

  if (canBox) {
    return (
      <Box
        borderStyle="round"
        borderColor="green"
        paddingX={2}
        paddingY={1}
        marginY={1}
        alignSelf="flex-start"
      >
        {content}
      </Box>
    );
  }

  return (
    <Box flexDirection="column" marginY={1}>
      {content}
    </Box>
  );
}
