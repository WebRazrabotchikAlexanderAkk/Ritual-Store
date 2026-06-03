export const requestConfig = {
  storageKeys: {
    favorites: 'ritual-services-favorites',
    selectedItems: 'ritual-services-request-selected-items',
    form: 'ritual-services-request-form',
    submitStatus: 'ritual-services-request-submit-status',
    theme: 'ritual-services-theme',
  },
  fileTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'],
  maxFiles: 30,
  maxFileSizeMb: 100,
  channels: ['Email', 'Telegram', 'MAX'],
  requestTypes: [
    'Изготовление памятника',
    'Установка памятника',
    'Гравировка',
    'Благоустройство',
    'Уход за захоронением',
    'Ритуальные товары',
    'Доставка и монтаж',
    'Другое',
  ],
};
