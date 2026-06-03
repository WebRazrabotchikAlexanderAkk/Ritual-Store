# 12. localStorage

## Ключи

```js
ritual-services-favorites
ritual-services-request-selected-items
ritual-services-request-form
ritual-services-request-submit-status
ritual-services-theme
```

## Избранное

`ritual-services-favorites` хранит все избранные элементы.

## Выбранные элементы заявки

`ritual-services-request-selected-items` хранит только элементы, выбранные для отправки.

## Форма заявки

`ritual-services-request-form` хранит текстовые данные формы.

Фото после обновления страницы не хранить.

## Статус отправки

`ritual-services-request-submit-status` хранит:

```js
{
  hasSubmitted: true,
  submittedAt: '2026-05-31T12:30:00.000Z',
  lastSubmittedSnapshotHash: '...',
  isSubmitDisabledUntilChange: true
}
```

Используется для:
- времени последней отправки;
- блокировки повторной отправки;
- предупреждения о повторной заявке.

## Тема

`ritual-services-theme` хранит:
- light
- dark

## Очистка

Очистка формы не очищает избранное.

Очистка избранного не очищает форму заявки.

## Чек-лист

- [ ] Создать useLocalStorage.
- [ ] Создать useFavorites.
- [ ] Создать useThemeMode.
- [ ] Создать useRequestForm.
- [ ] Настроить ключи.
- [ ] Настроить очистку.
- [ ] Настроить статус отправки.
