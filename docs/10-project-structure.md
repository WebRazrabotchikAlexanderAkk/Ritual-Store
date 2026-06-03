# 10. Структура проекта

## Стек

- React
- Vite
- JavaScript
- Material UI
- React Router
- localStorage

## Папки

```text
src/
  assets/
    images/

  components/
    Header/
    Footer/
    Cards/
    Gallery/
    Modal/
    Form/
    Notifications/
    ThemeToggle/
    FavoritesButton/
    SectionTitle/

  pages/
    HomePage/
    ServicesPage/
    ServiceDetailPage/
    WorksPage/
    RequestPage/
    FavoritesPage/
    DocumentsPage/
    FaqPage/
    ReviewsPage/
    ContactsPage/
    NotFoundPage/

  layouts/
    MainLayout/

  data/
    servicesData.js
    worksData.js
    monumentsData.js
    documentsData.js
    faqData.js
    reviewsData.js
    navigationData.js
    workStepsData.js

  config/
    siteConfig.js
    requestConfig.js
    notificationMessages.js
    routesConfig.js
    seoConfig.js

  hooks/
    useLocalStorage.js
    useFavorites.js
    useThemeMode.js
    useRequestForm.js

  utils/
    phoneFormat.js
    fileValidation.js
    requestSender.js
    scrollToSection.js
    workHours.js

  theme/
    lightTheme.js
    darkTheme.js
    index.js

  routes/
    AppRouter.jsx

  App.jsx
  main.jsx
```

## Контент

Первая версия без админ-панели. Весь контент редактируется через файлы данных в коде.

## Чек-лист

- [ ] Создать проект Vite.
- [ ] Установить Material UI.
- [ ] Установить React Router.
- [ ] Создать структуру папок.
- [ ] Создать config.
- [ ] Создать data.
- [ ] Создать hooks.
- [ ] Создать utils.
- [ ] Создать pages.
- [ ] Создать components.
