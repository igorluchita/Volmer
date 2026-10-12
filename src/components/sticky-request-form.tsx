"use client";

import type { FormEvent } from "react";

type StickyRequestFormProps = {
  namePlaceholder: string;
  phonePlaceholder: string;
  submitLabel: string;
  formLabel: string;
};

export function StickyRequestForm({
  namePlaceholder,
  phonePlaceholder,
  submitLabel,
  formLabel,
}: StickyRequestFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const contactForm = document.querySelector<HTMLFormElement>("#booking-form .hp-contact-form");
    if (!contactForm) return;

    const stickyData = new FormData(event.currentTarget);
    const name = contactForm.elements.namedItem("firstName");
    const phone = contactForm.elements.namedItem("phone");
    if (name instanceof HTMLInputElement) name.value = String(stickyData.get("name") ?? "");
    if (phone instanceof HTMLInputElement) phone.value = String(stickyData.get("phone") ?? "");
    document.querySelector("#booking-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <form className="sticky-callbar-form" onSubmit={handleSubmit} aria-label={formLabel}>
      <input name="name" type="text" inputMode="text" autoComplete="name" aria-label={namePlaceholder} placeholder={namePlaceholder} required />
      <input name="phone" type="tel" inputMode="tel" autoComplete="tel" aria-label={phonePlaceholder} placeholder={phonePlaceholder} required />
      <button className="hp-button hp-button-primary" type="submit">{submitLabel}</button>
    </form>
  );
}
