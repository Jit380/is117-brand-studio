import { test, expect } from "@playwright/test";

test("the continuous thread reaches the lotus and footer after layout changes", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const coverage = () =>
    page.evaluate(() => {
      const svg = document.querySelector(".journey-thread");
      const path = svg.querySelector("path");
      const bounds = svg.getBoundingClientRect();
      const view = svg.viewBox.baseVal;
      const lotus = document.querySelector("#meaning").getBoundingClientRect();
      const footer = document.querySelector(".footer").getBoundingClientRect();
      const length = path.getTotalLength();
      const point = (distance) => {
        const p = path.getPointAtLength(distance);
        return {
          x: bounds.left + (p.x * bounds.width) / view.width,
          y: bounds.top + (p.y * bounds.height) / view.height,
        };
      };
      const end = point(length);
      const hasLotus = Array.from({ length: 501 }, (_, i) =>
        point((length * i) / 500),
      ).some(
        (p) =>
          p.y >= lotus.top &&
          p.y <= lotus.bottom &&
          p.x >= lotus.left &&
          p.x <= lotus.right,
      );
      return {
        hasLotus,
        endsInFooter:
          end.y >= footer.top &&
          end.y <= footer.bottom &&
          end.x >= footer.left &&
          end.x <= footer.right,
      };
    });
  await expect.poll(coverage).toEqual({ hasLotus: true, endsInFooter: true });
  await page.locator("#eko-motion-toggle").click();
  await expect.poll(coverage).toEqual({ hasLotus: true, endsInFooter: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect.poll(coverage).toEqual({ hasLotus: true, endsInFooter: true });
  // The decorative layer must leave the real product controls usable.
  await page.locator('input[name="size"][value="M"]').check();
  await page
    .getByRole("button", { name: "Add to demo bag", exact: true })
    .click();
  await expect(page.locator("#bag-count")).toHaveText("1");
});

test("the thread traces with forward/backward scrolling and finishes at the footer", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const thread = page.locator(".journey-thread");
  const tip = page.locator(".thread-tip");
  const offset = () =>
    page
      .locator(".thread-trace")
      .evaluate((element) =>
        Number.parseFloat(getComputedStyle(element).strokeDashoffset),
      );
  await expect(thread).toHaveAttribute("data-thread-mode", "follow");
  await expect(tip).toBeVisible();
  const initial = await offset();

  await page.evaluate(() =>
    window.scrollTo({
      top: document.documentElement.scrollHeight * 0.5,
      behavior: "instant",
    }),
  );
  await expect.poll(offset).toBeLessThan(initial - 10);
  const middle = await offset();
  const marker = await tip.boundingBox();
  expect(marker.y).toBeGreaterThan(-10);
  expect(marker.y).toBeLessThan(page.viewportSize().height + 10);

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect.poll(offset).toBeGreaterThan(middle + 10);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() =>
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "instant",
    }),
  );
  await expect.poll(offset).toBe(0);
  const end = await tip.boundingBox();
  expect(end.y).toBeGreaterThan(-10);
  expect(end.y).toBeLessThan(854);
});

test("the pause control and reduced-motion preference show a static full thread", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const thread = page.locator(".journey-thread");
  const tip = page.locator(".thread-tip");
  await expect(thread).toHaveAttribute("data-thread-mode", "follow");
  await page.getByRole("button", { name: "Pause motion", exact: true }).click();
  await expect(thread).toHaveAttribute("data-thread-mode", "static");
  await expect(tip).toBeHidden();
  await expect(page.locator(".thread-base")).toBeVisible();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(thread).toHaveAttribute("data-thread-progress", "1");

  await page
    .getByRole("button", { name: "Resume motion", exact: true })
    .click();
  await expect(thread).toHaveAttribute("data-thread-mode", "follow");
  await expect(tip).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(thread).toHaveAttribute("data-thread-mode", "static");
  await expect(tip).toBeHidden();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(thread).toHaveAttribute("data-thread-mode", "follow");
});
