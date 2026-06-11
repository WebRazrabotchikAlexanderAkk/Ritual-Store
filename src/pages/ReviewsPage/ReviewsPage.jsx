import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PhoneIcon from '@mui/icons-material/Phone';
import { Link as RouterLink } from 'react-router-dom';
import ImageViewer from '../../components/Gallery/ImageViewer.jsx';
import { routesConfig } from '../../config/routesConfig.js';
import { siteConfig } from '../../config/siteConfig.js';
import { reviewsData } from '../../data/reviewsData.js';
import { publicPath } from '../../utils/publicPath.js';

export default function ReviewsPage() {
  const [viewer, setViewer] = useState({ open: false, index: 0 });

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
      <Typography component="h1" variant="h2" sx={{ mb: 4 }}>
        Отзывы
      </Typography>
      <Stack spacing={3}>
        {reviewsData.map((review, index) => (
          <Card key={`${review.name}-${review.date}`} component="article">
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.85fr 1.15fr' } }}>
              <Box
                component="img"
                src={publicPath(review.photo)}
                alt={`Фото работы: ${review.name}`}
                loading="lazy"
                onClick={() => setViewer({ open: true, index })}
                sx={{ width: '100%', height: '100%', minHeight: 300, objectFit: 'cover', cursor: 'pointer' }}
              />
              <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                <Stack spacing={1.5}>
                  <Typography component="h2" variant="h4">
                    {review.name}, {review.city}
                  </Typography>
                  <Typography color="text.secondary">{review.date}</Typography>
                  <Rating value={review.rating} readOnly />
                  <Typography sx={{ fontSize: 18, lineHeight: 1.7 }}>{review.text}</Typography>
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
            </Box>
          </Card>
        ))}
      </Stack>
      <ImageViewer
        images={reviewsData.map((review) => ({ title: `${review.name}, ${review.city}`, image: review.photo }))}
        open={viewer.open}
        startIndex={viewer.index}
        onClose={() => setViewer({ ...viewer, open: false })}
      />
    </Container>
  );
}
