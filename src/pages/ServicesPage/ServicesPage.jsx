import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SectionTitle from '../../components/SectionTitle/SectionTitle.jsx';
import ServiceCard from '../../components/Cards/ServiceCard.jsx';
import WorkSteps from '../HomePage/WorkSteps.jsx';
import { servicesData } from '../../data/servicesData.js';
import { workStepsData } from '../../data/workStepsData.js';

export default function ServicesPage() {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 5, md: 8 } }}>
      <Typography component="h1" variant="h2" sx={{ mb: 2 }}>
        Услуги
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 780, fontSize: 18 }}>
        Основные направления работ: изготовление и установка памятников, гравировка, благоустройство, уход и доставка.
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 2.5 }}>
        {servicesData.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </Box>
      <Box sx={{ mt: { xs: 5, md: 8 } }}>
        <SectionTitle
          title="Как выбрать услугу"
          description="Если вы не уверены, какой раздел подходит, можно оставить заявку с описанием ситуации. Специалист подскажет состав работ и последовательность."
        />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
          {[
            {
              title: 'Нужен памятник с нуля',
              text: 'Начните с изготовления памятника, затем уточните установку, гравировку, доставку и оформление участка.',
            },
            {
              title: 'Место уже оформлено частично',
              text: 'Подойдут монтаж, гравировка, цветник, плитка, бордюр, уход или замена отдельных элементов.',
            },
            {
              title: 'Нужно привести участок в порядок',
              text: 'Выберите благоустройство или уход: чистка, выравнивание, подсыпка, растения, проверка состояния.',
            },
          ].map((item) => (
            <Card key={item.title} variant="outlined" sx={{ boxShadow: 'none' }}>
              <CardContent>
                <Typography component="h2" variant="h6" fontWeight={800} sx={{ mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography color="text.secondary">{item.text}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
      <Box sx={{ mt: { xs: 5, md: 8 } }}>
        <SectionTitle title="Этапы работы" description="Порядок взаимодействия одинаково понятен для небольших и комплексных заказов." />
        <WorkSteps steps={workStepsData} />
      </Box>
    </Container>
  );
}
