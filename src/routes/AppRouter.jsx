import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout/MainLayout.jsx';
import HomePage from '../pages/HomePage/HomePage.jsx';
import ServicesPage from '../pages/ServicesPage/ServicesPage.jsx';
import ServiceDetailPage from '../pages/ServiceDetailPage/ServiceDetailPage.jsx';
import WorksPage from '../pages/WorksPage/WorksPage.jsx';
import RequestPage from '../pages/RequestPage/RequestPage.jsx';
import FavoritesPage from '../pages/FavoritesPage/FavoritesPage.jsx';
import DocumentsPage from '../pages/DocumentsPage/DocumentsPage.jsx';
import FaqPage from '../pages/FaqPage/FaqPage.jsx';
import ReviewsPage from '../pages/ReviewsPage/ReviewsPage.jsx';
import ContactsPage from '../pages/ContactsPage/ContactsPage.jsx';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage.jsx';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/request" element={<RequestPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
