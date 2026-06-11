import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import { Link as RouterLink } from 'react-router-dom';
import MonumentCard from '../../components/Cards/MonumentCard.jsx';
import ImageViewer from '../../components/Gallery/ImageViewer.jsx';
import MonumentModal from '../../components/Modal/MonumentModal.jsx';
import SectionTitle from '../../components/SectionTitle/SectionTitle.jsx';
import { routesConfig } from '../../config/routesConfig.js';
import { notificationMessages } from '../../config/notificationMessages.js';
import { useAppContext } from '../../context/AppContext.jsx';
import { monumentsData } from '../../data/monumentsData.js';
import { worksData } from '../../data/worksData.js';
import { publicPath } from '../../utils/publicPath.js';
import { scrollToSection } from '../../utils/scrollToSection.js';

export default function WorksPage() {
  const [modalItem, setModalItem] = useState(null);
  const [viewer, setViewer] = useState({ open: false, images: [], index: 0 });
  const { addFavorite, notify } = useAppContext();

  const openViewer = (images, index = 0) => setViewer({ open: true, images, index });

  const handleEngravingFavorite = () => {
    addFavorite(worksData.engraving);
    notify(notificationMessages.addedFavorite);
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 5, md: 8 } }}>
      <Typography component="h1" variant="h2" sx={{ mb: 2 }}>
        Примеры работ
      </Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 820, fontSize: 18, mb: 3 }}>
        Витрина памятников, благоустройство, процесс изготовления и примеры гравировки без цен и лишних меток.
      </Typography>

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 5 }}>
        {[
          ['Витрина памятников', 'monuments'],
          ['Благоустройство', 'improvement'],
          ['Изготовление памятника', 'making'],
          ['Наша гравировка', 'engraving'],
          ['Примеры Керамогранита', 'porcelain'],
          ['Детали и уход', 'care'],
        ].map(([label, id]) => (
          <Button key={id} variant="outlined" onClick={() => scrollToSection(id)}>
            {label}
          </Button>
        ))}
      </Stack>

      <Box id="monuments" sx={{ scrollMarginTop: 100 }}>
        <SectionTitle title="Витрина памятников" description="Карточки открывают подробный просмотр. Понравившиеся варианты можно сохранить." />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 2.5 }}>
          {monumentsData.map((item) => (
            <MonumentCard key={item.id} item={item} onOpen={setModalItem} />
          ))}
        </Box>
      </Box>

      <Box id="improvement" sx={{ mt: 8, scrollMarginTop: 100 }}>
        <SectionTitle title="Благоустройство" />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2.5 }}>
          {worksData.improvement.map((work, index) => (
            <Card key={work.title} className="reveal-card">
              <Box
                component="img"
                src={publicPath(work.image)}
                alt={work.title}
                loading="lazy"
                onClick={() => openViewer(worksData.improvement, index)}
                sx={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', cursor: 'pointer' }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight={800}>
                  {work.title}
                </Typography>
                <Typography color="text.secondary">{work.description}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <Box id="making" sx={{ mt: 8, scrollMarginTop: 100 }}>
        <SectionTitle title="Наши работы по изготовлению памятника" />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 2.5 }}>
          {worksData.makingProcess.map((step, index) => (
            <Card key={step.title} className="reveal-card">
              <Box
                component="img"
                src={publicPath(step.image)}
                alt={step.title}
                loading="lazy"
                onClick={() => openViewer(worksData.makingProcess, index)}
                sx={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', cursor: 'pointer' }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight={800}>
                  {step.title}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <Box id="engraving" sx={{ mt: 8, scrollMarginTop: 100 }}>
        <Card className="reveal-card">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' } }}>
            <Box
              component="img"
              src={publicPath(worksData.engraving.image)}
              alt={worksData.engraving.title}
              loading="lazy"
              onClick={() => openViewer([worksData.engraving])}
              sx={{ width: '100%', height: '100%', minHeight: 320, objectFit: 'cover', cursor: 'pointer' }}
            />
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Typography component="h2" variant="h3" sx={{ mb: 2 }}>
                Наша гравировка
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Ретушь, перенос изображения на памятник и аккуратная проверка результата перед завершением работы.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <Button onClick={handleEngravingFavorite} startIcon={<StarIcon />} variant="outlined">
                  Добавить в избранное
                </Button>
                <Button component={RouterLink} to={routesConfig.request} variant="contained">
                  Заказать памятник на странице заявки
                </Button>
              </Stack>
            </CardContent>
          </Box>
        </Card>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2.5, mt: 2.5 }}>
          {worksData.engravingGallery.map((work, index) => (
            <Card key={work.title} className="reveal-card">
              <Box
                component="img"
                src={publicPath(work.image)}
                alt={work.title}
                loading="lazy"
                onClick={() => openViewer(worksData.engravingGallery, index)}
                sx={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', cursor: 'pointer' }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight={800}>
                  {work.title}
                </Typography>
                <Typography color="text.secondary">{work.description}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <Box id="porcelain" sx={{ mt: 8, scrollMarginTop: 100 }}>
        <SectionTitle
          title="Примеры Керамогранита"
          description="Варианты портретных плит и декоративных решений, которые можно согласовать по размеру и способу установки."
        />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 2.5 }}>
          {worksData.porcelainGallery.map((work, index) => (
            <Card key={work.title} className="reveal-card" data-testid="porcelain-example-card">
              <Box
                component="img"
                src={publicPath(work.image)}
                alt={work.title}
                loading="lazy"
                onClick={() => openViewer(worksData.porcelainGallery, index)}
                sx={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', cursor: 'pointer' }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight={800}>
                  {work.title}
                </Typography>
                <Typography color="text.secondary">{work.description}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <Box id="care" sx={{ mt: 8, scrollMarginTop: 100 }}>
        <SectionTitle
          title="Детали и уход"
          description="Небольшие элементы часто влияют на общий вид не меньше, чем сам памятник: чистота, основание, цветник, бордюр и аккуратная линия мощения."
        />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
          {[
            ['Основание', 'Проверяем уровень, устойчивость и состояние участка перед монтажом.'],
            ['Цветник', 'Подбираем форму и материалы так, чтобы за участком было проще ухаживать.'],
            ['Сезонный уход', 'Чистка, подсыпка, аккуратная уборка и проверка элементов после зимы.'],
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
      </Box>

      <MonumentModal item={modalItem} onClose={() => setModalItem(null)} />
      <ImageViewer images={viewer.images} open={viewer.open} startIndex={viewer.index} onClose={() => setViewer({ ...viewer, open: false })} />
    </Container>
  );
}
