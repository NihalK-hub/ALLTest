import { test, expect } from '@playwright/test';

test.describe('Conditional Login Flow', () => {
  test('should show correct panel based on user role', async ({ page }) => {
    // 1. Navigate to the app
    await page.goto('https://claude.ai/public/artifacts/1e02a9a5-4f20-4f19-a7ba-6c3f16c6eab9');

    // 2. Go to "Flaky Selectors" tab
    await page.getByRole('tab', { name: 'Flaky Selectors' }).click();

    // ----- Admin Login Flow -----

    // 3. Login as Admin User
    await page.getByRole('button', { name: 'Admin User' }).click();

    // 4. Wait for dashboard to load
    const adminPanel = page.getByText('Admin Panel');
    await expect(adminPanel).toBeVisible();

    // 5. Verify Standard Panel is NOT visible
    await expect(page.getByText('Standard Panel')).toBeHidden();

    // 6. Logout
    await page.getByRole('button', { name: 'Logout' }).click();

    // ----- Standard User Login Flow -----

    // 7. Login as Standard User
    await page.getByRole('button', { name: 'Standard User' }).click();

    // 8. Verify Standard Panel is visible
    const standardPanel = page.getByText('Standard Panel');
    await expect(standardPanel).toBeVisible();

    // 9. Verify Admin Panel is NOT visible
    await expect(page.getByText('Admin Panel')).toBeHidden();
  });
});
