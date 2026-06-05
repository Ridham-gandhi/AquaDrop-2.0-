import { useEffect, useRef } from 'react';

interface Blob {
  x: number;
  y: number;
  radius: number;
  a: number;
  b: number;
  delta: number;
  sx: number;
  sy: number;
  cx: number;
  cy: number;
  r: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  decay: number;
}

export default function MetaballCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef(0);
  const mouseRef = useRef({ x: 120, y: 67 });
  const lensRef = useRef({ x: 120, y: 67 });
  const blobsRef = useRef<Blob[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create offscreen canvas for grid rendering
    const offscreen = document.createElement('canvas');
    offscreen.width = 240;
    offscreen.height = 135;
    offscreenRef.current = offscreen;
    const offCtx = offscreen.getContext('2d')!;

    // Initialize blobs
    const blobParams = [
      { a: 3, b: 2, delta: Math.PI / 4, sx: 30, sy: 25, cx: 60, cy: 50, r: 18 },
      { a: 5, b: 4, delta: 0, sx: 35, sy: 20, cx: 60, cy: 50, r: 16 },
      { a: 2, b: 3, delta: Math.PI / 2, sx: 25, sy: 30, cx: 60, cy: 50, r: 14 },
      { a: 4, b: 5, delta: Math.PI / 3, sx: 40, sy: 18, cx: 60, cy: 50, r: 15 },
      { a: 3, b: 3, delta: Math.PI / 6, sx: 28, sy: 28, cx: 60, cy: 50, r: 12 },
    ];

    blobsRef.current = blobParams.map(p => ({
      ...p,
      x: p.cx,
      y: p.cy,
      radius: p.r,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = 240 / rect.width;
      const scaleY = 135 / rect.height;
      mouseRef.current.x = e.clientX * scaleX;
      mouseRef.current.y = e.clientY * scaleY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const isMobile = window.innerWidth <= 834;

    const animate = () => {
      frameRef.current++;
      const frame = frameRef.current;
      const time = frame * 0.015;
      const blobs = blobsRef.current;
      const mouse = mouseRef.current;
      const lens = lensRef.current;

      // Update blob positions via Lissajous curves
      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i];
        b.x = b.cx + b.sx * Math.sin(b.a * time + b.delta);
        b.y = b.cy + b.sy * Math.sin(b.b * time);
      }

      // Cursor repulsion
      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i];
        const dx = mouse.x - b.x;
        const dy = mouse.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150;
          b.x -= (dx / dist) * force * 2.0;
          b.y -= (dy / dist) * force * 2.0;
        }
      }

      // Mobile auto-drift for lens
      if (isMobile) {
        lens.x = 120 + 40 * Math.sin(time * 0.5);
        lens.y = 67 + 25 * Math.cos(time * 0.4);
      } else {
        // Spring-tween lens toward mouse
        lens.x += (mouse.x - lens.x) * 0.08;
        lens.y += (mouse.y - lens.y) * 0.08;
      }

      // Clear offscreen
      offCtx.fillStyle = '#0D9488';
      offCtx.fillRect(0, 0, 240, 135);

      // Draw metaball field on offscreen
      const lensRadius = 55;
      const lensStrength = 1.0;

      for (let gy = 0; gy < 135; gy += 2) {
        for (let gx = 0; gx < 240; gx += 2) {
          let sum = 0;
          let closestBlobIdx = 0;
          let minDist = Infinity;

          for (let i = 0; i < blobs.length; i++) {
            const b = blobs[i];
            const dx = gx - b.x;
            const dy = gy - b.y;
            const distSq = dx * dx + dy * dy + 0.0001;
            const dist = Math.sqrt(distSq);
            if (dist < minDist) {
              minDist = dist;
              closestBlobIdx = i;
            }
            sum += (b.radius * b.radius) / distSq;
          }

          const ldx = gx - lens.x;
          const ldy = gy - lens.y;
          const lensDist = Math.sqrt(ldx * ldx + ldy * ldy);
          const inLens = lensDist < lensRadius;

          if (inLens) {
            // Fisheye distortion inside lens
            const normalizedDist = lensDist / lensRadius;
            const distortion = 1 + lensStrength * (1 - normalizedDist);
            const sampleX = lens.x + (gx - lens.x) * distortion;
            const sampleY = lens.y + (gy - lens.y) * distortion;

            let distortedSum = 0;
            let dClosestIdx = 0;
            let dMinDist = Infinity;
            for (let i = 0; i < blobs.length; i++) {
              const b = blobs[i];
              const ddx = sampleX - b.x;
              const ddy = sampleY - b.y;
              const dDistSq = ddx * ddx + ddy * ddy + 0.0001;
              const dDist = Math.sqrt(dDistSq);
              if (dDist < dMinDist) {
                dMinDist = dDist;
                dClosestIdx = i;
              }
              distortedSum += (b.radius * b.radius) / dDistSq;
            }

            const fade = 1.0 - (normalizedDist * normalizedDist * 0.5);
            if (distortedSum > 1.2) {
              const sampleDy = sampleY - blobs[dClosestIdx].y;
              if (sampleDy > 0) {
                offCtx.fillStyle = `rgba(20, 184, 166, ${fade})`;
              } else {
                offCtx.fillStyle = `rgba(94, 234, 212, ${fade})`;
              }
              offCtx.fillRect(gx, gy, 2, 2);
            }
          } else if (sum > 1.0) {
            const dy = gy - blobs[closestBlobIdx].y;
            if (dy > 0) {
              offCtx.fillStyle = '#14B8A6';
            } else {
              offCtx.fillStyle = '#5EEAD4';
            }
            offCtx.fillRect(gx, gy, 2, 2);
          }
        }
      }

      // Spawn fizzing particles (2 per frame)
      for (let p = 0; p < 2; p++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 1.5;
        const pr = Math.random() * 45;
        const isGreen = Math.random() < 0.6;
        particlesRef.current.push({
          x: lens.x + Math.cos(angle) * pr * Math.random(),
          y: lens.y + Math.sin(angle) * pr * Math.random(),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 30 + Math.random() * 30,
          maxLife: 30 + Math.random() * 30,
          size: 1 + Math.random() * 2,
          color: isGreen ? '34,197,94' : '20,184,166',
          decay: 1,
        });
      }

      // Update and render particles directly on offscreen (they're inside lens)
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.color === '34,197,94') {
          p.vy -= 0.02;
        }
        p.vy += 0.01;
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = Math.min(1, p.life / 10);
        const pdx = p.x - lens.x;
        const pdy = p.y - lens.y;
        const pDist = Math.sqrt(pdx * pdx + pdy * pdy);
        if (pDist < lensRadius) {
          offCtx.beginPath();
          offCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          offCtx.fillStyle = `rgba(${p.color}, ${alpha})`;
          offCtx.fill();
        }
      }

      // Limit particle count
      if (particles.length > 200) {
        particles.splice(0, particles.length - 200);
      }

      // Draw lens border on offscreen
      offCtx.beginPath();
      offCtx.arc(lens.x, lens.y, lensRadius + 4, 0, Math.PI * 2);
      offCtx.fillStyle = '#0D9488';
      offCtx.fill();
      offCtx.beginPath();
      offCtx.arc(lens.x, lens.y, lensRadius + 5, 0, Math.PI * 2);
      offCtx.strokeStyle = 'rgba(94, 234, 212, 0.7)';
      offCtx.lineWidth = 2;
      offCtx.stroke();

      // Scale offscreen to main canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(offscreen, 0, 0, canvas.width, canvas.height);

      // Add radial gradient vignette on main canvas
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.width * 0.2,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.7
      );
      gradient.addColorStop(0, 'rgba(13, 148, 136, 0)');
      gradient.addColorStop(1, 'rgba(13, 148, 136, 0.5)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
