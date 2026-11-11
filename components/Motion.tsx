"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EASE = "expo.out";

/*
 * Site-wide motion, driven by data attributes so components stay declarative:
 *   data-hero-voice / data-word / data-hero-rest → hero intro timeline on load
 *   data-cursor-glow   → glow that follows the pointer inside the hero
 *   data-scrub-out     → fades and shrinks away as the hero scrolls off
 *   section h2         → headings wipe up into view
 *   data-reveal        → element fades / rises in when scrolled into view
 *   data-stagger       → direct children reveal one after another
 *   data-zoom          → scales up into place, tied to scroll position
 *   data-parallax="n"  → drifts n% while crossing the viewport
 *   data-magnetic      → leans towards the cursor on hover
 */
export default function Motion() {
  useGSAP(() => {
    const root = document.documentElement;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Smooth, weighted scrolling that drives ScrollTrigger
      const lenis = new Lenis({ lerp: 0.09, anchors: { offset: -72 } });
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      // Hero intro
      gsap
        .timeline({ defaults: { ease: EASE } })
        .fromTo("header", { autoAlpha: 0, y: -16 }, { autoAlpha: 1, y: 0, duration: 1, clearProps: "transform" })
        .fromTo("[data-hero-voice]", { autoAlpha: 0, scale: 0.9, filter: "blur(12px)" }, { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 1.4, clearProps: "transform,filter" }, 0.1)
        .fromTo("[data-word]", { autoAlpha: 0, yPercent: 110, rotate: 4 }, { autoAlpha: 1, yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.06, clearProps: "transform" }, 0.3)
        .fromTo("[data-hero-rest]", { autoAlpha: 0, y: 32, filter: "blur(10px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.2, stagger: 0.12, clearProps: "transform,filter" }, 0.8)
        .fromTo("[data-cursor-glow]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.5 }, 0.6);

      // Cursor-following glow
      const glow = document.querySelector<HTMLElement>("[data-cursor-glow]");
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      let onMove: ((e: PointerEvent) => void) | undefined;
      if (glow && hero) {
        const gx = gsap.quickTo(glow, "x", { duration: 1.2, ease: "power3.out" });
        const gy = gsap.quickTo(glow, "y", { duration: 1.2, ease: "power3.out" });
        const r = glow.offsetWidth / 2;
        gsap.set(glow, { x: hero.offsetWidth / 2 - r, y: 120 - r });
        onMove = (e) => {
          const b = hero.getBoundingClientRect();
          gx(e.clientX - b.left - r);
          gy(e.clientY - b.top - r);
        };
        hero.addEventListener("pointermove", onMove);
      }

      // Hero voice drifts away as you scroll past
      gsap.fromTo("[data-scrub-out]", { autoAlpha: 1, scale: 1, y: 0 }, {
        autoAlpha: 0.15,
        scale: 0.86,
        y: -40,
        ease: "none",
        immediateRender: false,
        scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "45% top", scrub: 0.6 },
      });

      // Section headings wipe up
      gsap.utils.toArray<HTMLElement>("section h2").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)", y: 40 },
          { clipPath: "inset(0 0 -20% 0)", y: 0, duration: 1.3, ease: EASE, clearProps: "clipPath,transform", scrollTrigger: { trigger: el, start: "top 90%", once: true } }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 56, filter: "blur(10px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.3, ease: EASE, clearProps: "transform,filter", scrollTrigger: { trigger: el, start: "top 88%", once: true } }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
        gsap.fromTo(
          el.children,
          { autoAlpha: 0, y: 36 },
          { autoAlpha: 1, y: 0, duration: 1.1, ease: EASE, stagger: 0.08, clearProps: "transform", scrollTrigger: { trigger: el, start: "top 86%", once: true } }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-zoom]").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.88, y: 80, autoAlpha: 0.2 },
          { scale: 1, y: 0, autoAlpha: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "top 35%", scrub: 0.8 } }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.to(el, {
          yPercent: Number(el.dataset.parallax) || -12,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
        });
      });

      // Magnetic buttons
      const cleanups: (() => void)[] = [];
      gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
        const mx = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
        const my = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const b = el.getBoundingClientRect();
          mx((e.clientX - b.left - b.width / 2) * 0.25);
          my((e.clientY - b.top - b.height / 2) * 0.35);
        };
        const leave = () => {
          mx(0);
          my(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });

      return () => {
        gsap.ticker.remove(raf);
        lenis.destroy();
        if (hero && onMove) hero.removeEventListener("pointermove", onMove);
        cleanups.forEach((fn) => fn());
      };
    });

    // Initial states are now set inline by GSAP (or skipped for reduced motion) — drop the pre-paint hide.
    root.classList.remove("motion-pending");
    return () => mm.revert();
  });

  return null;
}
