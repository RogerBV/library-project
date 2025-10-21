import { test, expect } from '@playwright/test';

test('Testing Loading And New Author Save', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  await expect(page.locator('text=Iniciar Sesión')).toBeVisible();

  const usernameField = page.locator('#username')
  await usernameField.fill('admin')

  const passwordField = page.locator('#password')
  await passwordField.fill('paparellena2025')

  const btnLogin = page.locator('#btnLogin')
  await btnLogin.click()

  
  //await page.screenshot({ path: 'screenshots/homepage.png', fullPage: true });
  //await expect(loadingDiv).toBeVisible({ timeout: 8000 })
  
  //await expect(loadingDiv).toBeHidden();

  
  await page.waitForURL('**/authors', { timeout: 10000 });
  
  const btnNewAuthor = page.locator('#btnNewAuthor')
  await btnNewAuthor.click()

  const txtAuthorName = page.locator('#authorName')
  txtAuthorName.fill('Mario Vargas Llosa')

  const btnSaveNewAuthor = page.locator('#btnSaveNewAuthor')
  await btnSaveNewAuthor.click();

  const loadingDiv = page.locator('#loading')
  await expect(loadingDiv).toBeVisible({ timeout: 10000 })
  await expect(loadingDiv).toBeHidden({ timeout: 20000 });


  await expect(page.locator('text=Saved Author')).toBeVisible()

  //await expect(page.locator('text=List of Authors')).toBeVisible({ timeout: 5000 });
  await page.screenshot({ path: 'screenshots/homepage.png', fullPage: true });

});