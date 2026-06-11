import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PhoneIcon from '@mui/icons-material/Phone';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { servicesData } from '../../data/servicesData.js';
import { siteConfig } from '../../config/siteConfig.js';
import { routesConfig } from '../../config/routesConfig.js';
import { publicPath } from '../../utils/publicPath.js';
import NotFoundPage from '../NotFoundPage/NotFoundPage.jsx';

const relatedServiceIds = {
  'monument-making': ['monument-installation', 'engraving', 'delivery-installation'],
  'monument-installation': ['delivery-installation', 'grave-improvement', 'monument-making'],
  'grave-improvement': ['grave-care', 'delivery-installation', 'monument-installation'],
  engraving: ['monument-photo', 'porcelain-stoneware', 'monument-making'],
  'monument-photo': ['engraving', 'porcelain-stoneware', 'monument-making'],
  'porcelain-stoneware': ['monument-photo', 'engraving', 'monument-making'],
  'ritual-goods': ['grave-improvement', 'grave-care', 'delivery-installation'],
  'grave-care': ['grave-improvement', 'ritual-goods', 'delivery-installation'],
  'delivery-installation': ['monument-installation', 'monument-making', 'grave-improvement'],
};

function getRelatedServices(serviceId) {
  const ids = relatedServiceIds[serviceId] || [];
  return ids.map((id) => servicesData.find((item) => item.id === id)).filter(Boolean);
}

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  const service = servicesData.find((item) => item.id === serviceId);

  if (!service) return <NotFoundPage />;

  const relatedServices = getRelatedServices(service.id);

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 5, md: 8 } }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <Stack spacing={2}>
          <Typography component="h1" variant="h2">
            {service.title}
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: 18 }}>
            {service.short}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <Button href={siteConfig.phoneHref} variant="contained" startIcon={<PhoneIcon />}>
              Позвонить
            </Button>
            <Button component={RouterLink} to={routesConfig.request} variant="outlined">
              Заказать расчёт
            </Button>
          </Stack>
        </Stack>
        <Box component="img" src={publicPath(service.image)} alt={service.title} sx={{ borderRadius: 2, aspectRatio: '4 / 3', objectFit: 'cover' }} />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mt: 5 }}>
        <Card variant="outlined" sx={{ boxShadow: 'none' }}>
          <CardContent>
            <Typography component="h2" variant="h5" fontWeight={800}>
              Что входит в услугу
            </Typography>
            <List>
              {service.details.map((detail) => (
                <ListItem key={detail} disableGutters>
                  <ListItemText primary={detail} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
        <Card variant="outlined" sx={{ boxShadow: 'none' }}>
          <CardContent>
            <Typography component="h2" variant="h5" fontWeight={800} sx={{ mb: 2 }}>
              Важные детали для клиента
            </Typography>
            <Typography color="text.secondary">
              {service.important ||
                'Для точного расчета лучше подготовить фото места работ, примерные размеры, желаемые сроки и пожелания по материалу. Итоговые условия уточняются специалистом.'}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ mt: 3, display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
        {[
          ['Что влияет на срок', 'Сезон, наличие материала, сложность формы, готовность места и правила кладбища.'],
          ['Что влияет на состав работ', 'Размер участка, состояние основания, необходимость доставки, монтаж и дополнительные элементы.'],
          ['Как ускорить расчет', 'Приложите фото, город, кладбище, размеры и примеры работ, которые вам нравятся.'],
        ].map(([title, text]) => (
          <Card key={title} variant="outlined" sx={{ boxShadow: 'none' }}>
            <CardContent>
              <Typography component="h2" variant="h6" fontWeight={800} sx={{ mb: 1 }}>
                {title}
              </Typography>
              <Typography color="text.secondary">{text}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Card variant="outlined" sx={{ mt: 3, boxShadow: 'none' }}>
        <CardContent>
          <Typography component="h2" variant="h5" fontWeight={800} sx={{ mb: 2 }}>
            Связанные услуги
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
            {relatedServices.map((related) => (
              <Card key={related.id} variant="outlined" sx={{ boxShadow: 'none' }}>
                <CardActionArea component={RouterLink} to={related.path} sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography component="h3" variant="h6" fontWeight={800} sx={{ mb: 1 }}>
                      {related.title}
                    </Typography>
                    <Typography color="text.secondary">{related.short}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
