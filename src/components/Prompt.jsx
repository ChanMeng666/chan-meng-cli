/**
 * <Prompt /> — thin wrapper over @inkjs/ui's <Select>.
 *
 * Normalizes the shape so callers pass `choices: [{label, value, hint?}]`
 * + `onSelect(value)`. An optional message is rendered above the list.
 *
 * Hints render in dim gray after the label (e.g. time estimates, (visited)).
 */
import React from 'react';
import { Box, Text } from 'ink';
import { Select } from '@inkjs/ui';

export default function Prompt({
  message,
  choices,
  onSelect,
  defaultValue,
  visibleOptionCount,
  isDisabled = false,
}) {
  // Convert {label, hint} → single label string. @inkjs/ui doesn't support
  // rich labels, so we inline the hint into the label with a dim prefix marker
  // that consumers can strip if needed (we just rely on the user reading it).
  const options = choices.map(({ label, value, hint }) => ({
    label: hint ? `${label}  ${hint}` : label,
    value,
  }));

  return (
    <Box flexDirection="column">
      {message ? (
        <Box marginBottom={1}>
          <Text>{message}</Text>
        </Box>
      ) : null}
      <Select
        options={options}
        defaultValue={defaultValue}
        visibleOptionCount={visibleOptionCount ?? Math.min(choices.length, 10)}
        isDisabled={isDisabled}
        onChange={onSelect}
      />
    </Box>
  );
}
