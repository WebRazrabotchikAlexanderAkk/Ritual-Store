import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { publicPath } from '../../utils/publicPath.js';

export default function ImageViewer({ images, open, startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const current = images[index];
  const hasMany = images.length > 1;

  useEffect(() => {
    setIndex(startIndex);
  }, [startIndex, open]);

  useEffect(() => {
    if (!open) return undefined;

    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') setIndex((value) => (value === 0 ? images.length - 1 : value - 1));
      if (event.key === 'ArrowRight') setIndex((value) => (value === images.length - 1 ? 0 : value + 1));
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [images.length, onClose, open]);

  const controls = useMemo(
    () =>
      hasMany ? (
        <>
          <IconButton
            aria-label="Предыдущее изображение"
            onClick={() => setIndex((value) => (value === 0 ? images.length - 1 : value - 1))}
            sx={{ color: 'white' }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            aria-label="Следующее изображение"
            onClick={() => setIndex((value) => (value === images.length - 1 ? 0 : value + 1))}
            sx={{ color: 'white' }}
          >
            <ChevronRightIcon />
          </IconButton>
        </>
      ) : null,
    [hasMany, images.length],
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth PaperProps={{ sx: { bgcolor: 'transparent' } }}>
      <DialogContent sx={{ p: 0, position: 'relative', overflow: 'hidden' }}>
        <IconButton
          aria-label="Закрыть"
          onClick={onClose}
          sx={{ position: 'absolute', top: 10, right: 10, zIndex: 2, bgcolor: 'rgba(0,0,0,0.48)', color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
        {current ? (
          <Box sx={{ bgcolor: 'rgba(0,0,0,0.78)', p: { xs: 1, md: 2 } }}>
            <Box
              component="img"
              src={publicPath(current.image)}
              alt={current.title}
              sx={{ width: '100%', maxHeight: '76vh', objectFit: 'contain' }}
            />
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ color: 'white', p: 1 }}>
              <Typography>{current.title}</Typography>
              <Stack direction="row">{controls}</Stack>
            </Stack>
          </Box>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
