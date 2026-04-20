/**
 * <QuickTour /> — curated 3-minute tour through selected segments.
 *
 * Walks the quickTourFlow array, showing each referenced segment with optional
 * transition text and a progress indicator [N/M]. Calls completeQuickTour()
 * both on natural completion (last segment) and on "Skip to Full Experience".
 *
 * Props:
 *   flow                  quickTourFlow from src/content/quick-tour.js
 *   modules               all modules, used to resolve moduleId/segmentId → segment
 *   index                 current position in the flow (0-based)
 *   capabilities
 *   onAdvance()           advance to the next tour item
 *   onSwitchToFull()      leave the tour for the main menu
 *   onQuit()              end the session
 *   onVisit(mId, sId)     visited-tracking hook
 *   onCompleteTour()      fired once when tour is complete (or user skips)
 */
import React, { useEffect, useRef } from 'react';
import { Box, Text } from 'ink';
import SegmentView from './SegmentView.jsx';
import Divider from './Divider.jsx';
import Prompt from './Prompt.jsx';

function resolveSegment(modules, item) {
  const mod = modules.find((m) => m.id === item.moduleId);
  if (!mod) return { mod: null, segment: null };
  const segment = mod.segments.find((s) => s.id === item.segmentId);
  return { mod, segment };
}

export default function QuickTour({
  flow,
  modules,
  index,
  capabilities,
  onAdvance,
  onSwitchToFull,
  onQuit,
  onVisit,
  onCompleteTour,
}) {
  const supportsColor = capabilities?.supportsColor ?? true;
  const total = flow.length;
  const clampedIndex = Math.min(Math.max(index, 0), total - 1);
  const item = flow[clampedIndex];
  const { mod, segment } = resolveSegment(modules, item);
  const isLast = clampedIndex === total - 1;

  useEffect(() => {
    if (onVisit && mod && segment) onVisit(mod.id, segment.id);
  }, [mod && mod.id, segment && segment.id, onVisit]);

  // Fire the completion callback exactly once when the last segment is shown.
  const completedRef = useRef(false);
  useEffect(() => {
    if (isLast && !completedRef.current && onCompleteTour) {
      completedRef.current = true;
      onCompleteTour();
    }
  }, [isLast, onCompleteTour]);

  if (!mod || !segment) {
    return (
      <Box marginY={1}>
        <Text color={supportsColor ? 'red' : undefined}>
          Quick tour item {clampedIndex + 1} references missing content.
        </Text>
      </Box>
    );
  }

  const handleMid = (value) => {
    if (value === 'continue') onAdvance?.();
    else if (value === 'full-experience') {
      if (onCompleteTour && !completedRef.current) {
        completedRef.current = true;
        onCompleteTour();
      }
      onSwitchToFull?.();
    } else if (value === 'quit') onQuit?.();
  };

  const handleEnd = (value) => {
    if (value === 'full-experience') onSwitchToFull?.();
    else if (value === 'quit') onQuit?.();
  };

  return (
    <Box flexDirection="column" paddingX={1}>
      {clampedIndex === 0 ? (
        <Box flexDirection="column">
          <Divider capabilities={capabilities} />
          <Box marginTop={1}>
            <Text color={supportsColor ? 'cyan' : undefined} bold>
              ⚡ Quick Tour
            </Text>
          </Box>
          <Text dimColor>
            A curated 3-minute journey through Chan Meng&apos;s story.
          </Text>
          <Divider capabilities={capabilities} />
        </Box>
      ) : null}

      {item.transition ? (
        <Box marginTop={1} marginBottom={1}>
          <Text italic dimColor>
            {item.transition.trim()}
          </Text>
        </Box>
      ) : null}

      <SegmentView segment={segment} module={mod} capabilities={capabilities} />

      <Box marginTop={1}>
        <Text dimColor>
          [{clampedIndex + 1}/{total}]
        </Text>
      </Box>

      {isLast ? (
        <Box flexDirection="column" marginTop={1}>
          <Divider capabilities={capabilities} />
          <Box marginTop={1}>
            <Text color={supportsColor ? 'green' : undefined} bold>
              ✓ Quick Tour Complete!
            </Text>
          </Box>
          <Text>
            You&apos;ve experienced a glimpse of Chan Meng&apos;s minimalist journey.
          </Text>
          <Text dimColor>
            There&apos;s much more to explore in the full experience.
          </Text>
          <Box marginTop={1}>
            <Prompt
              message="What would you like to do next?"
              choices={[
                { label: 'Explore Full Experience', value: 'full-experience' },
                { label: 'Exit (you can return anytime)', value: 'quit' },
              ]}
              onSelect={handleEnd}
            />
          </Box>
        </Box>
      ) : (
        <Box marginTop={1}>
          <Prompt
            message="Continue?"
            choices={[
              { label: 'Continue', value: 'continue' },
              { label: 'Skip to Full Experience', value: 'full-experience' },
              { label: 'Exit', value: 'quit' },
            ]}
            onSelect={handleMid}
          />
        </Box>
      )}
    </Box>
  );
}
