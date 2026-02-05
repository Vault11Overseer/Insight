// frontend/src/components/module/Slideshow.jsx
// SLIDESHOW

// IMPORT
import React, { useState, useEffect } from "react";

// EXPORT SLIDESHOW IMAGES
export const introSlides = [
  {
    image: "/slideshow_images/winter-at-the-strater.jpg",
    title: "Photo Gallery App",
    subtitle: "For all BCI users",
  },
  {
    image: "/slideshow_images/durango_road.jpg",
    title: "Share Images",
    subtitle: "Stay connected",
  },
  {
    image: "/slideshow_images/durango_train.jpg",
    title: "Data Insights",
    subtitle: "Drive decisions",
  },
];

// EXPORT SLIDESHOW
export default function Slideshow({
  slides = [],
  darkMode = true,
  containerHeight = "80vh",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // AUTO-ROTATE SLIDES
  useEffect(() => {
    if (!slides.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides]);

  // SAFETY GUARD
  if (!slides.length || !slides[currentIndex]) return null;

  const { image, title, subtitle } = slides[currentIndex];

  return (
    <div
      className="slideshow-container"
      // style={{ height: containerHeight }}
    >
      {/* SLIDE IMAGE */}
      <img
        src={image}
        alt={`slide-${currentIndex}`}
        className="slideshow-image"
      />

      {/* LOGO */}
      <div
        className={`slideshow-overlay slideshow-logo ${
          darkMode
            ? "slideshow-overlay-dark"
            : "slideshow-overlay-light"
        }`}
      >
        <img
          src="/bci-favicon-green.ico"
          alt="BCI Logo"
          className="inline-block w-6 h-6 mr-2 align-middle"
        />
        INSIGHT - BCI Media.
      </div>

      {/* CAPTION */}
      <div
        className={`slideshow-overlay slideshow-caption ${
          darkMode
            ? "slideshow-overlay-dark"
            : "slideshow-overlay-light"
        }`}
      >
        <p className="slideshow-text">
          {title}
          <br />
          {subtitle}
        </p>
      </div>

      {/* DOTS */}
      <div className="slideshow-dots">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`slideshow-dot ${
              idx === currentIndex
                ? "slideshow-dot-active"
                : "slideshow-dot-inactive"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
