"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import type { CatalogLocale, ProductImage } from "@/catalog/types";

export function ProductGallery({ images, locale, label, noImage }: {
  images: ProductImage[];
  locale: CatalogLocale;
  label: string;
  noImage: string;
}) {
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    if (zoomOpen && dialog.current && !dialog.current.open) dialog.current.showModal();
  }, [zoomOpen]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => { reducedMotion.current = media.matches; };
    syncMotion();
    media.addEventListener("change", syncMotion);

    let frame = 0;
    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const element = stage.current;
        if (!element || reducedMotion.current) return;
        const rect = element.getBoundingClientRect();
        const viewportMiddle = window.innerHeight / 2;
        const progress = Math.max(-1, Math.min(1, (viewportMiddle - (rect.top + rect.height / 2)) / viewportMiddle));
        element.style.setProperty("--gallery-scroll", `${(progress * 10).toFixed(1)}px`);
      });
    };
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    updateScroll();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      media.removeEventListener("change", syncMotion);
    };
  }, []);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion.current || !stage.current) return;
    const rect = stage.current.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
    stage.current.style.setProperty("--gallery-x", `${(x * 6).toFixed(1)}px`);
    stage.current.style.setProperty("--gallery-y", `${(y * 6).toFixed(1)}px`);
    stage.current.style.setProperty("--gallery-rotate", `${(x * 0.8).toFixed(2)}deg`);
  };

  const reset = () => {
    if (!stage.current) return;
    stage.current.style.setProperty("--gallery-x", "0px");
    stage.current.style.setProperty("--gallery-y", "0px");
    stage.current.style.setProperty("--gallery-rotate", "0deg");
  };

  return (
    <div className="vc-product-gallery" aria-label={label}>
      <div className="vc-product-stage" ref={stage} onPointerDown={move} onPointerMove={move} onPointerLeave={reset} onPointerUp={reset} onPointerCancel={reset}>
        <div className="vc-product-stage-glow" aria-hidden="true" />
        {images.length ? (
          <button type="button" className="vc-product-image-trigger" onClick={() => setZoomOpen(true)} aria-label={locale === "ro" ? "Mărește fotografia produsului" : "Увеличить фотографию товара"}>
            <figure key={images[active].src} className="vc-product-stage-figure">
              <Image
                src={images[active].src}
                alt={images[active].alt[locale]}
                width={images[active].width}
                height={images[active].height}
                sizes="(max-width: 780px) 100vw, 58vw"
                priority={active === 0}
              />
            </figure>
            <span className="vc-product-zoom-mark" aria-hidden="true"><span className="vc-product-zoom-icon">⤢</span>{images.length > 1 && <span className="vc-product-counter">{String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>}</span>
          </button>
        ) : <div className="vc-gallery-empty vc-placeholder">{noImage}</div>}
      </div>
      {images.length > 1 && (
        <div className="vc-product-thumbs" aria-label={label}>
          {images.map((image, index) => (
            <button
              type="button"
              key={`${image.src}-${index}`}
              className={`vc-product-thumb${index === active ? " is-active" : ""}`}
              onClick={() => { setActive(index); reset(); }}
              aria-label={`${locale === "ro" ? "Afișează imaginea" : "Показать изображение"} ${index + 1}`}
              aria-pressed={index === active}
            >
              <Image src={image.src} alt="" width={image.width} height={image.height} sizes="88px" />
            </button>
          ))}
        </div>
      )}
      {zoomOpen && images[active] && <dialog className="vc-product-lightbox" ref={dialog} onClose={() => setZoomOpen(false)} onClick={(event) => { if (event.target === dialog.current) dialog.current?.close(); }}>
        <button type="button" className="vc-product-lightbox-close" onClick={() => dialog.current?.close()} aria-label={locale === "ro" ? "Închide fotografia mărită" : "Закрыть увеличенное фото"}>×</button>
        <Image src={images[active].src} alt={images[active].alt[locale]} width={images[active].width} height={images[active].height} sizes="92vw" priority />
        <p>{images[active].alt[locale]}</p>
      </dialog>}
    </div>
  );
}
