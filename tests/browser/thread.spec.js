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
