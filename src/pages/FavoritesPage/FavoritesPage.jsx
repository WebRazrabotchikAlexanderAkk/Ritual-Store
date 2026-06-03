import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { routesConfig } from '../../config/routesConfig.js';
import { requestConfig } from '../../config/requestConfig.js';
import { notificationMessages } from '../../config/notificationMessages.js';
import { useAppContext } from '../../context/AppContext.jsx';
import { publicPath } from '../../utils/publicPath.js';

export default function FavoritesPage() {
  const { favorites, removeFavorite, clearFavorites, notify } = useAppContext();
  const [selected, setSelected] = useState(() => favorites.map((item) => item.id));
  const navigate = useNavigate();

  const selectedItems = useMemo(() => favorites.filter((item) => selected.includes(item.id)), [favorites, selected]);

  const toggle = (id) => {
    setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const sendToRequest = () => {
    window.localStorage.setItem(requestConfig.storageKeys.selectedItems, JSON.stringify(selectedItems));
    notify(notificationMessages.selectedForRequest);
    navigate(routesConfig.request);
  };

  const handleClear = () => {
    if (window.confirm('Вы уверены, что хотите очистить избранное?')) {
      clearFavorites();
      notify(notificationMessages.clearedFavorites);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 5, md: 8 } }}>
      <Typography component="h1" variant="h2" sx={{ mb: 2 }}>
        Избранное
      </Typography>
      {!favorites.length ? (
        <Card variant="outlined" sx={{ boxShadow: 'none' }}>
          <CardContent>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Пока здесь нет сохранённых памятников и работ.
            </Typography>
            <Button component={RouterLink} to={routesConfig.works} variant="contained">
              Перейти к примерам работ
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 3 }}>
            <Button onClick={sendToRequest} startIcon={<SendIcon />} variant="contained" disabled={!selectedItems.length}>
              Отправить выбранное в заявку
            </Button>
            <Button onClick={handleClear} startIcon={<DeleteIcon />} color="error" variant="outlined">
              Очистить избранное
            </Button>
          </Stack>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2.5 }}>
            {favorites.map((item) => (
              <Card key={item.id} variant="outlined" sx={{ boxShadow: 'none' }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '180px 1fr' } }}>
                  <Box component="img" src={publicPath(item.image)} alt={item.title} loading="lazy" sx={{ height: 180, width: '100%', objectFit: 'cover' }} />
                  <CardContent>
                    <Typography variant="h6" fontWeight={800}>
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary">{item.category}</Typography>
                    <Typography sx={{ my: 1 }}>{item.description}</Typography>
                    <FormControlLabel
                      control={<Checkbox checked={selected.includes(item.id)} onChange={() => toggle(item.id)} />}
                      label="Добавить к заявке"
                    />
                    <Button color="error" onClick={() => removeFavorite(item.id)}>
                      Удалить
                    </Button>
                  </CardContent>
                </Box>
              </Card>
            ))}
          </Box>
        </>
      )}
    </Container>
  );
}
