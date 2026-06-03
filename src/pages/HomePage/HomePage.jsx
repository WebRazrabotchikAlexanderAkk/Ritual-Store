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
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArticleIcon from '@mui/icons-material/Article';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import VerifiedIcon from '@mui/icons-material/Verified';
import ConstructionIcon from '@mui/icons-material/Construction';
import InventoryIcon from '@mui/icons-material/Inventory';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link as RouterLink } from 'react-router-dom';
import SectionTitle from '../../components/SectionTitle/SectionTitle.jsx';
import { siteConfig } from '../../config/siteConfig.js';
import { routesConfig } from '../../config/routesConfig.js';
import { careTips, clientChecklist, materialGuide, trustHighlights } from '../../data/homeContentData.js';
import { workStepsData } from '../../data/workStepsData.js';
import { publicPath } from '../../utils/publicPath.js';
import WorkSteps from './WorkSteps.jsx';

const linkCards = [
  { label: 'Услуги', path: routesConfig.services, icon: <DesignServicesIcon /> },
  { label: 'Примеры работ', path: routesConfig.works, icon: <PhotoLibraryIcon /> },
  { label: 'Заявка', path: routesConfig.request, icon: <AssignmentIcon /> },
  { label: 'Контакты', path: routesConfig.contacts, icon: <ContactPhoneIcon /> },
];

const highlightIcons = {
  verified: <VerifiedIcon />,
  construction: <ConstructionIcon />,
  inventory: <InventoryIcon />,
  support: <SupportAgentIcon />,
};

export default function HomePage() {
  return (
    <>
      <Box sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="xl" sx={{ py: { xs: 5, md: 8 } }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '2fr 3fr' },
              gap: { xs: 4, md: 6 },
              alignItems: 'center',
            }}
          >
            <Stack spacing={2.5}>
              <Typography component="h1" variant="h2">
                {siteConfig.companyName}
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ lineHeight: 1.45 }}>
                Памятники, гравировка и благоустройство с внимательным отношением к каждому заказу.
              </Typography>
              <Typography variant="h6" color="primary.main" fontWeight={800}>
                {siteConfig.phone}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <Button href={siteConfig.phoneHref} variant="contained" size="large" startIcon={<PhoneIcon />}>
                  Позвонить
                </Button>
                <Button component={RouterLink} to={routesConfig.request} variant="outlined" size="large">
                  Заказать расчёт
                </Button>
              </Stack>
              <Typography color="text.secondary">
                Поможем подобрать памятник, выполнить гравировку, доставку, монтаж и благоустройство места.
              </Typography>
            </Stack>
            <Box
              component="img"
              src={publicPath('/images/site/hero-workshop.png')}
              alt="Мастерская и образцы памятников"
              sx={{
                width: '100%',
                aspectRatio: '16 / 10',
                objectFit: 'cover',
                borderRadius: 2,
                boxShadow: '0 24px 70px rgba(31, 35, 40, 0.18)',
              }}
            />
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 5, md: 8 } }}>
        <SectionTitle
          title="О компании"
          description="Мы занимаемся изготовлением памятников, гравировкой, монтажом и благоустройством. Работаем с типовыми решениями и эксклюзивными заказами любой сложности."
        />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.25fr 0.75fr' }, gap: 3 }}>
          <Card variant="outlined" sx={{ boxShadow: 'none' }}>
            <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
              <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 800 }}>
                Почему клиент получает больше при работе с нашей компанией
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: 18, lineHeight: 1.7 }}>
                Большой ассортимент, индивидуальный подход и аккуратное ведение заказа помогают подобрать решение по
                задаче, а не по шаблону. Мы объясняем этапы, фиксируем договоренности и бережно относимся к деталям.
              </Typography>
            </CardContent>
          </Card>
          <Card variant="outlined" sx={{ boxShadow: 'none' }}>
            <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                <ArticleIcon color="primary" />
                <Typography variant="h6" fontWeight={800}>
                  Документы
                </Typography>
              </Stack>
              <List dense>
                {['Политика обработки персональных данных', 'Реквизиты компании', 'Условия нашего договора', 'Образец нашего договора'].map((item) => (
                  <ListItem key={item} disableGutters>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              <Button component={RouterLink} to={routesConfig.documents} variant="outlined" fullWidth>
                Перейти к документам
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Container>

      <Box sx={{ bgcolor: 'background.paper', py: { xs: 5, md: 8 }, borderTop: 1, borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="xl">
          <SectionTitle
            title="Что важно при выборе"
            description="Мы добавили больше практической информации, чтобы перед звонком было проще понять состав работ и подготовить данные для расчета."
          />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 2 }}>
            {trustHighlights.map((item) => (
              <Card key={item.title} className="reveal-card" variant="outlined" sx={{ boxShadow: 'none' }}>
                <CardContent>
                  <Stack spacing={1.5}>
                    <Box sx={{ color: 'primary.main' }}>{highlightIcons[item.icon]}</Box>
                    <Typography component="h3" variant="h6" fontWeight={800}>
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary">{item.description}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      <Box sx={{ bgcolor: 'background.paper', py: { xs: 5, md: 8 } }}>
        <Container maxWidth="xl">
          <SectionTitle title="Этапы работы" description="Нажмите на этап, чтобы раскрыть подробности." />
          <WorkSteps steps={workStepsData} />
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 5, md: 8 } }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3 }}>
          <Box>
            <SectionTitle title="Материалы и оформление" description="Короткий ориентир по решениям, которые чаще всего обсуждаются при заказе." />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
              {materialGuide.map((item) => (
                <Card key={item.title} variant="outlined" sx={{ boxShadow: 'none' }}>
                  <CardContent>
                    <Typography component="h3" variant="h6" fontWeight={800} sx={{ mb: 1 }}>
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary">{item.description}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
          <Box>
            <SectionTitle title="Что подготовить для заявки" description="Эти данные помогут быстрее получить понятный расчет." />
            <Card variant="outlined" sx={{ boxShadow: 'none', mb: 2 }}>
              <CardContent>
                <List>
                  {clientChecklist.map((item) => (
                    <ListItem key={item} disableGutters>
                      <CheckCircleIcon color="primary" sx={{ mr: 1.5 }} />
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
            <Card variant="outlined" sx={{ boxShadow: 'none' }}>
              <CardContent>
                <Typography component="h3" variant="h6" fontWeight={800} sx={{ mb: 1 }}>
                  Памятка по уходу
                </Typography>
                <List dense>
                  {careTips.map((item) => (
                    <ListItem key={item} disableGutters>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>

      <Container maxWidth="xl" sx={{ py: { xs: 5, md: 8 } }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 2 }}>
          {linkCards.map((card) => (
            <Card key={card.path} className="reveal-card" variant="outlined" sx={{ boxShadow: 'none' }}>
              <CardActionArea component={RouterLink} to={card.path} sx={{ height: '100%' }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Box sx={{ color: 'primary.main' }}>{card.icon}</Box>
                    <Typography variant="h6" fontWeight={800}>
                      {card.label}
                    </Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
        <Stack alignItems="center" sx={{ mt: 4 }}>
          <Button component={RouterLink} to={routesConfig.request} variant="contained" size="large">
            Заказать расчёт
          </Button>
        </Stack>
      </Container>
    </>
  );
}
