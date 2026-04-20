/**
 * <MainMenu /> — select a module in Full Experience mode.
 * Mirrors the menu rendering logic in the old src/cli.js:27-76.
 */
import React from 'react';
import { Box, Text } from 'ink';
import Prompt from './Prompt.jsx';

export default function MainMenu({
  modules,
  visitedModules = [],
  onSelect,
  capabilities,
}) {
  const supportsColor = capabilities?.supportsColor ?? true;
  const supportsEmoji = capabilities?.supportsEmoji ?? true;

  const choices = modules.map((mod) => {
    const icon = supportsEmoji ? mod.icon || '▸' : '>';
    const visited = visitedModules.includes(mod.id)
      ? supportsEmoji
        ? ' ✓'
        : ' [visited]'
      : '';
    const time = mod.estimatedTime
      ? ` (~${Math.ceil(mod.estimatedTime / 60)}min)`
      : '';
    return {
      label: `${icon} ${mod.title}${visited}`,
      value: mod.id,
      hint: time,
    };
  });

  choices.push({ label: 'Exit', value: 'exit' });

  return (
    <Box flexDirection="column" paddingX={1}>
      <Box marginBottom={1}>
        <Text color={supportsColor ? 'cyan' : undefined} bold>
          {supportsEmoji ? '📖  ' : ''}Choose Your Journey:
        </Text>
      </Box>

      <Box flexDirection="column" marginBottom={1}>
        {modules.map((mod) => (
          <Box key={mod.id} flexDirection="column" marginBottom={1}>
            {mod.description ? (
              <Text dimColor>
                {'   '}
                {mod.description}
              </Text>
            ) : null}
          </Box>
        ))}
      </Box>

      <Prompt
        message="Select a module to explore:"
        choices={choices}
        onSelect={onSelect}
        visibleOptionCount={Math.min(choices.length, 10)}
      />
    </Box>
  );
}
