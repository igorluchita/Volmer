"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, CheckCircle2, LoaderCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { appointmentConfig } from "@/config/appointments";
import { dateInTimeZone } from "@/lib/appointments/availability";
import { normalizeInternationalPhone } from "@/lib/appointments/validation";
import { appointmentPhoneCountries, type AppointmentPhoneCountryCode } from "@/config/phone-countries";

type MonthAvailability = Record<string, string[]>;
type AvailabilityState = { requestKey: string; availability: MonthAvailability; failed: boolean };
type BookingSuccess = { date: string; time: string };

function alignBookingCard(card: HTMLElement | null, behavior: ScrollBehavior) {
  if (!card) return;
  const headerBottom = document.querySelector<HTMLElement>(".site-header")
    ?.getBoundingClientRect().bottom ?? 0;
  const targetTop = Math.max(0, headerBottom) + 12;
  window.scrollBy({ top: card.getBoundingClientRect().top - targetTop, behavior });
}

export function ContactRequestForm() {
  const t = useTranslations("HomePage.contact");
  const booking = useTranslations("HomePage.contact.booking");
  const locale = useLocale();
  const today = dateInTimeZone(new Date());
  const [visibleMonth, setVisibleMonth] = useState(today.slice(0, 7));
  const [refreshVersion, setRefreshVersion] = useState(0);
  const requestKey = `${visibleMonth}:${refreshVersion}`;
  const [availabilityState, setAvailabilityState] = useState<AvailabilityState>({
    requestKey: "",
    availability: {},
    failed: false,
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState<AppointmentPhoneCountryCode>("+373");
  const [appointmentFor, setAppointmentFor] = useState<"self" | "parent" | "">("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState<BookingSuccess | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const cardRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const initialRenderRef = useRef(true);
  const loadingMonth = availabilityState.requestKey !== requestKey;
  const availabilityFailed = !loadingMonth && availabilityState.failed;
  const availability = loadingMonth ? {} : availabilityState.availability;

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    const observer = new IntersectionObserver(([entry]) => {
      document.body.classList.toggle("hp-contact-visible", entry.isIntersecting);
    });
    observer.observe(contact);
    return () => {
      observer.disconnect();
      document.body.classList.remove("hp-contact-visible");
    };
  }, []);

  useLayoutEffect(() => {
    const alignHashTarget = (behavior: ScrollBehavior) => {
      if (window.location.hash !== "#booking-form") return;
      window.requestAnimationFrame(() => alignBookingCard(cardRef.current, behavior));
    };
    const handleHashChange = () => alignHashTarget(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    );

    alignHashTarget("auto");
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const monthDate = useMemo(() => {
    const [year, month] = visibleMonth.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, 1, 12));
  }, [visibleMonth]);
  const monthTitle = new Intl.DateTimeFormat(locale === "ru" ? "ru-MD" : "ro-MD", {
    month: "long",
    year: "numeric",
    timeZone: appointmentConfig.timeZone,
  }).format(monthDate);
  const [year, month] = visibleMonth.split("-").map(Number);
  const daysCount = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const firstDayOffset = (new Date(Date.UTC(year, month - 1, 1)).getUTCDay() + 6) % 7;
  const calendarDays = [
    ...Array.from({ length: firstDayOffset }, (_, index) => ({ key: `empty-${index}`, date: "" })),
    ...Array.from({ length: daysCount }, (_, index) => ({
      key: `${visibleMonth}-${index + 1}`,
      date: `${visibleMonth}-${String(index + 1).padStart(2, "0")}`,
    })),
  ];
  const dayCells = [
    ...calendarDays,
    ...Array.from({ length: 42 - calendarDays.length }, (_, index) => ({
      key: `trailing-empty-${index}`,
      date: "",
    })),
  ];

  useLayoutEffect(() => {
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;

      const headerBottom = document.querySelector<HTMLElement>(".site-header")
        ?.getBoundingClientRect().bottom ?? 0;
      const targetTop = Math.max(0, headerBottom) + 12;
      const cardTop = card.getBoundingClientRect().top;

      if (cardTop < targetTop - 1) {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        alignBookingCard(card, reduceMotion ? "auto" : "smooth");
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [step, success]);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/appointments/availability/?month=${visibleMonth}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("availability");
        return response.json() as Promise<{ availability?: MonthAvailability }>;
      })
      .then((result) => setAvailabilityState({
        requestKey,
        availability: result.availability ?? {},
        failed: false,
      }))
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        setAvailabilityState({ requestKey, availability: {}, failed: true });
      })

    return () => controller.abort();
  }, [visibleMonth, refreshVersion, requestKey]);

  const selectedSlots = selectedDate ? availability[selectedDate] ?? [] : [];
  const selectedDateLabel = selectedDate
    ? new Intl.DateTimeFormat(locale === "ru" ? "ru-MD" : "ro-MD", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: appointmentConfig.timeZone,
      }).format(new Date(`${selectedDate}T12:00:00Z`))
    : "";

  function changeMonth(amount: number) {
    const next = new Date(Date.UTC(year, month - 1 + amount, 1, 12));
    setSelectedDate("");
    setSelectedTime("");
    setSubmitError("");
    setVisibleMonth(`${next.getUTCFullYear()}-${String(next.getUTCMonth() + 1).padStart(2, "0")}`);
  }

  function chooseDate(date: string) {
    setSelectedDate(date);
    setSelectedTime("");
    setSubmitError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step !== 3 || !selectedDate || !selectedTime || submitting) return;
    setSubmitting(true);
    setSubmitError("");
    const payload = {
      name,
      phone,
      phoneCountryCode,
      appointmentFor,
      date: selectedDate,
      time: selectedTime,
      message: "",
      website: honeypot,
    };

    try {
      const response = await fetch("/api/appointments/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json() as { error?: string; date?: string; time?: string };
      if (!response.ok) {
        if (result.error === "slot_unavailable") {
          setSubmitError(booking("slotConflict"));
          setSelectedTime("");
          setStep(2);
          setRefreshVersion((current) => current + 1);
        } else if (result.error === "rate_limited") {
          setSubmitError(booking("rateLimited"));
        } else if (result.error === "invalid_form") {
          setSubmitError(booking("invalidForm"));
        } else {
          setSubmitError(booking("submitError"));
        }
        return;
      }
      setSuccess({ date: result.date ?? selectedDate, time: result.time ?? selectedTime });
    } catch {
      setSubmitError(booking("submitError"));
    } finally {
      setSubmitting(false);
    }
  }

  function resetBooking() {
    setSuccess(null);
    setSelectedDate("");
    setSelectedTime("");
    setStep(1);
    setName("");
    setPhone("");
    setAppointmentFor("");
    setHoneypot("");
    setSubmitError("");
    setRefreshVersion((current) => current + 1);
  }

  function continueToSchedule() {
    if (!isValidName(name) || !normalizeInternationalPhone(phone, phoneCountryCode) || !appointmentFor) {
      setSubmitError(booking("invalidForm"));
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    setSubmitError("");
    setStep(2);
  }

  function continueToConfirmation() {
    if (!selectedDate || !selectedTime) return;
    setSubmitError("");
    setStep(3);
  }

  function returnToSchedule() {
    setSelectedDate("");
    setSelectedTime("");
    setSubmitError("");
    setStep(2);
  }

  function isValidName(value: string) {
    const clean = value.replace(/\s+/g, " ").trim();
    return clean.length >= 1 && clean.length <= 80 && /^[\p{L}\p{M} .'-]+$/u.test(clean);
  }

  const invalidDetails = step === 1 && submitError === booking("invalidForm");
  const invalidAppointmentFor = invalidDetails && !appointmentFor;

  return (
    <aside ref={cardRef} className="hp-contact-card" id="booking-form">
      <div className="booking-card-intro">
        <h3>{t("formTitle")}</h3>
        <p>{t("formIntro")}</p>
      </div>
      {!success && <ol className="booking-steps" aria-label={booking("stepsLabel")}>
        {[booking("stepDetails"), booking("stepSchedule"), booking("stepConfirm")].map((label, index) => <li className={step === index + 1 ? "is-active" : step > index + 1 ? "is-complete" : undefined} aria-current={step === index + 1 ? "step" : undefined} key={label}><span>{index + 1}</span>{label}</li>)}
      </ol>}

      {success ? (
        <div className="booking-success" role="status" aria-live="polite">
          <CheckCircle2 size={34} aria-hidden="true" />
          <h4>{booking("confirmedTitle")}</h4>
          <p>{booking("confirmedText", {
            date: new Intl.DateTimeFormat(locale === "ru" ? "ru-MD" : "ro-MD", {
              day: "numeric", month: "long", year: "numeric", timeZone: appointmentConfig.timeZone,
            }).format(new Date(`${success.date}T12:00:00Z`)),
            time: success.time,
          })}</p>
          <p className="booking-confirmed-reminder">{booking("confirmedReminder")}</p>
          <p className="booking-phone-prompt">{booking("phonePrompt")}</p>
          <a className="booking-phone" href={`tel:${siteConfig.phoneInternational}`}>
            <Phone size={17} aria-hidden="true" /> {siteConfig.phoneDisplay}
          </a>
          <button className="booking-another" type="button" onClick={resetBooking}>
            {booking("bookAnother")}
          </button>
        </div>
      ) : (
        <form ref={formRef} className="hp-contact-form" onSubmit={handleSubmit} aria-busy={submitting}>
          {step === 1 && <section className="booking-step-panel" aria-labelledby="booking-details-title">
            <h4 id="booking-details-title" className="booking-panel-title">{booking("stepDetails")}</h4>
            <label>
              <span>{t("nameLabel")}</span>
              <input name="name" type="text" autoComplete="name" maxLength={80} value={name} onChange={(event) => { setName(event.target.value); setSubmitError(""); }} required aria-invalid={invalidDetails && !isValidName(name)} aria-describedby={invalidDetails && !isValidName(name) ? "booking-error" : undefined} />
            </label>
            <label>
              <span>{t("phoneLabel")}</span>
              <div className="booking-phone-inputs">
                <select name="phoneCountryCode" aria-label={booking("phoneCountryCode")} autoComplete="tel-country-code" value={phoneCountryCode} onChange={(event) => { setPhoneCountryCode(event.target.value as AppointmentPhoneCountryCode); setSubmitError(""); }}>
                  {appointmentPhoneCountries.map((country) => <option key={country.code} value={country.code}>{country.flag} {country[locale === "ru" ? "ru" : "ro"]} ({country.code})</option>)}
                </select>
                <input name="phone" type="tel" autoComplete="tel-national" inputMode="tel" maxLength={40} placeholder={t("phonePlaceholder")} value={phone} onChange={(event) => { setPhone(event.target.value); setSubmitError(""); }} required aria-invalid={invalidDetails && !normalizeInternationalPhone(phone, phoneCountryCode)} aria-describedby={invalidDetails && !normalizeInternationalPhone(phone, phoneCountryCode) ? "booking-error" : undefined} />
              </div>
            </label>
            <fieldset className="booking-for-fieldset" aria-describedby={invalidAppointmentFor ? "booking-error" : undefined}>
              <legend>{booking("appointmentForQuestion")}</legend>
              <label className="booking-for-option">
                <input type="radio" name="appointmentFor" value="self" checked={appointmentFor === "self"} required aria-describedby={invalidAppointmentFor ? "booking-error" : undefined} onChange={() => { setAppointmentFor("self"); setSubmitError(""); }} />
                <span>{booking("appointmentForSelf")}</span>
              </label>
              <label className="booking-for-option">
                <input type="radio" name="appointmentFor" value="parent" checked={appointmentFor === "parent"} aria-describedby={invalidAppointmentFor ? "booking-error" : undefined} onChange={() => { setAppointmentFor("parent"); setSubmitError(""); }} />
                <span>{booking("appointmentForParent")}</span>
              </label>
            </fieldset>
            <button className="hp-button hp-button-primary" type="button" onClick={continueToSchedule}>{booking("nextToSchedule")}</button>
          </section>}

          {step === 2 && <section className="booking-step-panel" aria-labelledby="booking-schedule-title">
          <h4 id="booking-schedule-title" className="booking-panel-title">{booking("stepSchedule")}</h4>
          <div className="booking-schedule">
          <fieldset className="booking-date-fieldset" aria-label={booking("calendarLabel")}>
            <legend>{t("dateLabel")}</legend>
            <div className="booking-calendar">
              <div className="booking-calendar-heading">
                <button type="button" onClick={() => changeMonth(-1)} disabled={visibleMonth <= today.slice(0, 7)} aria-label={booking("previousMonth")}>
                  <ArrowLeft size={17} aria-hidden="true" />
                </button>
                <strong aria-live="polite" aria-atomic="true">{monthTitle}</strong>
                <button type="button" onClick={() => changeMonth(1)} aria-label={booking("nextMonth")}>
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              </div>
              <div className="booking-calendar-grid" role="group" aria-label={`${booking("calendarLabel")}: ${monthTitle}`}>
                {(booking.raw("weekdays") as string[]).map((weekday, index) => (
                  <span className="booking-weekday" key={weekday + index}>{weekday}</span>
                ))}
                {dayCells.map(({ key, date }) => {
                  if (!date) return <span className="booking-empty-day" key={key} aria-hidden="true" />;
                  const available = availability[date]?.length > 0;
                  const disabled = loadingMonth || availabilityFailed || !available || date < today;
                  const dateLabel = new Intl.DateTimeFormat(locale === "ru" ? "ru-MD" : "ro-MD", {
                    dateStyle: "full", timeZone: appointmentConfig.timeZone,
                  }).format(new Date(`${date}T12:00:00Z`));
                  return (
                    <button
                      className={`booking-day${date === today ? " is-today" : ""}`}
                      type="button"
                      key={key}
                      disabled={disabled}
                      aria-pressed={selectedDate === date}
                      aria-current={date === today ? "date" : undefined}
                      aria-label={dateLabel}
                      onClick={() => chooseDate(date)}
                    >
                      {Number(date.slice(-2))}
                    </button>
                  );
                })}
              </div>
              <p className="booking-calendar-status" aria-live="polite" aria-atomic="true">
                {loadingMonth ? <><LoaderCircle size={14} aria-hidden="true" />{booking("loadingAvailability")}</> : null}
                {availabilityFailed ? booking("availabilityError") : null}
              </p>
            </div>
          </fieldset>

          <fieldset className="booking-time-fieldset" disabled={!selectedDate || submitting}>
            <legend>{booking("availableTimes")}</legend>
            {!selectedDate ? <p className="booking-hint booking-time-empty">{booking("selectDate")}</p> : (
              <>
                <p className="booking-selected-date">{selectedDateLabel}</p>
                {selectedSlots.length ? (
                  <div className="booking-time-grid" role="group" aria-label={booking("selectTime")}>
                    {selectedSlots.map((time) => (
                      <button
                        className="booking-time"
                        type="button"
                        key={time}
                        aria-pressed={selectedTime === time}
                        onClick={() => { setSelectedTime(time); setSubmitError(""); }}
                      >{time}</button>
                    ))}
                  </div>
                ) : loadingMonth ? <p className="booking-hint">{booking("loadingSlots")}</p> : <p className="booking-hint">{booking("noSlots")}</p>}
              </>
            )}
          </fieldset>
          </div>
          <div className="booking-step-actions">
            <button className="booking-step-back" type="button" onClick={() => { setSubmitError(""); setStep(1); }}>{booking("back")}</button>
            <button className="hp-button hp-button-primary" type="button" onClick={continueToConfirmation} disabled={!selectedDate || !selectedTime}>{booking("nextToConfirm")}</button>
          </div>
          </section>}

          {step === 3 && <section className="booking-step-panel booking-confirm-panel" aria-labelledby="booking-confirm-title">
            <h4 id="booking-confirm-title" className="booking-panel-title">{booking("stepConfirm")}</h4>
            <p className="booking-confirm-question">{booking("confirmQuestion", {date: selectedDateLabel, time: selectedTime})}</p>
            <div className="booking-summary">
              <strong>{booking("summaryTitle")}</strong>
              <dl><div><dt>{t("nameLabel")}</dt><dd>{name}</dd></div><div><dt>{t("phoneLabel")}</dt><dd>{phoneCountryCode} {phone}</dd></div><div><dt>{booking("appointmentForQuestion")}</dt><dd>{booking(appointmentFor === "parent" ? "appointmentForParent" : "appointmentForSelf")}</dd></div><div><dt>{t("dateLabel")}</dt><dd>{selectedDateLabel}</dd></div><div><dt>{t("timeLabel")}</dt><dd>{selectedTime}</dd></div></dl>
            </div>
            <div className="booking-step-actions booking-confirm-actions">
              <button className="booking-step-back" type="button" onClick={returnToSchedule} disabled={submitting}>{booking("confirmNo")}</button>
              <button className="hp-button hp-button-primary" type="submit" aria-busy={submitting} data-loading={submitting} disabled={submitting}>{submitting ? <><LoaderCircle className="booking-submit-spinner" size={19} aria-hidden="true" />{booking("sending")}</> : booking("confirmYes")}</button>
            </div>
            <small className="booking-privacy-note">{booking("privacyNote")}</small>
          </section>}

          <div className="booking-honeypot" aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
          </div>

          {submitError ? <p id="booking-error" className="booking-error" role="alert">{submitError}</p> : null}
        </form>
      )}
    </aside>
  );
}
