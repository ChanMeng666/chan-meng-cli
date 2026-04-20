/**
 * <SegmentView /> — renders a single story segment.
 *
 * Layout:
 *   [Module Title]                           (dim cyan context header)
 *
 *   ┌─────────────────────┐
 *   │  Segment Title      │                  (rounded box, cyan border)
 *   └─────────────────────┘
 *
 *   body text wrapped to terminal width
 *
 *   "quote"                                  (italic dim)
 *     Year: 2018                              (dim gray)
 *     Location: Guilin, China
 *
 * Mirrors displaySegment() in the old src/services/display.js:164-253.
 * Falls back to a plain title line when the terminal is narrow or can't
 * render color.
 */
import React from 'react';
import { Box, Text } from 'ink';

export default function SegmentView({ segment, module: mod, capabilities }) {
  const width = capabilities?.width ?? 80;
  const supportsColor = capabilities?.supportsColor ?? true;
  const canBox = supportsColor && width >= 80;

  return (
    <Box flexDirection="column" marginTop={1} marginBottom={1}>
      {mod ? (
        <Text color={supportsColor ? 'cyan' : undefined} dimColor>
          [{mod.title}]
        </Text>
      ) : null}

      {segment.title ? (
        canBox ? (
          <Box
            borderStyle="round"
            borderColor="cyan"
            paddingX={2}
            marginTop={1}
            marginBottom={1}
            alignSelf="flex-start"
          >
            <Text color="white" bold>
              {segment.title}
            </Text>
          </Box>
        ) : (
          <Box marginTop={1} marginBottom={1}>
            <Text bold>{segment.title}</Text>
          </Box>
        )
      ) : null}

      <SegmentBody content={segment.content || ''} width={width} />

      {segment.metadata ? (
        <SegmentMetadata
          metadata={segment.metadata}
          supportsColor={supportsColor}
        />
      ) : null}
    </Box>
  );
}

function SegmentBody({ content, width }) {
  // Ink/Yoga will wrap on its own, but we keep the hard-break semantics of the
  // original content by rendering each source line as its own <Text>.
  const lines = content.split('\n');
  const maxWidth = Math.max(20, Math.min(width - 4, 100));

  return (
    <Box flexDirection="column" width={maxWidth}>
      {lines.map((line, i) => (
        <Text key={i}>{line || ' '}</Text>
      ))}
    </Box>
  );
}

function SegmentMetadata({ metadata, supportsColor }) {
  const dimColor = supportsColor;

  return (
    <Box flexDirection="column" marginTop={1}>
      {metadata.quote ? (
        <Text italic dimColor={dimColor}>
          {'  '}"{metadata.quote}"
        </Text>
      ) : null}
      {metadata.year ? (
        <Text color={supportsColor ? 'gray' : undefined} dimColor={dimColor}>
          {'  '}Year: {metadata.year}
        </Text>
      ) : null}
      {metadata.location ? (
        <Text color={supportsColor ? 'gray' : undefined} dimColor={dimColor}>
          {'  '}Location: {metadata.location}
        </Text>
      ) : null}
    </Box>
  );
}
