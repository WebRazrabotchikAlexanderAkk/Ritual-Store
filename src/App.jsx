import { useMemo, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AppRouter from './routes/AppRouter.jsx';
import { AppContext } from './context/AppContext.jsx';
import { buildTheme } from './theme/index.js';
import { useFavorites } from './hooks/useFavorites.js';
import { useThemeMode } from './hooks/useThemeMode.js';

export default function App() {
  const themeMode = useThemeMode();
  const favorites = useFavorites();
  const [notification, setNotification] = useState(null);
  const theme = useMemo(() => buildTheme(themeMode.mode), [themeMode.mode]);
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

  const contextValue = useMemo(
    () => ({
      ...favorites,
      themeMode,
      notify: (message, severity = 'success') => setNotification({ message, severity }),
    }),
    [favorites, themeMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={contextValue}>
        <BrowserRouter basename={basename}>
          <AppRouter />
        </BrowserRouter>
        <Snackbar
          open={Boolean(notification)}
          autoHideDuration={3600}
          onClose={() => setNotification(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            severity={notification?.severity || 'success'}
            variant="filled"
            onClose={() => setNotification(null)}
            sx={{ width: '100%' }}
          >
            {notification?.message}
          </Alert>
        </Snackbar>
      </AppContext.Provider>
    </ThemeProvider>
  );
}
