# 13. Изображения и assets

## Подход

В первой версии можно использовать заглушки, позже заменить на реальные изображения.

## Формат

Основной формат:
- WebP

## Lazy loading

Использовать:

```html
loading="lazy"
```

## Версии

Пока использовать одно оптимизированное изображение и для карточки, и для полного просмотра.

Не делать:
- `-thumb`
- `-full`

## Структура изображений

```text
images/
  services/
    monument-making/
    monument-installation/
    grave-improvement/
    engraving/
    monument-photo/
    ritual-goods/
    grave-care/
    delivery-installation/

  monuments/
    single/
    double/
    complexes/
    exclusive/
    making-process/

  improvement/
    paving/
    fences/
    flower-beds/
    grave-design/
    cleaning-care/

  engraving/
    retouch/
    on-monument/
    cards/

  office/
    slider/
    exterior/
    interior/

  reviews/
```

## Имена файлов

Правила:
- английский или транслит;
- маленькие буквы;
- без пробелов;
- без кириллицы;
- слова через дефис;
- номер в конце.

Примеры:
```text
single-monument-01.webp
double-monument-01.webp
engraving-retouch-01.webp
engraving-on-monument-01.webp
office-slider-01.webp
review-work-photo-01.webp
```

## Документы

```text
public/
  documents/
    personal-data-policy.pdf
    company-details.pdf
    company-details.docx
    contract-terms.pdf
    contract-sample.pdf
    contract-sample.docx
```

PDF открывать в новой вкладке. Word скачивать.

## Чек-лист

- [ ] Создать папки изображений.
- [ ] Создать `public/documents`.
- [ ] Использовать WebP.
- [ ] Добавить lazy loading.
- [ ] Проверить названия файлов.
- [ ] Не использовать тяжёлые оригиналы на сайте.
