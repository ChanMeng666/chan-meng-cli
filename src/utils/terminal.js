/**
 * Terminal Capability Detection
 *
 * Detects terminal capabilities to enable graceful degradation when advanced
 * features aren't supported. Used by <CapabilitiesProvider> (which re-runs
 * refreshTerminalCapabilities() on resize).
 */

import { stdout } from 'process';

/**
 * Detect terminal capabilities
 * @returns {Object} Capabilities object
 */
export function detectTerminalCapabilities() {
  const capabilities = {
    supportsColor: false,
    colorLevel: 0,
    supportsUnicode: true,
    supportsEmoji: true,
    width: 80,
    height: 24,
    isTTY: false,
  };

  capabilities.isTTY = stdout.isTTY || false;

  const term = process.env.TERM || '';
  const colorterm = process.env.COLORTERM || '';
  const forceColor = process.env.FORCE_COLOR;

  if (process.env.NO_COLOR) {
    capabilities.supportsColor = false;
    capabilities.colorLevel = 0;
  } else if (forceColor !== undefined && forceColor !== '0' && forceColor !== 'false') {
    capabilities.supportsColor = true;
    const level = parseInt(forceColor, 10);
    capabilities.colorLevel = Number.isNaN(level) ? 1 : Math.min(Math.max(level, 1), 3);
  } else if (
    term.includes('256color') ||
    term.includes('color') ||
    colorterm === 'truecolor' ||
    colorterm === '24bit' ||
    process.env.WSL_DISTRO_NAME ||
    process.env.WT_SESSION ||
    process.env.COLORTERM
  ) {
    capabilities.supportsColor = true;
    capabilities.colorLevel =
      term.includes('256color') || colorterm === 'truecolor' ? 2 : 1;
  }

  if (stdout.isTTY && stdout.columns && stdout.rows) {
    capabilities.width = stdout.columns;
    capabilities.height = stdout.rows;
  }

  const lang = process.env.LANG || '';
  const poorUnicodeTerms = ['linux', 'vt100', 'vt220'];
  if (poorUnicodeTerms.some((t) => term.includes(t))) {
    capabilities.supportsUnicode = false;
    capabilities.supportsEmoji = false;
  }
  if (!lang.toLowerCase().includes('utf')) {
    capabilities.supportsUnicode = false;
    capabilities.supportsEmoji = false;
  }
  // Windows Command Prompt has limited emoji support; Windows Terminal sets
  // WT_SESSION which lets us detect the upgrade.
  if (process.platform === 'win32' && !process.env.WT_SESSION) {
    capabilities.supportsEmoji = false;
  }

  return capabilities;
}

/**
 * Check if terminal meets minimum requirements
 * @param {Object} capabilities - Terminal capabilities
 * @returns {{ meets: boolean, issues: string[], warnings: string[] }}
 */
export function checkMinimumRequirements(capabilities) {
  const issues = [];
  const warnings = [];

  if (capabilities.width && capabilities.width < 80) {
    issues.push(`Terminal too narrow: ${capabilities.width} columns (need 80+)`);
  }
  if (capabilities.height && capabilities.height < 24) {
    issues.push(`Terminal too short: ${capabilities.height} rows (need 24+)`);
  }
  if (!capabilities.isTTY) {
    warnings.push('Running in non-TTY mode (this is usually fine)');
  }

  return { meets: issues.length === 0, issues, warnings };
}

let cachedCapabilities = null;

export function getTerminalCapabilities() {
  if (!cachedCapabilities) {
    cachedCapabilities = detectTerminalCapabilities();
  }
  return cachedCapabilities;
}

/**
 * Clear the cache and re-detect. Used by <CapabilitiesProvider> when the
 * terminal emits a 'resize' event so components observe fresh width/height.
 * @returns {Object} Freshly detected capabilities
 */
export function refreshTerminalCapabilities() {
  cachedCapabilities = detectTerminalCapabilities();
  return cachedCapabilities;
}
