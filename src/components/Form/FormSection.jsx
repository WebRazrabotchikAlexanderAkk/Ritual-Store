import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function FormSection({ title, children }) {
  return (
    <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, borderRadius: 2 }}>
      <Stack spacing={2}>
        <Typography component="h2" variant="h5" sx={{ fontWeight: 800 }}>
          {title}
        </Typography>
        {children}
      </Stack>
    </Paper>
  );
}
