const scene = document.querySelector(".eko-scene");
const media = matchMedia("(prefers-reduced-motion: reduce)");
const button = document.querySelector("#eko-motion-toggle");
let paused = media.matches;
let pending = false;

const copy = [
  [
    "01 / The neckline",
    "A familiar beginning.",
    "A simple crew neckline. Room for the person who wears it.",
  ],
  [
    "02 / The sleeve",
    "An everyday outline.",
    "Short sleeves. An uncluttered silhouette. Room to make the look your own.",
  ],
  [
    "03 / The hem",
    "Nothing extra to explain.",
    "The shirt stays simple. The meaning stays with you.",
  ],
];

function update() {
  pending = false;
  if (!scene || paused) return;

  const rect = scene.getBoundingClientRect();
  const progress = Math.max(
    0,
    Math.min(
      1,
      (25 - rect.top) / Math.max(1, rect.height - innerHeight * 0.94),
    ),
  );

  const index = progress < 0.34 ? 0 : progress < 0.68 ? 1 : 2;
  const points = [
    [0, 0, 1],
    [0, 83, 2.45],
    [-50, 22, 1.95],
    [0, -74, 2.05],
  ];

  const position = progress * 3;
  const segment = Math.min(2, Math.floor(position));
  let amount = position - segment;
  amount = amount * amount * (3 - 2 * amount);

  const from = points[segment];
  const to = points[segment + 1];
  const value = (n) => from[n] + (to[n] - from[n]) * amount;

  scene.style.setProperty("--dx", value(0) + "%");
  scene.style.setProperty("--dy", value(1) + "%");
  scene.style.setProperty("--zoom", String(value(2)));

  document.querySelector("#eko-detail-caption").textContent = copy[index][0];
  document.querySelector("#eko-detail-title").textContent = copy[index][1];
  document.querySelector("#eko-detail-text").textContent = copy[index][2];
}

function apply() {
  document.documentElement.classList.toggle("eko-static", paused);

  if (button) {
    button.textContent = paused ? "Resume motion" : "Pause motion";
    button.setAttribute("aria-pressed", String(paused));
  }

  if (paused) {
    document.querySelector("#eko-detail-caption").textContent =
      "White-shirt concept / Front view";
  } else {
    update();
  }
}

function requestUpdate() {
  if (!pending && !paused) {
    pending = true;
    requestAnimationFrame(update);
  }
}

button?.addEventListener("click", () => {
  paused = !paused;
  apply();
});

media.addEventListener("change", () => {
  paused = media.matches;
  apply();
});

addEventListener("scroll", requestUpdate, { passive: true });
addEventListener("resize", requestUpdate);

if (scene) apply();
