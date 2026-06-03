import Box from '@mui/material/Box';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer/Footer.jsx';
import Header from '../../components/Header/Header.jsx';
import ScrollToTop from '../../routes/ScrollToTop.jsx';
import Seo from '../../routes/Seo.jsx';

export default function MainLayout() {
  const location = useLocation();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Seo />
      <ScrollToTop />
      <Header />
      <Box component="main" key={location.pathname} className="page-enter">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
