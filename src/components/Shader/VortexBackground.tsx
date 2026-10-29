"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function VortexBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();

    // 🌫️ subtle fog (depth illusion)
    scene.fog = new THREE.Fog(0x000000, 2, 10);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // 🌌 particles (clean cinematic dust)
    const count = 1800;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 8;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.012,
      color: 0xa855f7,
      transparent: true,
      opacity: 0.7,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // 🖱️ smooth mouse
    const mouse = new THREE.Vector2(0, 0);
    const smooth = new THREE.Vector2(0, 0);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 🌀 scroll parallax
    let scrollTarget = 0;
    let scrollSmooth = 0;

    const handleScroll = () => {
      scrollTarget = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const animate = () => {
      requestAnimationFrame(animate);

      // 🌊 ultra smooth interpolation
      smooth.x += (mouse.x - smooth.x) * 0.03;
      smooth.y += (mouse.y - smooth.y) * 0.03;

      scrollSmooth += (scrollTarget - scrollSmooth) * 0.05;

      const pos = points.geometry.attributes.position as THREE.BufferAttribute;

      for (let i = 0; i < pos.count; i++) {
        const ix = i * 3;

        const x = pos.array[ix];
        const y = pos.array[ix + 1];

        const dx = x - smooth.x * 2.2;
        const dy = y - smooth.y * 2.2;

        const dist = Math.sqrt(dx * dx + dy * dy);

        const force = 0.0007 / (dist + 0.25);

        pos.array[ix] -= dx * force;
        pos.array[ix + 1] -= dy * force;

        pos.array[ix + 2] += Math.sin(dist * 1.2) * 0.0004;
      }

      pos.needsUpdate = true;

      // 🌀 cinematic slow rotation
      points.rotation.y += 0.0004;
      points.rotation.x += 0.0002;

      // 🎥 ultra smooth camera follow (mouse)
      camera.position.x += (smooth.x * 1.2 - camera.position.x) * 0.02;
      camera.position.y +=
        (-smooth.y * 1.2 - scrollSmooth * 0.0025 - camera.position.y) * 0.02;

      // 🎬 scroll-driven dolly (camera pulls back slightly deeper)
      const targetZ = 6 + scrollSmooth * 0.002;
      camera.position.z += (targetZ - camera.position.z) * 0.03;

      // 🌀 scroll-driven scene rotation for extra depth
      points.rotation.z = scrollSmooth * 0.0002;

      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 -z-10" />;
}