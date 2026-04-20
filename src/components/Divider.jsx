/**
 * <Divider /> — a horizontal rule sized to the terminal (capped at 80 cols).
 * Mirrors the legacy displayDivider() behavior in src/services/display.js.
 */
import React from 'react';
import { Text } from 'ink';

export default function Divider({ capabilities, color }) {
  const width = Math.max(10, Math.min((capabilities?.width ?? 80) - 4, 80));
  const supportsColor = capabilities?.supportsColor ?? true;
  const line = '─'.repeat(width);

  return (
    <Text color={supportsColor ? color ?? 'gray' : undefined} dimColor>
      {line}
    </Text>
  );
}
