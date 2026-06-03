import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import { Link as RouterLink } from 'react-router-dom';
import { routesConfig } from '../../config/routesConfig.js';
import { siteConfig } from '../../config/siteConfig.js';
import { notificationMessages } from '../../config/notificationMessages.js';
import { useAppContext } from '../../context/AppContext.jsx';
import { publicPath } from '../../utils/publicPath.js';

export default function MonumentModal({ item, onClose }) {
  const { addFavorite, notify } = useAppContext();

  if (!item) return null;

  const handleFavorite = () => {
    addFavorite(item);
    notify(notificationMessages.addedFavorite);
  };

  return (
    <Dialog open={Boolean(item)} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{item.title}</DialogTitle>
      <DialogContent>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <img src={publicPath(item.image)} alt={item.title} loading="lazy" style={{ width: '100%', maxWidth: 430, borderRadius: 8 }} />
          <Stack spacing={1.5}>
            <Typography color="text.secondary">{item.category}</Typography>
            <Typography>
              <b>Материал:</b> {item.material}
            </Typography>
            <Typography>{item.description}</Typography>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, flexWrap: 'wrap' }}>
        <Button onClick={handleFavorite} startIcon={<StarIcon />}>
          Добавить в избранное
        </Button>
        <Button component={RouterLink} to={routesConfig.request} variant="contained">
          Заказать расчёт
        </Button>
        <Button href={siteConfig.phoneHref} variant="outlined">
          Позвонить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
