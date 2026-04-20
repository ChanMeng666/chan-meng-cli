/**
 * useCapabilities() — subscribe to the CapabilitiesContext.
 * Re-renders on terminal resize via the provider's 'resize' listener.
 */
import { useContext } from 'react';
import { CapabilitiesContext } from '../contexts/CapabilitiesContext.js';

export function useCapabilities() {
  return useContext(CapabilitiesContext);
}

export default useCapabilities;
