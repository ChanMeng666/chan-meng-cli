/**
 * <ConnectView /> — specialized single-segment view for the Connect module.
 * Renders the contact info as a boxed card, mirroring the old
 * src/modules/connect.js layout.
 */
import React, { useEffect } from 'react';
import { Box, Text } from 'ink';
import Divider from './Divider.jsx';
import Prompt from './Prompt.jsx';

export default function ConnectView({
  module: mod,
  capabilities,
  onBack,
  onQuit,
  onVisit,
  onComplete,
}) {
  const width = capabilities?.width ?? 80;
  const supportsColor = capabilities?.supportsColor ?? true;
  const canBox = supportsColor && width >= 80;

  const segment = mod.segments[0];

  useEffect(() => {
    if (onVisit && segment) onVisit(mod.id, segment.id);
    if (onComplete) onComplete(mod.id);
  }, [mod.id, segment && segment.id, onVisit, onComplete]);

  const body = (
    <Box flexDirection="column">
      <Text color={supportsColor ? 'cyan' : undefined} bold>
        {mod.title}
      </Text>
      <Box marginTop={1} flexDirection="column">
        {(segment?.content ?? '').split('\n').map((line, i) => (
          <Text key={i}>{line || ' '}</Text>
        ))}
      </Box>
    </Box>
  );

  const choices = [
    { label: 'Back to Menu', value: 'menu' },
    { label: 'Exit', value: 'quit' },
  ];

  const handle = (value) => {
    if (value === 'menu') onBack?.();
    else if (value === 'quit') onQuit?.();
  };

  return (
    <Box flexDirection="column" paddingX={1}>
      <Divider capabilities={capabilities} />
      {canBox ? (
        <Box
          borderStyle="round"
          borderColor="cyan"
          paddingX={2}
          paddingY={1}
          marginY={1}
          alignSelf="flex-start"
        >
          {body}
        </Box>
      ) : (
        <Box marginY={1}>{body}</Box>
      )}
      <Divider capabilities={capabilities} />
      <Box marginTop={1}>
        <Prompt
          message="What would you like to do?"
          choices={choices}
          onSelect={handle}
        />
      </Box>
    </Box>
  );
}
