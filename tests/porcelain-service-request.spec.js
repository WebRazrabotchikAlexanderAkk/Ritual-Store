import { expect, test } from '@playwright/test';

const siteBase = '/test_dev/Ritual-store';

test.describe('porcelain stoneware service and request portrait choice', () => {
  test('shows the porcelain stoneware service in the catalog and detail page', async ({ page }) => {
    await page.goto(`${siteBase}/services`);

    await expect(page.getByRole('heading', { name: 'Изготовление керамогранита' })).toBeVisible();
    await expect(page.getByText('13х18')).toBeVisible();

    await page.locator(`a[href="${siteBase}/services/porcelain-stoneware"]`).click();

    await expect(page).toHaveURL(/\/services\/porcelain-stoneware$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Изготовление керамогранита' })).toBeVisible();
    await expect(page.getByText('восстановленное цветное фото')).toBeVisible();
    await expect(page.getByText('13х18, 24х30, 30х40, 40х50, 60х40, 100х50, 130х60')).toBeVisible();
  });

  test('keeps optional portrait type in the request form and confirmation dialog', async ({ page }) => {
    await page.goto(`${siteBase}/request`);

    await expect(page.getByRole('heading', { name: 'Портрет на памятнике' })).toBeVisible();
    await page.getByLabel('Керамогранит').check();
    await expect(page.getByText('утопленная керамогранитная плита в памятнике')).toBeVisible();

    page.once('dialog', (dialog) => dialog.accept());
    await page.reload();
    await expect(page.getByLabel('Керамогранит')).toBeChecked();

    await page.getByRole('textbox', { name: '+7 (999) 123-45-67' }).fill('+7 (999) 123-45-67');
    await page.getByLabel(/Я согласен/).check();
    await page.getByRole('button', { name: 'Отправить заявку' }).click();

    await expect(page.getByRole('dialog')).toContainText('Портрет на памятнике: Керамогранит');
  });
});
