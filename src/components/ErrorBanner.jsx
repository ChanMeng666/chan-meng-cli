/**
 * <ErrorBanner /> — red banner for unexpected states / reducer fallbacks.
 */
import React from 'react';
import { Box, Text } from 'ink';

export default function ErrorBanner({ message, capabilities }) {
  const supportsColor = capabilities?.supportsColor ?? true;
  return (
    <Box marginY={1}>
      <Text color={supportsColor ? 'red' : undefined} bold>
        Error:{' '}
      </Text>
      <Text color={supportsColor ? 'red' : undefined}>{message}</Text>
    </Box>
  );
}
