import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PhoneIcon from '@mui/icons-material/Phone';
import { siteConfig } from '../../config/siteConfig.js';

export default function CallAction({
  title = 'Есть вопросы? Позвоните, подскажем простыми словами',
  description = 'Спокойно объясним варианты, поможем с ценой и подскажем, какие данные подготовить для заказа.',
}) {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: 'background.paper',
        borderTop: 1,
        borderBottom: 1,
        borderColor: 'divider',
        py: { xs: 3, md: 4 },
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', md: 'center' }}
          justifyContent="space-between"
        >
          <Box>
            <Typography color="primary.main" fontWeight={800} sx={{ mb: 0.5 }}>
              Консультация по телефону
            </Typography>
            <Typography component="h2" variant="h5" fontWeight={800}>
              {title}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 680, fontSize: 18, lineHeight: 1.55 }}>
              {description}
            </Typography>
          </Box>
          <Stack spacing={0.75} alignItems={{ xs: 'stretch', md: 'flex-end' }} sx={{ flexShrink: 0 }}>
            <Button
              href={siteConfig.phoneHref}
              variant="contained"
              size="large"
              startIcon={<PhoneIcon />}
              aria-label={`Позвонить ${siteConfig.phone}`}
            >
              Позвонить
            </Button>
            <Typography
              component="a"
              href={siteConfig.phoneHref}
              variant="h6"
              color="primary.main"
              fontWeight={800}
              sx={{ textAlign: { xs: 'center', md: 'right' } }}
            >
              {siteConfig.phone}
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
