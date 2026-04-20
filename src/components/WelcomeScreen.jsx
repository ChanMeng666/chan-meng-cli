/**
 * <WelcomeScreen /> — first screen users see.
 *
 * Props:
 *   capabilities           terminal capabilities
 *   isFirstRun             true if user has never run the CLI before
 *   hasCompletedQuickTour  true if they've already done the Quick Tour
 *   lastSession            { moduleId, timestamp } or null
 *   onSelectMode(mode)     'quick-tour' | 'full-experience' | 'resume' | 'exit'
 *
 * Mirrors the mode-choice logic from src/modules/welcome.js.
 */
import React from 'react';
import { Box, Text } from 'ink';
import BigTitle from './BigTitle.jsx';
import Divider from './Divider.jsx';
import FirstTimeTips from './FirstTimeTips.jsx';
import Prompt from './Prompt.jsx';

function getTimeAgo(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  return date.toLocaleDateString();
}

export default function WelcomeScreen({
  capabilities,
  isFirstRun,
  hasCompletedQuickTour,
  lastSession,
  onSelectMode,
}) {
  const supportsColor = capabilities?.supportsColor ?? true;

  const choices = [];

  if (isFirstRun || !hasCompletedQuickTour) {
    choices.push({
      label: '⚡ Quick Tour',
      value: 'quick-tour',
      hint: '(3 minutes - recommended for first-timers)',
    });
  }

  choices.push({
    label: '📚 Full Experience',
    value: 'full-experience',
    hint: '(explore at your own pace)',
  });

  if (lastSession && lastSession.moduleId && !isFirstRun) {
    choices.push({
      label: '↩  Resume',
      value: 'resume',
      hint: `(continue from ${lastSession.moduleId})`,
    });
  }

  choices.push({ label: 'Exit', value: 'exit' });

  return (
    <Box flexDirection="column" paddingX={1}>
      <BigTitle capabilities={capabilities} />

      <Box marginTop={1}>
        <Divider capabilities={capabilities} />
      </Box>

      <Box marginTop={1} flexDirection="column">
        {isFirstRun ? (
          <>
            <Text>
              Welcome! This interactive experience introduces Chan Meng—
            </Text>
            <Text>
              a minimalist who lives with only what fits in one backpack.
            </Text>
          </>
        ) : (
          <Text color={supportsColor ? 'cyan' : undefined}>Welcome back!</Text>
        )}
        {!isFirstRun && lastSession && lastSession.moduleId ? (
          <Text dimColor>
            {' '}ℹ Last visit: {getTimeAgo(new Date(lastSession.timestamp))}{' '}
            (viewing: {lastSession.moduleId})
          </Text>
        ) : null}
      </Box>

      {isFirstRun ? <FirstTimeTips capabilities={capabilities} /> : null}

      <Box marginTop={1}>
        <Prompt
          message="How would you like to proceed?"
          choices={choices}
          onSelect={onSelectMode}
        />
      </Box>
    </Box>
  );
}
