import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSeoConfig } from '../config/seoConfig.js';

export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getSeoConfig(pathname);
    document.title = seo.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', seo.description);
    }
  }, [pathname]);

  return null;
}
