const styles = getComputedStyle(document.documentElement);
document.querySelectorAll("[data-color-token]").forEach((element) => {
  element.textContent = styles
    .getPropertyValue(element.dataset.colorToken)
    .trim();
});
