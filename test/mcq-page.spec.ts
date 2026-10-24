// Structural smoke test for the stage assessment page (MCQ.html).
// Like the lesson-page specs, this asserts invariants only: MCQ.html is
// replaced on each stage completion, so its question content is never tested.
import { expect, test } from "@playwright/test";

test("assessment page loads with per-stage submit controls and home navigation", async ({
  page,
}) => {
  await page.goto("/MCQ.html");
  await expect(page.locator("button[id^='submit-stage-']")).toHaveCount(3);
  await expect(page.locator("#submit-stage-2")).toBeDisabled();
  await expect(page.locator('a[href="/index.html"]')).toBeVisible();
});
