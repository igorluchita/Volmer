"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

export function ContactRequestForm() {
  const t = useTranslations("HomePage.contact");
  const [showNotice, setShowNotice] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowNotice(true);
  }

  return (
    <aside className="hp-contact-card">
      <h3>{t("formTitle")}</h3>
      <p>{t("formIntro")}</p>
      <form className="hp-contact-form" onSubmit={handleSubmit}>
        <label>
          <span>{t("nameLabel")}</span>
          <input name="name" type="text" autoComplete="name" placeholder={t("namePlaceholder")} required />
        </label>
        <label>
          <span>{t("phoneLabel")}</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder={t("phonePlaceholder")} required />
        </label>
        <label>
          <span>{t("emailOptional")}</span>
          <input name="email" type="email" autoComplete="email" placeholder={t("emailPlaceholder")} />
        </label>
        <label>
          <span>{t("messageLabel")}</span>
          <textarea name="message" rows={3} placeholder={t("messagePlaceholder")} />
        </label>
        <button className="hp-button hp-button-primary" type="submit">{t("formSubmit")}</button>
      </form>
      <small aria-live="polite">{showNotice ? t("formNotConnected") : t("formNote")}</small>
    </aside>
  );
}
