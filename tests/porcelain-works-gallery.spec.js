import { expect, test } from '@playwright/test';

const siteBase = '/test_dev/Ritual-store';

test.describe('porcelain stoneware examples on works page', () => {
  test('shows six porcelain stoneware examples in the works gallery', async ({ page }) => {
    await page.goto(`${siteBase}/works`);

    const porcelainAnchor = page.getByRole('button', { name: 'Примеры Керамогранита' });
    await expect(porcelainAnchor).toBeVisible();
    await porcelainAnchor.click();

    const section = page.locator('#porcelain');
    await expect(section.getByRole('heading', { name: 'Примеры Керамогранита' })).toBeVisible();
    await expect(section.locator('[data-testid="porcelain-example-card"]')).toHaveCount(6);
    await expect(section.getByRole('img')).toHaveCount(6);
  });
});
