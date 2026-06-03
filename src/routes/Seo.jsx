import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { seoConfig } from '../config/seoConfig.js';

export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = seoConfig[pathname] || seoConfig['/'];
    document.title = seo.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', seo.description);
    }
  }, [pathname]);

  return null;
}
