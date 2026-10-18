// Structural smoke test for the ad-hoc scratchpad page (disposable.html).
// The page is replaced entirely on each use, so only navigation invariants
// are tested.
import { expect, test } from "@playwright/test";

test("scratchpad page loads with navigation back to the curriculum", async ({
  page,
}) => {
  await page.goto("/disposable.html");
  await expect(page.locator('a[href="/index.html"]')).toBeVisible();
  await expect(page.locator('a[href="/MCQ.html"]')).toBeVisible();
});
