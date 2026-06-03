import { requestConfig } from '../config/requestConfig.js';

export function validateImageFiles(files) {
  const accepted = [];
  const errors = [];
  const maxBytes = requestConfig.maxFileSizeMb * 1024 * 1024;

  Array.from(files).slice(0, requestConfig.maxFiles).forEach((file) => {
    const isHeicByName = /\.(heic|heif)$/i.test(file.name);
    const isAllowed = requestConfig.fileTypes.includes(file.type) || isHeicByName;

    if (!isAllowed) {
      errors.push(`${file.name}: неподдерживаемый формат`);
      return;
    }

    if (file.size > maxBytes) {
      errors.push(`${file.name}: файл больше ${requestConfig.maxFileSizeMb} МБ`);
      return;
    }

    accepted.push(file);
  });

  return { accepted, errors };
}
