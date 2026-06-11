import { expect, test } from '@playwright/test';

test.describe('call accessibility', () => {
  test('loads the home page without browser console errors', async ({ page }) => {
    const messages = [];

    page.on('console', (message) => {
      if (['error', 'warning'].includes(message.type())) {
        messages.push(`${message.type()}: ${message.text()}`);
      }
    });
    page.on('pageerror', (error) => {
      messages.push(`pageerror: ${error.message}`);
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(messages).toEqual([]);
  });

  test('keeps the primary phone action clear on a narrow mobile header', async ({ page }) => {
    await page.goto('/');

    const header = page.getByRole('banner');
    await expect(header.getByRole('link', { name: /позвонить/i })).toBeVisible();
    await expect(header.getByRole('link', { name: /^\+7/ })).toBeHidden();
  });

  test('makes the phone link obvious in the first screen and footer', async ({ page }) => {
    await page.goto('/');

    const phoneHints = page.getByRole('main').getByText('Консультация по телефону');

    await expect(page.getByRole('link', { name: /позвонить/i }).first()).toBeVisible();
    await expect(phoneHints).toHaveCount(3);
    await expect(phoneHints.first()).toBeVisible();
    await expect(page.getByRole('contentinfo').getByRole('link', { name: /^\+7/ })).toBeVisible();
  });

  test('keeps the first-screen headline readable on narrow screens', async ({ page }) => {
    await page.goto('/');

    const headline = page.getByRole('heading', { level: 1 });
    const metrics = await headline.evaluate((element) => ({
      fontSize: Number.parseFloat(window.getComputedStyle(element).fontSize),
      viewportWidth: window.innerWidth,
    }));

    if (metrics.viewportWidth <= 400) {
      expect(metrics.fontSize).toBeLessThanOrEqual(48);
    }
  });

  test('keeps the hero phone number compact on narrow screens', async ({ page }) => {
    await page.goto('/');

    const phone = page.getByRole('main').getByRole('link', { name: /^\+7/ }).first();
    const metrics = await phone.evaluate((element) => ({
      height: element.getBoundingClientRect().height,
      viewportWidth: window.innerWidth,
    }));

    if (metrics.viewportWidth <= 400) {
      expect(metrics.height).toBeLessThanOrEqual(48);
    }
  });

  test('puts the call path first in the mobile menu', async ({ page }) => {
    await page.goto('/');

    const viewportWidth = await page.evaluate(() => window.innerWidth);
    if (viewportWidth > 400) {
      return;
    }

    await page.getByRole('button', { name: 'Открыть меню' }).click();

    const menuLabels = await page.locator('.MuiDrawer-root .MuiListItemText-primary').allTextContents();
    expect(menuLabels.slice(0, 4)).toEqual(['Позвонить', 'Услуги', 'Примеры работ', 'Контакты']);
  });
});
