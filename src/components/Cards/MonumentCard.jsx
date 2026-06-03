import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { notificationMessages } from '../../config/notificationMessages.js';
import { useAppContext } from '../../context/AppContext.jsx';
import { publicPath } from '../../utils/publicPath.js';

export default function MonumentCard({ item, onOpen }) {
  const { isFavorite, toggleFavorite, notify } = useAppContext();
  const favorite = isFavorite(item.id);

  const handleFavorite = (event) => {
    event.stopPropagation();
    toggleFavorite(item);
    notify(favorite ? notificationMessages.removedFavorite : notificationMessages.addedFavorite);
  };

  return (
    <Card className="reveal-card" sx={{ height: '100%', overflow: 'hidden' }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia component="img" height="220" image={publicPath(item.image)} alt={item.title} loading="lazy" />
        <Tooltip title={favorite ? 'Убрать из избранного' : 'Добавить в избранное'}>
          <IconButton
            onClick={handleFavorite}
            aria-label="Добавить в избранное"
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              bgcolor: 'background.paper',
              color: favorite ? 'secondary.main' : 'text.primary',
              '&:hover': { bgcolor: 'background.paper' },
            }}
          >
            {favorite ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      <CardContent>
        <Typography component="h3" variant="h6" sx={{ fontWeight: 800 }}>
          {item.title}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          {item.material}
        </Typography>
        <Typography sx={{ mt: 1.5 }}>{item.description}</Typography>
        <Button sx={{ mt: 2 }} onClick={() => onOpen(item)} variant="outlined" fullWidth>
          Смотреть
        </Button>
      </CardContent>
    </Card>
  );
}
