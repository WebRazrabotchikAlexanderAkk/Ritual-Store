import { expect, test } from '@playwright/test';

const siteBase = '/test_dev/Ritual-store';

test.describe('site readiness improvements', () => {
  test('uses service-specific SEO on detail pages', async ({ page }) => {
    await page.goto(`${siteBase}/services/engraving`);

    await expect(page).toHaveTitle(/Гравировка портретов и надписей/);
    const description = page.locator('meta[name="description"]');

    await expect(description).toHaveAttribute('content', /Портреты, надписи, орнаменты/);
  });

  test('does not link to missing launch documents', async ({ page }) => {
    await page.goto(`${siteBase}/documents`);

    await expect(page.getByText('Файл будет добавлен перед запуском.')).toHaveCount(6);
    await expect(page.getByRole('link', { name: 'Открыть' })).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Скачать' })).toHaveCount(0);
  });

  test('shows useful related services instead of a future placeholder', async ({ page }) => {
    await page.goto(`${siteBase}/services/engraving`);

    await expect(page.getByText('Здесь позже появятся связанные услуги')).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Связанные услуги' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Фото на памятник/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Изготовление керамогранита/ })).toBeVisible();
  });

  test('keeps the contact map placeholder honest until final data is ready', async ({ page }) => {
    await page.goto(`${siteBase}/contacts`);

    await expect(page.getByText('Карта будет добавлена перед запуском')).toBeVisible();
    await expect(page.getByText('Перед приездом уточните адрес и удобное время по телефону.')).toBeVisible();
  });

  test('offers a phone action in reviews instead of duplicate request buttons', async ({ page }) => {
    await page.goto(`${siteBase}/reviews`);

    const firstReview = page.getByRole('article').first();

    await expect(firstReview.getByRole('link', { name: 'Позвонить' })).toBeVisible();
    await expect(firstReview.getByRole('link', { name: 'Заказать расчёт' })).toHaveCount(1);
  });
});
