import { useEffect, useRef } from "react";

const GlobalImageNumbering = () => {
  const overlaysRef = useRef<Map<HTMLImageElement, HTMLSpanElement>>(new Map());

  useEffect(() => {
    const numberImages = () => {
      const images = document.querySelectorAll<HTMLImageElement>(
        "img:not([data-no-number])"
      );

      // Remove stale overlays
      const currentImages = new Set(images);
      overlaysRef.current.forEach((overlay, img) => {
        if (!currentImages.has(img) || !document.contains(img)) {
          overlay.remove();
          overlaysRef.current.delete(img);
        }
      });

      let counter = 1;
      images.forEach((img) => {
        // Skip tiny images (icons, avatars, etc.)
        const rect = img.getBoundingClientRect();
        if (rect.width < 40 || rect.height < 40) {
          const existing = overlaysRef.current.get(img);
          if (existing) {
            existing.remove();
            overlaysRef.current.delete(img);
          }
          return;
        }

        // Set lazy loading on all content images
        if (!img.loading) {
          img.loading = 'lazy';
        }

        // Skip placeholder.svg and external URLs that aren't photos
        const src = img.src || "";
        if (src.includes("placeholder.svg") || src.includes("data:image/svg")) {
          return;
        }

        const id = counter++;

        if (overlaysRef.current.has(img)) {
          // Update existing overlay number
          const overlay = overlaysRef.current.get(img)!;
          overlay.textContent = `#${id}`;
          return;
        }

        // Ensure parent is positioned
        const parent = img.parentElement;
        if (!parent) return;
        const parentStyle = getComputedStyle(parent);
        if (parentStyle.position === "static") {
          parent.style.position = "relative";
        }

        // Create overlay
        const span = document.createElement("span");
        span.textContent = `#${id}`;
        span.style.cssText = `
          position: absolute;
          top: 4px;
          right: 4px;
          background: rgba(0,0,0,0.7);
          color: white;
          font-size: 10px;
          font-family: monospace;
          padding: 1px 5px;
          border-radius: 4px;
          z-index: 20;
          pointer-events: none;
          line-height: 1.4;
        `;
        parent.appendChild(span);
        overlaysRef.current.set(img, span);
      });
    };

    // Initial run after a short delay to let images render
    const timeout = setTimeout(numberImages, 1000);

    // Re-run on DOM changes and scroll (lazy loaded images)
    const observer = new MutationObserver(() => {
      setTimeout(numberImages, 300);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("scroll", numberImages, { passive: true });
    window.addEventListener("resize", numberImages, { passive: true });

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
      window.removeEventListener("scroll", numberImages);
      window.removeEventListener("resize", numberImages);
      overlaysRef.current.forEach((overlay) => overlay.remove());
      overlaysRef.current.clear();
    };
  }, []);

  return null;
};

export default GlobalImageNumbering;
