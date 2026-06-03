import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
import { publicPath } from '../../utils/publicPath.js';

export default function ServiceCard({ service }) {
  return (
    <Card className="reveal-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia component="img" height="190" image={publicPath(service.image)} alt={service.title} loading="lazy" />
      <CardContent sx={{ flex: 1 }}>
        <Typography component="h3" variant="h6" sx={{ mb: 1, fontWeight: 800 }}>
          {service.title}
        </Typography>
        <Typography color="text.secondary">{service.short}</Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button component={RouterLink} to={service.path} endIcon={<ArrowForwardIcon />} fullWidth>
          Подробнее
        </Button>
      </CardActions>
    </Card>
  );
}
