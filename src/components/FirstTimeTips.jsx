/**
 * <FirstTimeTips /> — three dim-gray tips shown once on first run.
 * Mirrors displayFirstTimeTips() in the old src/modules/welcome.js.
 */
import React from 'react';
import { Box, Text } from 'ink';

const TIPS = [
  '💡 You can exit at any time (your progress will be saved)',
  '⏱️  Time estimates are approximate',
  '↩️  You can always return to explore more',
];

export default function FirstTimeTips({ capabilities }) {
  const supportsEmoji = capabilities?.supportsEmoji ?? true;

  return (
    <Box flexDirection="column" marginTop={1} marginBottom={1}>
      {TIPS.map((tip, i) => (
        <Text key={i} dimColor>
          {'  '}
          {supportsEmoji ? tip : tip.replace(/[💡⏱️↩️]/gu, '-').trim()}
        </Text>
      ))}
    </Box>
  );
}
