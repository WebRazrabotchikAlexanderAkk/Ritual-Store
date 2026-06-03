import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import { navigationData } from '../../data/navigationData.js';
import { routesConfig } from '../../config/routesConfig.js';
import { siteConfig } from '../../config/siteConfig.js';
import FavoritesButton from '../FavoritesButton/FavoritesButton.jsx';
import ThemeToggle from '../ThemeToggle/ThemeToggle.jsx';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: 'divider', backdropFilter: 'blur(16px)' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 66, md: 76 }, gap: { xs: 0.25, sm: 1, md: 1.5 } }}>
          <Typography
            component={RouterLink}
            to={routesConfig.home}
            variant="h6"
            sx={{
              fontWeight: 800,
              color: 'primary.main',
              mr: { md: 3 },
              flexShrink: 0,
              maxWidth: { xs: 112, sm: 'none' },
              fontSize: { xs: 15, sm: 20 },
              lineHeight: { xs: 1.05, sm: 1.2 },
            }}
          >
            {siteConfig.companyName}
          </Typography>

          <Stack
            component="nav"
            direction="row"
            spacing={0.5}
            sx={{ display: { xs: 'none', lg: 'flex' }, flex: 1 }}
          >
            {navigationData.map((item) => (
              <Button
                key={item.path}
                component={NavLink}
                to={item.path}
                color="inherit"
                sx={{
                  px: 1.2,
                  '&.active': { color: 'primary.main', bgcolor: 'action.hover' },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>

          <Box sx={{ flex: 1, display: { xs: 'block', lg: 'none' } }} />

          <Button
            href={siteConfig.phoneHref}
            color="primary"
            startIcon={<PhoneIcon />}
            sx={{ display: { xs: 'none', sm: 'inline-flex' }, flexShrink: 0 }}
          >
            {siteConfig.phone}
          </Button>
          <IconButton
            href={siteConfig.phoneHref}
            color="primary"
            size="small"
            sx={{ display: { xs: 'inline-flex', sm: 'none' }, p: { xs: 0.65, sm: 1 } }}
          >
            <PhoneIcon />
          </IconButton>
          <IconButton
            component={RouterLink}
            to={routesConfig.request}
            color="primary"
            aria-label="Заявка"
            size="small"
            sx={{ p: { xs: 0.65, sm: 1 } }}
          >
            <AssignmentIcon />
          </IconButton>
          <ThemeToggle />
          <FavoritesButton />
          <IconButton
            onClick={() => setOpen(true)}
            size="small"
            sx={{ display: { lg: 'none' }, p: { xs: 0.65, sm: 1 } }}
            aria-label="Открыть меню"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 300, pt: 2 }}>
          <List>
            {navigationData.map((item) => (
              <ListItemButton key={item.path} component={RouterLink} to={item.path} onClick={() => setOpen(false)}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
