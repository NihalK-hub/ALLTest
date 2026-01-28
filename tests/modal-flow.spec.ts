import { test, expect } from '@playwright/test';

test.describe('Modal Confirmation Flow', () => {
  test('should confirm action and close all modals', async ({ page }) => {
    // 1. Navigate to the app
    await page.goto('https://claude.ai/public/artifacts/1e02a9a5-4f20-4f19-a7ba-6c3f16c6eab9');

    // 2. Go to "Responsive" tab
    await page.getByRole('tab', { name: 'Responsive' }).click();

    // 3. Open the main modal
    await page.getByRole('button', { name: 'Open Modal' }).click();

    const primaryModal = page.getByRole('dialog').first();
    await expect(primaryModal).toBeVisible();

    // 4. Inside the modal, click "Show Details"
    await primaryModal.getByRole('button', { name: 'Show Details' }).click();

    // 5. Interact with the nested modal
    const nestedModal = page.getByRole('dialog').nth(1);
    await expect(nestedModal).toBeVisible();

    await nestedModal.getByRole('button', { name: 'Confirm' }).click();

    // 6. Verify both modals are closed
    await expect(primaryModal).toBeHidden();
    await expect(nestedModal).toBeHidden();

    // 7. Verify confirmation result
    await expect(page.getByText('confirmed', { exact: false })).toBeVisible();
  });
});
