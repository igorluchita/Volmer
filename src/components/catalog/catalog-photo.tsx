"use client";

import Image from "next/image";
import { useRef } from "react";
import type { PointerEvent } from "react";
import type { ProductImage } from "@/catalog/types";

export function CatalogPhoto({
  image,
  alt,
  sizes,
  priority = false,
}: {
  image: ProductImage;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  const frame = useRef<HTMLSpanElement>(null);
  const move = (event: PointerEvent<HTMLSpanElement>) => {
    if (!frame.current) return;
    const rect = frame.current.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
    frame.current.style.setProperty("--photo-x", `${(x * 5).toFixed(1)}px`);
    frame.current.style.setProperty("--photo-y", `${(y * 5).toFixed(1)}px`);
    frame.current.style.setProperty("--photo-rotate", `${(x * 0.6).toFixed(2)}deg`);
  };
  const reset = () => {
    frame.current?.style.setProperty("--photo-x", "0px");
    frame.current?.style.setProperty("--photo-y", "0px");
    frame.current?.style.setProperty("--photo-rotate", "0deg");
  };
  return (
    <span className="vc-catalog-photo" ref={frame} onPointerDown={move} onPointerMove={move} onPointerLeave={reset} onPointerUp={reset} onPointerCancel={reset}>
      <Image src={image.src} alt={alt} width={image.width} height={image.height} sizes={sizes} priority={priority} />
    </span>
  );
}
