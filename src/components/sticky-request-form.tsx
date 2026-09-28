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
    const contactForm = document.querySelector<HTMLFormElement>("#contact .hp-contact-form");
    if (!contactForm) return;

    const stickyData = new FormData(event.currentTarget);
    const name = contactForm.elements.namedItem("name");
    const phone = contactForm.elements.namedItem("phone");
    if (name instanceof HTMLInputElement) name.value = String(stickyData.get("name") ?? "");
    if (phone instanceof HTMLInputElement) phone.value = String(stickyData.get("phone") ?? "");
    document.querySelector("#contact .hp-contact-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <form className="sticky-callbar-form" onSubmit={handleSubmit} aria-label={formLabel}>
      <input name="name" autoComplete="name" placeholder={namePlaceholder} required />
      <input name="phone" type="tel" autoComplete="tel" placeholder={phonePlaceholder} required />
      <button className="hp-button hp-button-primary" type="submit">{submitLabel}</button>
    </form>
  );
}
