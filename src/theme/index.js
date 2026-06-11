import { createTheme } from '@mui/material/styles';

const shared = {
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    h1: { fontWeight: 700, lineHeight: 1.08, letterSpacing: 0 },
    h2: {
      fontWeight: 700,
      lineHeight: 1.16,
      letterSpacing: 0,
      '@media (max-width:600px)': { fontSize: '2.75rem' },
    },
    h3: {
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: 0,
      '@media (max-width:600px)': { fontSize: '2rem' },
    },
    button: { fontWeight: 700, letterSpacing: 0, textTransform: 'none' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, minHeight: 44 },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: { minWidth: 44, minHeight: 44 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 8, boxShadow: '0 14px 40px rgba(28, 30, 35, 0.08)' },
      },
    },
  },
};

export function buildTheme(mode) {
  const isDark = mode === 'dark';

  return createTheme({
    ...shared,
    palette: {
      mode,
      primary: {
        main: isDark ? '#d89a9a' : '#7b2432',
        dark: '#571a24',
      },
      secondary: {
        main: isDark ? '#d0aa63' : '#a57b34',
      },
      background: {
        default: isDark ? '#111318' : '#f6f7f8',
        paper: isDark ? '#1b1e24' : '#ffffff',
      },
      text: {
        primary: isDark ? '#f6f4f1' : '#25282d',
        secondary: isDark ? '#c9c4bd' : '#626974',
      },
      divider: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(30,34,40,0.12)',
    },
  });
}
