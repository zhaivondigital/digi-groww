"use client";

/* Liquid amber background: a full-screen fragment shader (domain-warped fbm noise)
   that flows like molten amber over black. Lives in the root layout so it never
   remounts; on route change the bright "hot spot" glides to that page's position.
   Reacts to mouse / device tilt, darkens as you scroll so content stays readable,
   pauses while the logo intro covers the screen. */
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import * as THREE from "three";

// Where the brightest part of the liquid sits per page (shader space, x right / y up)
type Focus = { x: number; y: number; mx: number; my: number };
const FOCUS: Record<string, Focus> = {
  "/": { x: 0.55, y: 0.15, mx: 0.15, my: 0.45 },
  "/about": { x: 0.6, y: 0.3, mx: 0.2, my: 0.5 },
  "/services": { x: -0.55, y: 0.25, mx: -0.15, my: 0.5 },
  "/portfolio": { x: 0.6, y: 0.35, mx: 0.15, my: 0.5 },
  "/testimonials": { x: -0.5, y: 0.3, mx: -0.1, my: 0.5 },
  "/careers": { x: 0.55, y: 0.3, mx: 0.15, my: 0.5 },
};

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uMouse;
  uniform vec2 uFocus;
  uniform float uScroll;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 4; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);
    float t = uTime * 0.05;

    // domain warping: noise feeding noise gives the slow liquid swirl
    vec2 q = vec2(fbm(p * 1.3 + vec2(0.0, t)), fbm(p * 1.3 + vec2(5.2, 1.3) - t));
    vec2 r = vec2(fbm(p * 1.1 + 3.0 * q + vec2(1.7, 9.2) + uMouse * 0.35 + t * 1.5),
                  fbm(p * 1.1 + 3.0 * q + vec2(8.3, 2.8) - t));
    float f = fbm(p * 1.0 + 2.6 * r);

    vec3 black = vec3(0.02, 0.018, 0.016);
    vec3 ember = vec3(0.24, 0.09, 0.0);
    vec3 amber = vec3(0.953, 0.612, 0.071);
    vec3 gold  = vec3(1.0, 0.80, 0.45);

    vec3 col = mix(black, ember, smoothstep(0.25, 0.7, f));
    col = mix(col, amber, smoothstep(0.55, 0.9, f) * 0.9);
    col = mix(col, gold, smoothstep(0.78, 1.0, f) * clamp(length(r) - 0.4, 0.0, 1.0) * 0.6);

    // brighter around the page's focus point, calmer elsewhere (keeps text readable)
    float d = length(p - uFocus);
    col *= 0.28 + 0.95 * smoothstep(1.45, 0.05, d);

    // soft vignette + darken while scrolling into content
    col *= smoothstep(1.7, 0.35, length(p * vec2(0.75, 1.0)));
    col *= 1.0 - uScroll * 0.55;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const focusRef = useRef<Focus>(FOCUS[pathname] ?? FOCUS["/"]);

  useEffect(() => {
    focusRef.current = FOCUS[pathname] ?? FOCUS["/"];
  }, [pathname]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 820px)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "high-performance" });
    } catch {
      canvas.style.display = "none"; // CSS gradient fallback shows instead
      return;
    }
    // The gradient is soft, so render below native resolution: much cheaper, looks identical
    const scale = isMobile ? 0.4 : 0.5;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2) * scale);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const size = new THREE.Vector2();
    renderer.getDrawingBufferSize(size);

    const f0 = focusRef.current;
    const focus = new THREE.Vector2(isMobile ? f0.mx : f0.x, isMobile ? f0.my : f0.y);
    const uniforms = {
      uTime: { value: 0 },
      uRes: { value: size.clone() },
      uMouse: { value: new THREE.Vector2() },
      uFocus: { value: focus },
      uScroll: { value: 0 },
    };
    const geo = new THREE.PlaneGeometry(2, 2);
    const mat = new THREE.ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, uniforms, depthTest: false, depthWrite: false });
    scene.add(new THREE.Mesh(geo, mat));

    // Interaction
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let scrollT = 0;
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      pointer.tx = Math.max(-1, Math.min(1, e.gamma / 30));
      pointer.ty = Math.max(-1, Math.min(1, -(e.beta - 45) / 30));
    };
    const onScroll = () => { scrollT = Math.min(window.scrollY / window.innerHeight, 1); };
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.getDrawingBufferSize(size);
      uniforms.uRes.value.copy(size);
      if (reduceMotion) render(8);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();

    type DOE = typeof DeviceOrientationEvent & { requestPermission?: () => Promise<string> };
    const DO = (typeof DeviceOrientationEvent !== "undefined" ? DeviceOrientationEvent : undefined) as DOE | undefined;
    let askTilt: (() => void) | null = null;
    if (isMobile && DO) {
      if (typeof DO.requestPermission === "function") {
        askTilt = () => {
          DO.requestPermission!().then((s) => { if (s === "granted") window.addEventListener("deviceorientation", onTilt, { passive: true }); }).catch(() => {});
        };
        window.addEventListener("touchend", askTilt, { once: true });
      } else {
        window.addEventListener("deviceorientation", onTilt, { passive: true });
      }
    }

    function render(t: number) {
      pointer.x += (pointer.tx - pointer.x) * 0.03;
      pointer.y += (pointer.ty - pointer.y) * 0.03;
      const F = focusRef.current;
      const fx = (isMobile ? F.mx : F.x) + pointer.x * 0.12;
      const fy = (isMobile ? F.my : F.y) + pointer.y * 0.08;
      focus.x += (fx - focus.x) * 0.03;
      focus.y += (fy - focus.y) * 0.03;
      uniforms.uTime.value = t;
      uniforms.uMouse.value.set(pointer.x, pointer.y);
      uniforms.uScroll.value += (scrollT - uniforms.uScroll.value) * 0.08;
      renderer.render(scene, camera);
    }

    const t0 = performance.now();
    const root = document.documentElement;
    let raf = 0;
    let running = true;
    // Perf: the liquid is fully hidden (opacity 0) on amber/light sections, so skip drawing there;
    // elsewhere cap at ~30fps. The flow is slow, so it looks the same but leaves the main thread free for scrolling.
    let last = 0;
    const tick = (now: number = performance.now()) => {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      const th = document.body.dataset.theme;
      if (th === "amber" || th === "light") return;
      if (now - last < 32) return;
      last = now;
      render((now - t0) / 1000 + 8);
    };
    const onVis = () => {
      running = !document.hidden;
      if (running && !reduceMotion) { cancelAnimationFrame(raf); tick(); }
    };
    document.addEventListener("visibilitychange", onVis);

    if (reduceMotion) render(8);
    else tick();
    root.dataset.webgl = "on";

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("deviceorientation", onTilt);
      if (askTilt) window.removeEventListener("touchend", askTilt);
      document.removeEventListener("visibilitychange", onVis);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      delete root.dataset.webgl;
    };
  }, []);

  return <canvas id="bg3d" ref={canvasRef} aria-hidden="true" />;
}
