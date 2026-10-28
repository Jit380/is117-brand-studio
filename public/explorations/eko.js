const form = document.querySelector("#eko-form");
const count = document.querySelector("#eko-count");
const message = document.querySelector("#eko-status");
const error = document.querySelector("#eko-error");
const clear = document.querySelector("#eko-clear");
const items = [];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const size = new FormData(form).get("size");
  if (!["S", "M", "L", "XL"].includes(size)) {
    error.hidden = false;
    form.querySelector("input").focus();
    return;
  }
  error.hidden = true;
  items.push(size);
  count.textContent = String(items.length);
  message.textContent = `${items.length} ${items.length === 1 ? "shirt" : "shirts"} in your demo bag · ${items.join(", ")}`;
  clear.disabled = false;
});

form.addEventListener("change", () => {
  error.hidden = true;
});

clear.addEventListener("click", () => {
  items.length = 0;
  count.textContent = "0";
  message.textContent = "Your demo bag is empty.";
  clear.disabled = true;
});
