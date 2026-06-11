import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { siteConfig } from '../../config/siteConfig.js';

export default function Footer() {
  return (
    <Box component="footer" sx={{ borderTop: 1, borderColor: 'divider', py: 4, mt: 8 }}>
      <Container maxWidth="xl">
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} justifyContent="space-between">
          <Typography fontWeight={800}>{siteConfig.companyName}</Typography>
          <Typography component="a" href={siteConfig.phoneHref} color="primary.main" fontWeight={800}>
            {siteConfig.phone}
          </Typography>
          <Typography color="text.secondary">{siteConfig.address}</Typography>
          <Typography color="text.secondary">{siteConfig.workSchedule}</Typography>
          <Typography color="text.secondary">{siteConfig.copyright}</Typography>
        </Stack>
      </Container>
    </Box>
  );
}
