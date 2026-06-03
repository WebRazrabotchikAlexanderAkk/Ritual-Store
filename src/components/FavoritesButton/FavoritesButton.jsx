import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import StarIcon from '@mui/icons-material/Star';
import { Link as RouterLink } from 'react-router-dom';
import { routesConfig } from '../../config/routesConfig.js';
import { useAppContext } from '../../context/AppContext.jsx';

export default function FavoritesButton() {
  const { favoriteCount } = useAppContext();

  return (
    <Tooltip title="Избранное">
      <IconButton component={RouterLink} to={routesConfig.favorites} color="inherit" aria-label="Избранное" size="small" sx={{ p: { xs: 0.65, sm: 1 } }}>
        <Badge badgeContent={favoriteCount} color="error">
          <StarIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
}
