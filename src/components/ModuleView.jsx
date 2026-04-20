/**
 * <ModuleView /> — generic segment walker for Journey / Philosophy / Practical.
 *
 * Replaces the near-identical imperative loops in the old
 * src/modules/{journey,philosophy,practical}.js. Drives visited-module and
 * module-complete side effects via progressService callbacks passed in as props.
 *
 * Flow:
 *   - Show module header (title + description + divider)
 *   - Render the current <SegmentView>
 *   - Prompt: Continue / Back to Menu / Exit  (last segment: Back / Exit only)
 *
 * Props:
 *   module                the module object from src/content/*
 *   segmentIndex          current segment index (0-based)
 *   capabilities
 *   onNext()              advance to the next segment
 *   onBack()              return to the main menu
 *   onQuit()              end the session
 *   onVisit(moduleId, segmentId)    visited-tracking hook
 *   onComplete(moduleId)  called once when the last segment is reached
 */
import React, { useEffect } from 'react';
import { Box, Text } from 'ink';
import SegmentView from './SegmentView.jsx';
import Divider from './Divider.jsx';
import Prompt from './Prompt.jsx';

export default function ModuleView({
  module: mod,
  segmentIndex,
  capabilities,
  onNext,
  onBack,
  onQuit,
  onVisit,
  onComplete,
}) {
  const supportsColor = capabilities?.supportsColor ?? true;
  const segment = mod.segments[segmentIndex];
  const isLast = segmentIndex >= mod.segments.length - 1;

  // Side effects: visited-tracking on segment change, completion on last segment.
  useEffect(() => {
    if (onVisit && segment) {
      onVisit(mod.id, segment.id);
    }
  }, [mod.id, segment && segment.id, onVisit]);

  useEffect(() => {
    if (isLast && onComplete) {
      onComplete(mod.id);
    }
  }, [isLast, mod.id, onComplete]);

  if (!segment) {
    return (
      <Box marginY={1}>
        <Text color={supportsColor ? 'red' : undefined}>
          Module "{mod.id}" has no segment at index {segmentIndex}.
        </Text>
      </Box>
    );
  }

  const choices = isLast
    ? [
        { label: 'Back to Menu', value: 'menu' },
        { label: 'Exit', value: 'quit' },
      ]
    : [
        { label: 'Continue', value: 'continue' },
        { label: 'Back to Menu', value: 'menu' },
        { label: 'Exit', value: 'quit' },
      ];

  const handle = (value) => {
    if (value === 'continue') onNext?.();
    else if (value === 'menu') onBack?.();
    else if (value === 'quit') onQuit?.();
  };

  return (
    <Box flexDirection="column" paddingX={1}>
      <Box marginTop={1}>
        <Divider capabilities={capabilities} />
      </Box>
      <Box marginTop={1}>
        <Text color={supportsColor ? 'cyan' : undefined} bold>
          {mod.title}
        </Text>
      </Box>
      {mod.description ? (
        <Box marginTop={1}>
          <Text>{mod.description}</Text>
        </Box>
      ) : null}
      <Box marginTop={1} marginBottom={1}>
        <Divider capabilities={capabilities} />
      </Box>

      <SegmentView segment={segment} module={mod} capabilities={capabilities} />

      <Box marginTop={1}>
        <Prompt
          message={
            isLast
              ? `${mod.title} complete. What would you like to do?`
              : 'What would you like to do?'
          }
          choices={choices}
          onSelect={handle}
        />
      </Box>
    </Box>
  );
}
