# 11. Файлы данных

## Config

Создать:

- `src/config/siteConfig.js`
- `src/config/requestConfig.js`
- `src/config/notificationMessages.js`
- `src/config/routesConfig.js`
- `src/config/seoConfig.js`

## siteConfig.js

Хранит:
- название компании;
- телефон;
- адрес;
- график работы;
- технические рабочие часы;
- email для заявок;
- Telegram;
- MAX;
- копирайт.

Пример рабочих часов:

```js
workSchedule: 'Пн–Сб: 09:00–18:00',
workHours: {
  days: [1, 2, 3, 4, 5, 6],
  start: '09:00',
  end: '18:00'
}
```

Публичный статус «открыто/закрыто» не показывать. Рабочие часы нужны для предупреждения при отправке заявки вне рабочего времени.

## requestConfig.js

Хранит:
- обязательные поля;
- настройки телефона;
- типы файлов;
- лимит файлов;
- размер файла;
- тексты предупреждений;
- каналы отправки.

## notificationMessages.js

Хранит все тексты уведомлений.

## routesConfig.js

Хранит маршруты сайта и пункты меню.

## Data

Создать:

- `servicesData.js`
- `worksData.js`
- `documentsData.js`
- `faqData.js`
- `reviewsData.js`
- `navigationData.js`
- `workStepsData.js`

## Чек-лист

- [ ] Создать config-файлы.
- [ ] Создать data-файлы.
- [ ] Вынести тексты из компонентов.
- [ ] Вынести маршруты.
- [ ] Вынести уведомления.
- [ ] Вынести SEO.
