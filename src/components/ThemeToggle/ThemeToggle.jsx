import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useAppContext } from '../../context/AppContext.jsx';

export default function ThemeToggle() {
  const { themeMode } = useAppContext();
  const isLight = themeMode.mode === 'light';

  return (
    <Tooltip title={isLight ? 'Включить темную тему' : 'Включить светлую тему'}>
      <IconButton color="inherit" onClick={themeMode.toggleMode} aria-label="Переключить тему" size="small" sx={{ p: { xs: 0.65, sm: 1 } }}>
        {isLight ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
