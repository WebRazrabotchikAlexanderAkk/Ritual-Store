import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PhoneIcon from '@mui/icons-material/Phone';
import { Link as RouterLink } from 'react-router-dom';
import ImageViewer from '../../components/Gallery/ImageViewer.jsx';
import { siteConfig } from '../../config/siteConfig.js';
import { routesConfig } from '../../config/routesConfig.js';
import { publicPath } from '../../utils/publicPath.js';

const officeImages = [
  { title: 'Офис и мастерская', image: '/images/office/slider/office-slider-01.png' },
  { title: 'Образцы работ', image: '/images/site/hero-workshop.png' },
];

export default function ContactsPage() {
  const [viewer, setViewer] = useState({ open: false, index: 0 });

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 5, md: 8 } }}>
      <Typography component="h1" variant="h2" sx={{ mb: 4 }}>
        Контакты
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '0.9fr 1.1fr' }, gap: 3 }}>
        <Card variant="outlined" sx={{ boxShadow: 'none' }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Stack spacing={2}>
              <Typography variant="h5" fontWeight={800}>
                {siteConfig.companyName}
              </Typography>
              <Typography>{siteConfig.phone}</Typography>
              <Typography>{siteConfig.address}</Typography>
              <Typography>{siteConfig.workSchedule}</Typography>
              <Typography color="text.secondary">Перед приездом можно позвонить и уточнить детали.</Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <Button href={siteConfig.phoneHref} startIcon={<PhoneIcon />} variant="contained">
                  Позвонить
                </Button>
                <Button component={RouterLink} to={routesConfig.request} variant="outlined">
                  Заказать расчёт
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
        <Card variant="outlined" sx={{ minHeight: 320, boxShadow: 'none', overflow: 'hidden' }}>
          <Box
            sx={{
              height: '100%',
              minHeight: 320,
              display: 'grid',
              placeItems: 'center',
              bgcolor: 'background.paper',
              backgroundImage:
                'linear-gradient(135deg, rgba(123,36,50,0.12), rgba(165,123,52,0.1)), repeating-linear-gradient(45deg, transparent 0, transparent 16px, rgba(0,0,0,0.035) 17px, rgba(0,0,0,0.035) 18px)',
            }}
          >
            <Typography variant="h5" fontWeight={800}>
              Карта проезда
            </Typography>
          </Box>
        </Card>
      </Box>

      <Typography component="h2" variant="h3" sx={{ mt: 6, mb: 3 }}>
        Фотографии офиса
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
        {officeImages.map((image, index) => (
          <Box
            key={image.title}
            component="img"
            src={publicPath(image.image)}
            alt={image.title}
            loading="lazy"
            onClick={() => setViewer({ open: true, index })}
            sx={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: 2, cursor: 'pointer' }}
          />
        ))}
      </Box>
      <ImageViewer images={officeImages} open={viewer.open} startIndex={viewer.index} onClose={() => setViewer({ ...viewer, open: false })} />
    </Container>
  );
}
