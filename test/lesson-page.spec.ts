// Structural E2E tests for the lesson page (index.html).
//
// index.html is rebuilt from scratch on every curriculum stage advance, so
// these tests assert behavior invariants only — navigation, single-topic
// view, explicit completion, and persistence — never stage-specific content
// (titles, topic counts, or the storage key value, which is discovered at
// runtime via its "learning-ai:" prefix).
import { expect, test, type Page } from "@playwright/test";

type LessonState = { key: string; state: { current: string; done: string[] } };

async function readLessonState(page: Page): Promise<LessonState | null> {
  return page.evaluate(() => {
    const key = Object.keys(localStorage).find(
      (k) => k.startsWith("learning-ai:") && !k.endsWith(":mcq"),
    );
    if (!key) return null;
    return { key, state: JSON.parse(localStorage.getItem(key) as string) };
  });
}

async function visibleTopicId(page: Page): Promise<string> {
  const section = page.locator(".topic-section[data-id]:visible");
  // single-topic view: exactly one section is visible at any time
  await expect(section).toHaveCount(1);
  return section.getAttribute("data-id") as Promise<string>;
}

test("shows one topic at a time, Previous disabled on the first topic", async ({
  page,
}) => {
  await page.goto("/index.html");
  await expect(page.locator("#next-btn")).toBeVisible();
  await expect(page.locator("#prev-btn")).toBeDisabled();
  await visibleTopicId(page);
});

test("Next advances the topic but visiting does not complete it", async ({
  page,
}) => {
  await page.goto("/index.html");
  const first = await visibleTopicId(page);

  await page.click("#next-btn");
  const second = await visibleTopicId(page);
  expect(second).not.toBe(first);
  await expect(page.locator("#prev-btn")).toBeEnabled();

  const stored = await readLessonState(page);
  expect(stored?.state.done).toEqual([]);
});

test("explicit completion persists across reloads", async ({ page }) => {
  await page.goto("/index.html");
  const topic = await visibleTopicId(page);

  await page.click("#complete-btn");
  let stored = await readLessonState(page);
  expect(stored?.state.done).toContain(topic);

  await page.reload();
  stored = await readLessonState(page);
  expect(stored?.state.done).toContain(topic);
  expect(await visibleTopicId(page)).toBe(topic);
});

test("collapsing the sidebar persists across reloads", async ({ page }) => {
  await page.goto("/index.html");

  await page.click("#sidebar-toggle-btn");
  await expect(page.locator("#shell")).toHaveClass(/sidebar-collapsed/);
  expect(
    await page.evaluate(() => localStorage.getItem("learning_sidebar_collapsed")),
  ).toBe("true");

  await page.reload();
  await expect(page.locator("#shell")).toHaveClass(/sidebar-collapsed/);
});

test("top navigation reaches the assessment and scratchpad pages", async ({
  page,
}) => {
  await page.goto("/index.html");
  await page.click('a[href="/MCQ.html"]');
  await expect(page).toHaveURL(/\/MCQ\.html$/);

  await page.click('a[href="/disposable.html"]');
  await expect(page).toHaveURL(/\/disposable\.html$/);

  await page.click('a[href="/index.html"]');
  await expect(page).toHaveURL(/\/index\.html$/);
});
