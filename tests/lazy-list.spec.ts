import { test, expect } from '@playwright/test';

test.describe('Lazy Loaded List', () => {
  test('should load items incrementally and verify item states', async ({ page }) => {
    // 1. Navigate to the app
    await page.goto('https://claude.ai/public/artifacts/1e02a9a5-4f20-4f19-a7ba-6c3f16c6eab9');

    // 2. Open Timing Challenges tab
    await page.getByRole('tab', { name: 'Timing Challenges' }).click();

    // 3. Identify the list items and load button
    const loadMoreButton = page.getByRole('button', { name: 'Load More Items' });
    const listItems = page.locator('[data-testid="list-item"]');

    // 4. Click "Load More Items" 3 times
    for (let i = 0; i < 3; i++) {
      const currentCount = await listItems.count();

      await loadMoreButton.click();

      // Wait until new items are added
      await expect(listItems).toHaveCount(currentCount + 5);
    }

    // 5. Verify exactly 15 items are displayed
    await expect(listItems).toHaveCount(15);

    // 6. Verify at least one "active" item exists
    await expect(
      listItems.filter({ hasText: 'active' })
    ).toHaveCountGreaterThan(0);

    // 7. Verify at least one "pending" item exists
    await expect(
      listItems.filter({ hasText: 'pending' })
    ).toHaveCountGreaterThan(0);
  });
});
