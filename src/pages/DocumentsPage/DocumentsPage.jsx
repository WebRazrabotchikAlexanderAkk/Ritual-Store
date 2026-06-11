import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { documentsData } from '../../data/documentsData.js';
import { notificationMessages } from '../../config/notificationMessages.js';
import { useAppContext } from '../../context/AppContext.jsx';
import { publicPath } from '../../utils/publicPath.js';

export default function DocumentsPage() {
  const { notify } = useAppContext();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
      <Typography component="h1" variant="h2" sx={{ mb: 2 }}>
        Документы
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4, fontSize: 18 }}>
        Документы представлены для предварительного ознакомления. Актуальные условия, порядок работ и детали договора
        уточняются у специалиста компании.
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
        {documentsData.map((document) => (
          <Card key={`${document.title}-${document.format}`} variant="outlined" sx={{ boxShadow: 'none' }}>
            <CardContent>
              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <DescriptionIcon color="primary" />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight={800}>
                    {document.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {document.format}
                  </Typography>
                  {document.available ? (
                    <Button
                      href={publicPath(document.href)}
                      target={document.download ? undefined : '_blank'}
                      rel={document.download ? undefined : 'noreferrer'}
                      download={document.download}
                      variant="outlined"
                      startIcon={document.download ? <DownloadIcon /> : <OpenInNewIcon />}
                      onClick={() => document.download && notify(notificationMessages.documentDownload)}
                    >
                      {document.action}
                    </Button>
                  ) : (
                    <Stack spacing={1} alignItems="flex-start">
                      <Chip label="Готовится к запуску" variant="outlined" color="warning" />
                      <Typography color="text.secondary">Файл будет добавлен перед запуском.</Typography>
                    </Stack>
                  )}
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
