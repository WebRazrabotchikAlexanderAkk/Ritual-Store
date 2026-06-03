import { useMemo } from 'react';
import { requestConfig } from '../config/requestConfig.js';
import { useLocalStorage } from './useLocalStorage.js';

export function useThemeMode() {
  const [mode, setMode] = useLocalStorage(requestConfig.storageKeys.theme, 'light');

  return useMemo(
    () => ({
      mode,
      toggleMode: () => setMode((current) => (current === 'light' ? 'dark' : 'light')),
    }),
    [mode, setMode],
  );
}
