// Pixel dissolve theme transition: every pixel of the screen flips from the
// old theme to the new one at its own random moment over DURATION.
// A view transition keeps the old snapshot underneath; the new snapshot is
// masked by a canvas noise threshold redrawn every frame.

const CELL = 2; // css px
const MAX_CELLS = 400_000; // grow cells on huge screens to keep frames cheap
const DURATION = 900; // ms
const PSEUDO = "::view-transition-new(root)";

// gentle ease-in-out so the first and last pixels trickle in
const ease = (p: number) => p * p * (3 - 2 * p);

let running = false;

export function pixelTransition(swap: () => void) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (running || reduced || !document.startViewTransition) {
    if (!running) swap();
    return;
  }
  running = true;

  let cell = CELL;
  while (Math.ceil(window.innerWidth / cell) * Math.ceil(window.innerHeight / cell) > MAX_CELLS) cell++;
  const cols = Math.ceil(window.innerWidth / cell);
  const rows = Math.ceil(window.innerHeight / cell);
  const count = cols * rows;

  // getRandomValues fills at most 65536 bytes per call
  const thresholds = new Uint8Array(count);
  for (let i = 0; i < count; i += 65536) crypto.getRandomValues(thresholds.subarray(i, i + 65536));

  const canvas = document.createElement("canvas");
  canvas.width = cols;
  canvas.height = rows;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    running = false;
    swap();
    return;
  }
  const image = ctx.createImageData(cols, rows);
  const pixels = new Uint32Array(image.data.buffer);

  const root = document.documentElement;
  root.classList.add("pixel-transition");
  const transition = document.startViewTransition(swap);

  let mask: Animation | null = null;
  transition.ready
    .then(() => {
      const start = performance.now();
      const frame = (now: number) => {
        const p = Math.min(1, (now - start) / DURATION);
        if (p >= 1) {
          transition.skipTransition();
          return;
        }
        const cut = ease(p) * 256;
        for (let i = 0; i < count; i++) pixels[i] = thresholds[i] < cut ? 0xff000000 : 0;
        ctx.putImageData(image, 0, 0);
        const url = `url(${canvas.toDataURL()})`;
        const next = root.animate(
          { maskImage: [url, url] },
          { duration: DURATION * 2, pseudoElement: PSEUDO, fill: "forwards" },
        );
        mask?.cancel();
        mask = next;
        requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    })
    .catch(() => {});

  transition.finished.finally(() => {
    mask?.cancel();
    root.classList.remove("pixel-transition");
    running = false;
  });
}
