import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const direction of ["modernist", "postmodern"]) {
  test(`EKO ${direction}: validates size, adds and clears a demo item, and works at narrow widths`, async ({
    page,
  }) => {
    await page.goto(`/explorations/${direction}.html`);
    await page.getByRole("button", { name: "Add to demo bag" }).click();
    await expect(page.locator("#eko-error")).toBeVisible();
    await expect(page.locator("#eko-count")).toHaveText("0");
    await page.locator('input[value="M"]').check();
    await page.getByRole("button", { name: "Add to demo bag" }).click();
    await expect(page.locator("#eko-count")).toHaveText("1");
    await expect(page.locator("#eko-status")).toContainText("M");
    await page.getByRole("button", { name: "Empty demo bag" }).click();
    await expect(page.locator("#eko-count")).toHaveText("0");
    await page.locator('input[value="S"]').focus();
    await page.keyboard.press("Space");
    await page.keyboard.press("ArrowRight");
    await expect(page.locator('input[value="M"]')).toBeChecked();
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBeTruthy();
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    }
  });
}

test("EKO directions retain the same product, headline, story and action", async ({
  page,
}) => {
  let first;
  for (const direction of ["modernist", "postmodern"]) {
    await page.goto(`/explorations/${direction}.html`);
    const content = await page
      .locator(
        ".hero-title,.hero-support,.story-title,.story-copy,.meaning-title,.meaning-text,.product-title,.product-description,.add-button",
      )
      .allTextContents();
    const product = await page.locator(".hero-art img").getAttribute("src");
    if (first) expect({ content, product }).toEqual(first);
    else first = { content, product };
  }
});
