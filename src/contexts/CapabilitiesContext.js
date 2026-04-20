/**
 * CapabilitiesContext — shares terminal capabilities (width/height/color/emoji)
 * with every component in the tree, and re-renders on terminal resize.
 */
import React, { createContext, useEffect, useState } from 'react';
import { useStdout } from 'ink';
import {
  getTerminalCapabilities,
  refreshTerminalCapabilities,
} from '../utils/terminal.js';

export const CapabilitiesContext = createContext(getTerminalCapabilities());

export function CapabilitiesProvider({ children, initialCapabilities }) {
  const { stdout } = useStdout();
  const [capabilities, setCapabilities] = useState(
    initialCapabilities ?? getTerminalCapabilities(),
  );

  useEffect(() => {
    if (!stdout || typeof stdout.on !== 'function') return undefined;

    const handleResize = () => {
      setCapabilities(refreshTerminalCapabilities());
    };

    stdout.on('resize', handleResize);
    return () => {
      if (typeof stdout.off === 'function') {
        stdout.off('resize', handleResize);
      } else if (typeof stdout.removeListener === 'function') {
        stdout.removeListener('resize', handleResize);
      }
    };
  }, [stdout]);

  return (
    <CapabilitiesContext.Provider value={capabilities}>
      {children}
    </CapabilitiesContext.Provider>
  );
}
