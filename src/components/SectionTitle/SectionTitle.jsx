import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function SectionTitle({ title, description, align = 'left' }) {
  return (
    <Box sx={{ mb: { xs: 3, md: 4 }, textAlign: align }}>
      <Typography component="h2" variant="h3" sx={{ mb: description ? 1 : 0 }}>
        {title}
      </Typography>
      {description ? (
        <Typography color="text.secondary" sx={{ maxWidth: 760, mx: align === 'center' ? 'auto' : 0, fontSize: 18 }}>
          {description}
        </Typography>
      ) : null}
    </Box>
  );
}
