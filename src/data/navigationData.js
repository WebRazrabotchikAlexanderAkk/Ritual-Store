import { routesConfig } from '../config/routesConfig.js';

export const navigationData = [
  { label: 'Главная', path: routesConfig.home },
  { label: 'Услуги', path: routesConfig.services },
  { label: 'Примеры работ', path: routesConfig.works },
  { label: 'Заявка', path: routesConfig.request },
  { label: 'Документы', path: routesConfig.documents },
  { label: 'Вопросы и ответы', path: routesConfig.faq },
  { label: 'Отзывы', path: routesConfig.reviews },
  { label: 'Контакты', path: routesConfig.contacts },
];
