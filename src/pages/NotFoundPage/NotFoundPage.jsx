import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { routesConfig } from '../../config/routesConfig.js';
import { siteConfig } from '../../config/siteConfig.js';

export default function NotFoundPage() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
      <Typography component="h1" variant="h2" sx={{ mb: 2 }}>
        Страница не найдена
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Такой страницы нет или ссылка была изменена.
      </Typography>
      <Typography color="primary.main" fontWeight={800} sx={{ mb: 4 }}>
        {siteConfig.phone}
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center">
        <Button component={RouterLink} to={routesConfig.home} variant="contained">
          На главную
        </Button>
        <Button component={RouterLink} to={routesConfig.services} variant="outlined">
          Перейти к услугам
        </Button>
      </Stack>
    </Container>
  );
}
