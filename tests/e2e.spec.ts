import { test, expect } from "@playwright/test";

test("logIn", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill("test@gmail.com");
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill("password");
  await page.getByRole("button", { name: "ボタン" }).click();
});
