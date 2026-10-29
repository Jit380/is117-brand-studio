const thread = document.querySelector(".journey-thread");
const path = thread?.querySelector("path");
const main = document.querySelector("main");
const footer = document.querySelector(".footer");
let threadFrame;

function drawThread() {
  threadFrame = undefined;
  if (!thread || !path || !main || !footer) return;

  const root = document.body.getBoundingClientRect();
  const width = root.width;
  const height = root.height;
  const box = (selector) => {
    const rect = document.querySelector(selector).getBoundingClientRect();
    return {
      top: rect.top - root.top,
      bottom: rect.bottom - root.top,
      height: rect.height,
    };
  };
  const hero = box(".reference-hero");
  const story = box(".reference-story");
  const history = box(".reference-history");
  const closer = box("#closer");
  const lotus = box("#meaning");
  const product = box("#shirt");
  const end = box(".footer");
  const right = width - 10;
  let route;

  if (width > 1000) {
    const y = (amount) => hero.top + hero.height * amount;
    route = `M 0 ${y(0.34)}
      C ${width * 0.1} ${y(0.45)}, ${width * 0.15} ${y(0.27)}, ${width * 0.29} ${y(0.4)}
      S ${width * 0.4} ${y(0.6)}, ${width * 0.48} ${y(0.52)}
      C ${width * 0.59} ${y(0.4)}, ${width * 0.62} ${y(0.29)}, ${width * 0.65} ${y(0.48)}
      S ${width * 0.83} ${y(0.73)}, ${right} ${y(0.58)}
      C ${width - 2} ${y(0.7)}, ${right} ${y(0.8)}, ${right} ${hero.bottom - 15}`;
  } else {
    route = `M 0 ${hero.top + hero.height * 0.34}
      C ${width * 0.25} ${hero.top + hero.height * 0.45}, ${width * 0.55} ${hero.top + hero.height * 0.27}, ${right} ${hero.top + hero.height * 0.4}
      L ${right} ${story.top + story.height * 0.3}
      C ${right} ${story.top + story.height * 0.55}, ${width * 0.25} ${story.top + story.height * 0.55}, 10 ${story.top + story.height * 0.73}
      L 10 ${history.top + history.height * 0.3}
      C 10 ${history.top + history.height * 0.5}, ${width * 0.8} ${history.top + history.height * 0.47}, ${right} ${history.top + history.height * 0.6}
      L ${right} ${history.bottom - 15}`;
  }

  route += ` C ${right} ${closer.top}, ${width - 4} ${closer.top + closer.height * 0.6}, ${right} ${closer.bottom - 25}`;

  if (width > 700) {
    route += ` C ${right} ${lotus.top - 5}, ${width * 0.28} ${lotus.top - 10}, ${width * 0.18} ${lotus.top + 40}
      C ${width * 0.05} ${lotus.top + lotus.height * 0.42}, ${width * 0.36} ${lotus.top + lotus.height * 0.73}, ${width * 0.43} ${lotus.top + lotus.height * 0.82}
      C ${width * 0.48} ${lotus.top + lotus.height * 0.91}, ${width * 0.8} ${lotus.bottom - 35}, ${right} ${lotus.bottom}`;
  } else {
    route += ` C ${right} ${lotus.top + 10}, 8 ${lotus.top - 5}, 8 ${lotus.top + 25}
      C 2 ${lotus.top + lotus.height * 0.3}, 12 ${lotus.top + lotus.height * 0.6}, 8 ${lotus.bottom - 20}
      C 8 ${lotus.bottom + 15}, ${right} ${product.top - 15}, ${right} ${product.top + 15}`;
  }

  route += ` C ${width - 3} ${product.top + product.height * 0.35}, ${width - 20} ${product.top + product.height * 0.65}, ${right} ${product.bottom}
    C ${right} ${end.bottom - 12}, ${width * 0.93} ${end.bottom - 12}, ${width * 0.84} ${end.bottom - 12}`;

  thread.setAttribute("viewBox", `0 0 ${width} ${height}`);
  path.setAttribute("d", route);
}

function scheduleThread() {
  if (threadFrame === undefined)
    threadFrame = requestAnimationFrame(drawThread);
}

if (thread && main && footer) {
  const observer = new ResizeObserver(scheduleThread);
  observer.observe(main);
  observer.observe(footer);
  addEventListener("resize", scheduleThread);
  document.fonts.ready.then(scheduleThread);
  scheduleThread();
}
