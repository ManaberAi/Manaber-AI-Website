import { useEffect, useId, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'

import BubbleCard from '@/components/ui/BubbleCard'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import {
  CheckIcon,
  ChevronDownIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldIcon,
} from '@/components/ui/Icon'
import Section from '@/components/ui/Section'
import useReveal from '@/hooks/useReveal'
import cn from '@/lib/cn'
import { SITE } from '@/lib/site'

/* ---------------------------------------------------------------------------
 * Contact
 *
 * There is no backend on this project, so the form is a `mailto:` composer:
 * it validates in the browser, then hands a pre-filled draft to the visitor's
 * own email client. The copy never claims a message was sent or received,
 * because nothing is transmitted from this page — and it never promises a
 * response time, because none has been agreed.
 *
 * Slabs: WHITE masthead → LAVENDER form → INDIGO short answers → black footer.
 * ------------------------------------------------------------------------ */

const SUBJECTS = [
  'General enquiry',
  'Mosque or venue enquiry',
  'Technical support',
  'Partnership',
] as const

type Values = {
  name: string
  email: string
  organisation: string
  subject: string
  message: string
}

type ErrorKey = 'name' | 'email' | 'message'
type Errors = Partial<Record<ErrorKey, string>>

const EMPTY: Values = {
  name: '',
  email: '',
  organisation: '',
  subject: SUBJECTS[0],
  message: '',
}

/** Deliberately permissive — enough to catch typos, never enough to reject a
 *  legitimate address. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(values: Values): Errors {
  const errors: Errors = {}

  if (!values.name.trim()) {
    errors.name = 'Please enter your name.'
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'That does not look like an email address. Please check it.'
  }

  if (!values.message.trim()) {
    errors.message = 'Please write a message.'
  }

  return errors
}

function buildMailto(values: Values): string {
  const subject = `Manaber — ${values.subject}`
  const lines = [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
  ]

  if (values.organisation.trim()) {
    lines.push(`Organisation: ${values.organisation.trim()}`)
  }

  lines.push(`Subject: ${values.subject}`, '', values.message.trim())

  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    lines.join('\n'),
  )}`
}

/* --------------------------------- pieces -------------------------------- */

/*
 * Sharp-cornered white fields on the lavender ground. There is no red in this
 * palette and none is invented: an invalid field is marked by a doubled INDIGO
 * rule plus a bold indigo message carrying an alert glyph, so the state is
 * never signalled by colour alone.
 */
const FIELD_BASE =
  'block w-full rounded-none bg-white px-4 py-3 text-lg text-ink ' +
  'transition-colors duration-200 ease-out-expo placeholder:text-ink/40 ' +
  'focus:outline-none'

const FIELD_OK = 'border border-ink/25 hover:border-ink/60'
const FIELD_BAD = 'border-2 border-indigo'

function AlertGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="mt-1 h-5 w-5 shrink-0"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5M12 16.2h.01" />
    </svg>
  )
}

type FieldProps = {
  id: string
  label: string
  optional?: boolean
  error?: string
  errorId: string
  children: ReactNode
}

function Field({ id, label, optional = false, error, errorId, children }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-label font-medium uppercase tracking-eyebrow text-ink"
      >
        {label}
        {optional ? (
          <span className="text-label font-medium uppercase tracking-eyebrow text-ink/55">
            Optional
          </span>
        ) : null}
      </label>
      <div className="mt-3">{children}</div>
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="mt-3 flex items-start gap-2 text-lg font-bold leading-snug text-indigo"
        >
          <AlertGlyph />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  )
}

type DetailProps = {
  icon: ReactNode
  label: string
  value: string
  href?: string
}

/** A row on the indigo details bubble: lime glyph block, lavender label,
 *  white value. Every pairing here is from the approved table. */
function Detail({ icon, label, value, href }: DetailProps) {
  const body = (
    <>
      <span
        aria-hidden="true"
        className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-lime text-ink"
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-label font-medium uppercase tracking-eyebrow text-lavender">
          {label}
        </span>
        <span
          className={cn(
            'mt-2 block break-words text-lg font-semibold text-white',
            href && 'transition-colors duration-200 ease-out-expo group-hover:text-lime',
          )}
        >
          {value}
        </span>
      </span>
    </>
  )

  if (!href) {
    return <li className="flex items-start gap-5">{body}</li>
  }

  return (
    <li>
      <a href={href} className="group flex items-start gap-5">
        {body}
      </a>
    </li>
  )
}

const QUESTIONS = [
  {
    question: 'Which languages are supported?',
    answer:
      'More than 25, including Urdu, English, Arabic, Hindi, Bengali, Chinese, French and Pashto. The full list is on the Features page.',
  },
  {
    question: 'Is my data collected?',
    answer:
      'No. Everything is processed on the device itself — audio, transcripts and translations. Nothing is uploaded and nothing is stored about you.',
  },
  {
    question: 'Do I need an account?',
    answer:
      'No. There is no account to create and no sign-in — Manaber runs on the device itself, so there is nothing to register and nothing held about you.',
  },
]

/* ---------------------------------- page --------------------------------- */

export default function Contact() {
  useReveal()

  const uid = useId()
  const [values, setValues] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [composed, setComposed] = useState(false)

  const confirmationRef = useRef<HTMLHeadingElement>(null)

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  // Submitting unmounts the form along with the focused button, dropping focus
  // to <body>. Move it onto the confirmation heading so the statement that
  // nothing was actually sent is announced, and Tab resumes from here.
  useEffect(() => {
    if (composed) confirmationRef.current?.focus()
  }, [composed])

  const ids = {
    name: `${uid}-name`,
    email: `${uid}-email`,
    organisation: `${uid}-organisation`,
    subject: `${uid}-subject`,
    message: `${uid}-message`,
  }

  const errorIds = {
    name: `${uid}-name-error`,
    email: `${uid}-email-error`,
    message: `${uid}-message-error`,
  }

  function update(key: keyof Values, value: string) {
    setValues((current) => ({ ...current, [key]: value }))

    // Clear a field's error the moment the visitor starts correcting it.
    if (key === 'name' || key === 'email' || key === 'message') {
      const errorKey: ErrorKey = key

      setErrors((current) => {
        if (!current[errorKey]) return current
        const next = { ...current }
        delete next[errorKey]
        return next
      })
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (nextErrors.name) {
      nameRef.current?.focus()
      return
    }

    if (nextErrors.email) {
      emailRef.current?.focus()
      return
    }

    if (nextErrors.message) {
      messageRef.current?.focus()
      return
    }

    window.location.href = buildMailto(values)
    setComposed(true)
  }

  return (
    <>
      {/* ------------------------------------------------------------------
        a. MASTHEAD — white. Above the fold: renders at final opacity on first
        paint, so nothing here carries `.reveal`. The floating nav card needs
        `pt-36 sm:pt-44` of clearance.
      ------------------------------------------------------------------ */}
      <Section
        tone="white"
        spacing="none"
        className="pb-16 pt-36 sm:pb-20 sm:pt-44"
        aria-labelledby="contact-title"
        data-testid="contact-page"
      >
        <Container>
          <div className="grid grid-cols-12 gap-y-12">
            <div className="col-span-12 lg:col-span-7">
              <Eyebrow tone="indigo">Contact</Eyebrow>
              <h1
                id="contact-title"
                className="mt-8 max-w-[14ch] text-balance font-display text-display-xl font-normal text-ink"
              >
                Talk to the people who built it.
              </h1>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:self-end">
              <p className="max-w-[38ch] text-xl font-bold leading-snug text-indigo">
                Questions about bringing Manaber into a mosque, a conference hall
                or a classroom — or about how the app works.
              </p>

              <p className="mt-8 max-w-prose text-lg leading-relaxed text-ink/70">
                Write to us directly at{' '}
                <a
                  href={`mailto:${SITE.email}`}
                  className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition-colors duration-200 ease-out-expo hover:text-indigo hover:decoration-indigo"
                >
                  {SITE.email}
                </a>
                , or use the form below.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
        b. FORM + DETAILS — lavender slab.
      ------------------------------------------------------------------ */}
      <Section tone="lavender" spacing="default" aria-labelledby="contact-form-heading">
        <Container>
          <div className="grid grid-cols-12 gap-y-16">
            {/* ---------------------------- form ---------------------------- */}
            <div className="reveal col-span-12 lg:col-span-7">
              <h2
                id="contact-form-heading"
                className="font-display text-display-lg font-normal text-ink"
              >
                Write a message
              </h2>

              {composed ? (
                <BubbleCard
                  tone="lime"
                  tail="top-left"
                  className="mt-14 p-8 sm:p-10"
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex h-12 w-12 items-center justify-center bg-ink text-lime"
                  >
                    <CheckIcon className="h-6 w-6" />
                  </span>

                  <h3
                    ref={confirmationRef}
                    tabIndex={-1}
                    className="mt-8 max-w-[20ch] font-display text-display-md font-normal text-ink"
                  >
                    Your email app should now be open.
                  </h3>

                  <p className="mt-6 max-w-prose text-lg font-bold leading-snug text-ink">
                    Nothing has been sent from this page, and we have not received
                    anything yet. The message reaches us only once you press send
                    in your own email app.
                  </p>

                  <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink/70">
                    We handed a draft — addressed to {SITE.email} and filled in
                    with what you wrote — to your email client. If no draft
                    appeared, your browser may not have one connected. Write to us
                    at{' '}
                    <a
                      href={`mailto:${SITE.email}`}
                      className="font-semibold text-ink underline decoration-ink/40 underline-offset-4 transition-colors duration-200 ease-out-expo hover:decoration-ink"
                    >
                      {SITE.email}
                    </a>{' '}
                    instead — your text is repeated below so you can copy it
                    across.
                  </p>

                  <div className="mt-8 bg-white p-6">
                    <p className="text-label font-medium uppercase tracking-eyebrow text-ink/55">
                      Your draft
                    </p>
                    <p className="mt-4 text-lg font-semibold text-ink">
                      {values.subject}
                    </p>
                    <p className="mt-3 max-w-prose whitespace-pre-wrap text-lg leading-relaxed text-ink/70">
                      {values.message}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button as="a" href={buildMailto(values)} variant="black" size="md">
                      Open the draft again
                    </Button>
                    <Button
                      type="button"
                      variant="outline-dark"
                      size="md"
                      onClick={() => {
                        setValues(EMPTY)
                        setErrors({})
                        setComposed(false)
                      }}
                    >
                      Write another message
                    </Button>
                  </div>
                </BubbleCard>
              ) : (
                <form noValidate onSubmit={handleSubmit} className="mt-12 space-y-8">
                  <Field
                    id={ids.name}
                    label="Name"
                    error={errors.name}
                    errorId={errorIds.name}
                  >
                    <input
                      ref={nameRef}
                      id={ids.name}
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={(event) => update('name', event.target.value)}
                      aria-invalid={errors.name ? true : undefined}
                      aria-describedby={errors.name ? errorIds.name : undefined}
                      className={cn(FIELD_BASE, errors.name ? FIELD_BAD : FIELD_OK)}
                    />
                  </Field>

                  <Field
                    id={ids.email}
                    label="Email"
                    error={errors.email}
                    errorId={errorIds.email}
                  >
                    <input
                      ref={emailRef}
                      id={ids.email}
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(event) => update('email', event.target.value)}
                      aria-invalid={errors.email ? true : undefined}
                      aria-describedby={errors.email ? errorIds.email : undefined}
                      className={cn(FIELD_BASE, errors.email ? FIELD_BAD : FIELD_OK)}
                    />
                  </Field>

                  <Field
                    id={ids.organisation}
                    label="Organisation"
                    optional
                    errorId={`${uid}-organisation-error`}
                  >
                    <input
                      id={ids.organisation}
                      name="organisation"
                      type="text"
                      autoComplete="organization"
                      value={values.organisation}
                      onChange={(event) => update('organisation', event.target.value)}
                      className={cn(FIELD_BASE, FIELD_OK)}
                    />
                  </Field>

                  <Field id={ids.subject} label="Subject" errorId={`${uid}-subject-error`}>
                    <div className="relative">
                      <select
                        id={ids.subject}
                        name="subject"
                        autoComplete="off"
                        value={values.subject}
                        onChange={(event) => update('subject', event.target.value)}
                        className={cn(
                          FIELD_BASE,
                          FIELD_OK,
                          'cursor-pointer appearance-none pr-12',
                        )}
                      >
                        {SUBJECTS.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/60"
                      />
                    </div>
                  </Field>

                  <Field
                    id={ids.message}
                    label="Message"
                    error={errors.message}
                    errorId={errorIds.message}
                  >
                    <textarea
                      ref={messageRef}
                      id={ids.message}
                      name="message"
                      rows={6}
                      autoComplete="off"
                      value={values.message}
                      onChange={(event) => update('message', event.target.value)}
                      aria-invalid={errors.message ? true : undefined}
                      aria-describedby={errors.message ? errorIds.message : undefined}
                      className={cn(
                        FIELD_BASE,
                        errors.message ? FIELD_BAD : FIELD_OK,
                        'resize-y leading-relaxed',
                      )}
                    />
                  </Field>

                  <div className="flex flex-col gap-6 pt-2 sm:flex-row sm:items-center sm:gap-8">
                    <Button type="submit" variant="lime" size="lg">
                      Compose the email
                    </Button>
                    <p className="max-w-[34ch] text-lg leading-relaxed text-ink/70">
                      This opens a pre-filled draft in your own email app. Nothing
                      is submitted from this page.
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* -------------------------- details --------------------------- */}
            <div className="reveal reveal-delay-1 col-span-12 lg:col-span-4 lg:col-start-9">
              <BubbleCard tone="indigo" tail="top-left" className="p-8 sm:p-9">
                <h2 className="font-display text-display-md font-normal text-white">
                  Direct details
                </h2>

                <ul className="mt-8 space-y-7">
                  <Detail
                    icon={<MailIcon className="h-6 w-6" />}
                    label="Email"
                    value={SITE.email}
                    href={`mailto:${SITE.email}`}
                  />
                  <Detail
                    icon={<PhoneIcon className="h-6 w-6" />}
                    label="Phone"
                    value={SITE.phone}
                    href={`tel:${SITE.phoneHref}`}
                  />
                  <Detail
                    icon={<MapPinIcon className="h-6 w-6" />}
                    label="Location"
                    value="Dubai, United Arab Emirates"
                  />
                </ul>

                <div aria-hidden="true" className="mt-8 h-px w-full bg-white/20" />

                <h3 className="mt-8 font-display text-display-xs font-normal text-white">
                  What Manaber does
                </h3>
                <p className="mt-4 text-lg font-bold leading-snug text-lavender">
                  It listens to a live talk and renders it, as it happens, into the
                  language each person in the room reads.
                </p>

                <p className="mt-8 flex items-start gap-3 text-lg leading-relaxed text-lavender">
                  <ShieldIcon aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-lime" />
                  <span>Processed entirely on your device. Nothing is ever uploaded.</span>
                </p>
              </BubbleCard>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
        c. SHORT ANSWERS — indigo slab, closing with the tail motif at section
        scale as it hands off into the black footer.
      ------------------------------------------------------------------ */}
      <Section
        tone="indigo"
        spacing="none"
        className="pb-28 pt-20 sm:pb-32 sm:pt-24"
        aria-labelledby="contact-faq-heading"
      >
        <Container>
          <div className="grid grid-cols-12 gap-y-12">
            <div className="reveal col-span-12 lg:col-span-5">
              <Eyebrow tone="lime">Before you write</Eyebrow>
              <h2
                id="contact-faq-heading"
                className="mt-8 max-w-[14ch] text-balance font-display text-display-lg font-normal text-white"
              >
                Three things people ask most.
              </h2>
            </div>

            <dl className="reveal reveal-delay-1 col-span-12 grid gap-x-8 gap-y-12 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
              {QUESTIONS.map((item) => (
                <div key={item.question}>
                  <span aria-hidden="true" className="block h-1 w-12 bg-lime" />
                  <dt className="mt-5 font-display text-display-xs font-normal text-white">
                    {item.question}
                  </dt>
                  <dd className="mt-3 text-lg leading-relaxed text-lavender">
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>

        {/* The tail motif at section scale — a black wedge dropping out of the
            indigo into the black footer, aligned to the content shell's right
            edge rather than the viewport's. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0">
          <Container className="relative">
            <span className="section-notch absolute bottom-0 right-0 h-10 w-[7.5rem] bg-ink" />
          </Container>
        </div>
      </Section>
    </>
  )
}
