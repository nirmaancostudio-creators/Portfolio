type P = { x: number; y: number; vx: number; vy: number; r: number; alpha: number };

let ctx: OffscreenCanvasRenderingContext2D | null = null;
let particles: P[] = [];
let animId = 0;
let frame = 0;
let w = 0;
let h = 0;

function init(width: number, height: number) {
  w = width;
  h = height;
  particles = [];
  const count = Math.min(60, Math.floor((w * h) / 16000));
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.55 + 0.1,
    });
  }
}

function draw() {
  if (!ctx) return;
  ctx.clearRect(0, 0, w, h);
  for (const p of particles) {
    p.x = (p.x + p.vx + w) % w;
    p.y = (p.y + p.vy + h) % h;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(180,180,255,${p.alpha})`;
    ctx.fill();
  }
  if (frame % 2 === 0) {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 10000) {
          const d = Math.sqrt(d2);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(180,180,255,${0.06 * (1 - d / 100)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }
  frame++;
  animId = requestAnimationFrame(draw);
}

self.onmessage = (e: MessageEvent) => {
  const { type } = e.data;
  if (type === "init") {
    const { canvas, width, height } = e.data;
    ctx = (canvas as OffscreenCanvas).getContext("2d");
    init(width, height);
    draw();
  } else if (type === "resize") {
    cancelAnimationFrame(animId);
    init(e.data.width, e.data.height);
    draw();
  } else if (type === "stop") {
    cancelAnimationFrame(animId);
  }
};
