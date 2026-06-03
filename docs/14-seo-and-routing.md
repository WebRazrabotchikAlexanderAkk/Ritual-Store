# 14. SEO и маршруты

## React Router

Использовать React Router.

## Маршруты

```text
/
 /services
 /services/monument-making
 /services/monument-installation
 /services/grave-improvement
 /services/engraving
 /services/monument-photo
 /services/ritual-goods
 /services/grave-care
 /services/delivery-installation
 /works
 /request
 /favorites
 /documents
 /faq
 /reviews
 /contacts
 *
```

`*` ведёт на страницу 404.

## 404

Страница содержит:
- «Страница не найдена»;
- «Такой страницы нет или ссылка была изменена.»;
- кнопку «На главную»;
- кнопку «Перейти к услугам»;
- телефон компании.

Отдельный SEO-конфиг для 404 не нужен.

## SEO

Для страниц:
- title;
- description;
- один H1;
- H2/H3;
- человекопонятные URL.

## Open Graph

В первой версии не делать.

## Хлебные крошки

В первой версии не делать.

## Чек-лист

- [ ] Подключить React Router.
- [ ] Создать routesConfig.
- [ ] Создать seoConfig.
- [ ] Создать 404.
- [ ] Проверить H1.
- [ ] Добавить title/description.
- [ ] Не добавлять Open Graph.
- [ ] Не добавлять хлебные крошки.
