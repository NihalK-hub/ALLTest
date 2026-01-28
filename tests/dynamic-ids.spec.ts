import { test, expect } from '@playwright/test';

test.describe('Dynamic ID Handling', () => {
  test('should select Beta item regardless of regenerated IDs', async ({ page }) => {
    // 1. Navigate to the app
    await page.goto('https://claude.ai/public/artifacts/1e02a9a5-4f20-4f19-a7ba-6c3f16c6eab9');

    // 2. Go to "Flaky Selectors" tab
    await page.getByRole('tab', { name: 'Flaky Selectors' }).click();

    // 3. Regenerate all IDs
    await page.getByRole('button', { name: 'Regenerate All IDs' }).click();

    // 4. Click the item named "Beta"
    const betaItem = page.getByRole('listitem', { name: 'Beta' });
    await betaItem.click();

    // 5. Verify "Beta" is selected
    await expect(betaItem).toHaveClass(/selected/);
  });
});
