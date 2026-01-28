import { test, expect } from '@playwright/test';

test.describe('Delayed Button Flow', () => {
  test('should complete the process after confirm button becomes enabled', async ({ page }) => {
    // 1. Navigate to the app
    await page.goto('https://claude.ai/public/artifacts/1e02a9a5-4f20-4f19-a7ba-6c3f16c6eab9');

    // 2. Go to "Timing Challenges" tab
    await page.getByRole('tab', { name: 'Timing Challenges' }).click();

    // 3. Click "Start Process"
    await page.getByRole('button', { name: 'Start Process' }).click();

    // 4. Locate the Confirm Action button
    const confirmButton = page.getByRole('button', { name: 'Confirm Action' });

    // 5. Wait until the button becomes enabled (not just visible)
    await expect(confirmButton).toBeEnabled();

    // 6. Click the confirm button
    await confirmButton.click();

    // 7. Verify success message appears
    await expect(
      page.getByText('Success', { exact: false })
    ).toBeVisible();
  });
});
