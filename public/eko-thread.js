(() => {
  const thread = document.querySelector(".journey-thread");
  const path = thread?.querySelector("path");
  const main = document.querySelector("main");
  const footer = document.querySelector(".footer");
  const trace = thread?.querySelector(".thread-trace");
  const tip = thread?.querySelector(".thread-tip");
  const threadPreference = matchMedia("(prefers-reduced-motion: reduce)");
  const motionControl = document.querySelector("#eko-motion-toggle");
  let threadFrame;
  let layoutDirty = true;
  let checkpoints = [];
  let totalLength = 0;
  let documentTop = 0;

  function drawThread() {
    if (!thread || !path || !trace || !tip || !main || !footer) return;

    const root = document.body.getBoundingClientRect();
    const width = root.width;
    const height = root.height;
    documentTop = root.top + window.scrollY;
    thread.setAttribute("viewBox", `0 0 ${width} ${height}`);
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
    const nextCheckpoints = [{ y: 0, length: 0 }];
    // Measure section prefixes only when the layout changes. Their reading
    // positions stay ordered even where the decorative curve turns upward.
    const mark = (y) => {
      path.setAttribute("d", route);
      nextCheckpoints.push({ y, length: path.getTotalLength() });
    };

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
      L ${right} ${hero.bottom}`;
      mark(hero.bottom);
      route += `L ${right} ${story.top + story.height * 0.3}
      C ${right} ${story.top + story.height * 0.55}, ${width * 0.25} ${story.top + story.height * 0.55}, 10 ${story.top + story.height * 0.73}
      L 10 ${story.bottom}`;
      mark(story.bottom);
      route += `L 10 ${history.top + history.height * 0.3}
      C 10 ${history.top + history.height * 0.5}, ${width * 0.8} ${history.top + history.height * 0.47}, ${right} ${history.top + history.height * 0.6}
      L ${right} ${history.bottom - 15}`;
    }

    mark(history.bottom);
    route += ` C ${right} ${closer.top}, ${width - 4} ${closer.top + closer.height * 0.6}, ${right} ${closer.bottom - 25}`;

    mark(closer.bottom);
    if (width > 700) {
      route += ` C ${right} ${lotus.top - 5}, ${width * 0.28} ${lotus.top - 10}, ${width * 0.18} ${lotus.top + 40}
      C ${width * 0.05} ${lotus.top + lotus.height * 0.42}, ${width * 0.36} ${lotus.top + lotus.height * 0.73}, ${width * 0.43} ${lotus.top + lotus.height * 0.82}
      C ${width * 0.48} ${lotus.top + lotus.height * 0.91}, ${width * 0.8} ${lotus.bottom - 35}, ${right} ${lotus.bottom}`;
    } else {
      route += ` C ${right} ${lotus.top + 10}, 8 ${lotus.top - 5}, 8 ${lotus.top + 25}
      C 2 ${lotus.top + lotus.height * 0.3}, 12 ${lotus.top + lotus.height * 0.6}, 8 ${lotus.bottom - 20}
      C 8 ${lotus.bottom + 15}, ${right} ${product.top - 15}, ${right} ${product.top + 15}`;
    }

    mark(lotus.bottom);
    route += ` C ${width - 3} ${product.top + product.height * 0.35}, ${width - 20} ${product.top + product.height * 0.65}, ${right} ${product.bottom}
    `;
    mark(product.bottom);
    route += `C ${right} ${end.bottom - 12}, ${width * 0.93} ${end.bottom - 12}, ${width * 0.84} ${end.bottom - 12}`;

    mark(end.bottom);
    checkpoints = nextCheckpoints;
    totalLength = path.getTotalLength();
    trace.setAttribute("d", route);
    trace.style.strokeDasharray = `${totalLength} ${totalLength}`;
  }

  function updateThreadProgress() {
    if (!thread || !trace || !tip || !totalLength || !checkpoints.length)
      return;

    // The existing page control initializes from the system preference and
    // lets a visitor explicitly pause or resume all page motion together.
    const paused =
      document.documentElement.classList.contains("eko-static") ||
      (!motionControl && threadPreference.matches);
    thread.dataset.threadMode = paused ? "static" : "follow";
    if (paused) {
      trace.style.strokeDashoffset = "0";
      thread.dataset.threadProgress = "1";
      return;
    }

    const last = checkpoints[checkpoints.length - 1];
    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - innerHeight,
    );
    const atBottom = window.scrollY >= maxScroll - 2;
    const readingY = atBottom
      ? last.y
      : Math.max(
          0,
          Math.min(last.y, window.scrollY - documentTop + innerHeight * 0.62),
        );
    let distance = totalLength;
    for (let index = 1; index < checkpoints.length; index += 1) {
      const to = checkpoints[index];
      if (readingY > to.y) continue;
      const from = checkpoints[index - 1];
      const amount = Math.max(
        0,
        Math.min(1, (readingY - from.y) / (to.y - from.y)),
      );
      distance = from.length + (to.length - from.length) * amount;
      break;
    }

    trace.style.strokeDashoffset = String(totalLength - distance);
    const point = path.getPointAtLength(distance);
    tip.setAttribute("cx", String(point.x));
    tip.setAttribute("cy", String(point.y));
    thread.dataset.threadProgress = (distance / totalLength).toFixed(4);
  }

  function requestThreadFrame() {
    if (threadFrame !== undefined) return;
    threadFrame = requestAnimationFrame(() => {
      threadFrame = undefined;
      if (layoutDirty) {
        layoutDirty = false;
        drawThread();
      }
      updateThreadProgress();
    });
  }

  function scheduleThreadLayout() {
    layoutDirty = true;
    requestThreadFrame();
  }

  if (thread && main && footer) {
    const observer = new ResizeObserver(scheduleThreadLayout);
    observer.observe(main);
    observer.observe(footer);
    const motionObserver = new MutationObserver(scheduleThreadLayout);
    motionObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    addEventListener("scroll", requestThreadFrame, { passive: true });
    addEventListener("resize", scheduleThreadLayout);
    threadPreference.addEventListener("change", scheduleThreadLayout);
    document.fonts.ready.then(scheduleThreadLayout);
    scheduleThreadLayout();
  }
})();
