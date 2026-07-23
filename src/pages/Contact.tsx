import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { NotRobotCheckbox } from '@/components/ui/NotRobotCheckbox';
import { siteConfig } from '@/data/site';
import { sendContactEmail, isEmailjsConfigured } from '@/lib/emailjs';

type FormValues = { name: string; email: string; phone: string; message: string };
type Status = 'idle' | 'submitting' | 'success' | 'error' | 'not-configured';

const initialValues: FormValues = { name: '', email: '', phone: '', message: '' };

export default function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [honeypot, setHoneypot] = useState('');
  const [verified, setVerified] = useState(false);
  const [showVerifyHint, setShowVerifyHint] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  function updateField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Honeypot: real visitors never fill this hidden field. If it's filled,
    // pretend to succeed rather than tipping off whatever filled it in.
    if (honeypot) {
      setStatus('success');
      return;
    }

    if (!verified) {
      setShowVerifyHint(true);
      return;
    }
    setShowVerifyHint(false);
    setStatus('submitting');

    if (!isEmailjsConfigured) {
      setStatus('not-configured');
      return;
    }

    try {
      await sendContactEmail(values);
      setStatus('success');
      setValues(initialValues);
      setVerified(false);
    } catch {
      setStatus('error');
    }
  }

  const mapQuery = encodeURIComponent(`${siteConfig.name}, ${siteConfig.address}`);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you're building."
        description="A quote usually comes back the same day — reach us here, or directly below."
      />

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Direct contact + map */}
          <div className="space-y-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-4 rounded-2xl border border-mist-200 bg-paper-soft p-5 transition-colors hover:border-navy-300"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-600">
                <Mail size={19} />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink-900">Email</p>
                <p className="text-sm text-mist-600">{siteConfig.email}</p>
              </div>
            </a>

            {siteConfig.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-4 rounded-2xl border border-mist-200 bg-paper-soft p-5 transition-colors hover:border-navy-300"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-600">
                  <Phone size={19} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-900">Call us</p>
                  <p className="text-sm text-mist-600">{phone}</p>
                </div>
              </a>
            ))}

            <div className="flex items-center gap-4 rounded-2xl border border-mist-200 bg-paper-soft p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-600">
                <MapPin size={19} />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink-900">Based in</p>
                <p className="text-sm text-mist-600">{siteConfig.address}</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-mist-200">
              <iframe
                title="Crescent Universal location"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="h-56 w-full grayscale-[15%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-mist-200 bg-white p-7 sm:p-9">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center py-10 text-center"
                >
                  <CheckCircle2 size={40} className="text-navy-600" />
                  <h2 className="mt-4 text-lg font-semibold text-ink-900">Message sent</h2>
                  <p className="mt-2 max-w-xs text-sm text-mist-600">
                    Thanks for reaching out — we usually reply the same business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm font-semibold text-navy-600 hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  noValidate
                >
                  {/* Honeypot — hidden from real visitors via CSS, left open for bots */}
                  <input
                    type="text"
                    name="company"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Name" htmlFor="name">
                      <input
                        id="name"
                        required
                        value={values.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        className="w-full rounded-xl border border-mist-200 px-4 py-3 text-sm text-ink-900 outline-none transition-colors focus:border-navy-600"
                        placeholder="Your name"
                      />
                    </Field>
                    <Field label="Phone" htmlFor="phone">
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={values.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className="w-full rounded-xl border border-mist-200 px-4 py-3 text-sm text-ink-900 outline-none transition-colors focus:border-navy-600"
                        placeholder="+91 00000 00000"
                      />
                    </Field>
                  </div>

                  <Field label="Email" htmlFor="email">
                    <input
                      id="email"
                      type="email"
                      required
                      value={values.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="w-full rounded-xl border border-mist-200 px-4 py-3 text-sm text-ink-900 outline-none transition-colors focus:border-navy-600"
                      placeholder="you@example.com"
                    />
                  </Field>

                  <Field label="Message" htmlFor="message">
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={values.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      className="w-full resize-none rounded-xl border border-mist-200 px-4 py-3 text-sm text-ink-900 outline-none transition-colors focus:border-navy-600"
                      placeholder="What are you building?"
                    />
                  </Field>

                  <div>
                    <NotRobotCheckbox
                      checked={verified}
                      onChange={(v) => {
                        setVerified(v);
                        if (v) setShowVerifyHint(false);
                      }}
                    />
                    {showVerifyHint && (
                      <p className="mt-2 text-xs text-bronze-600">
                        Please confirm you're not a robot before sending.
                      </p>
                    )}
                  </div>

                  {status === 'not-configured' && (
                    <p className="flex items-start gap-2 rounded-xl bg-navy-50 p-3 text-xs text-navy-600">
                      <AlertCircle size={15} className="mt-0.5 shrink-0" />
                      Email sending isn't connected yet — add your EmailJS keys to
                      <code className="mx-1 rounded bg-white px-1 py-0.5">.env</code>
                      (see the README), or reach us directly via the details on the left for now.
                    </p>
                  )}
                  {status === 'error' && (
                    <p className="flex items-start gap-2 rounded-xl bg-bronze-50 p-3 text-xs text-bronze-700">
                      <AlertCircle size={15} className="mt-0.5 shrink-0" />
                      Something went wrong sending that. Please try again, or reach us directly
                      via the details on the left.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-bronze-500 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-bronze-600 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 block text-xs font-semibold text-mist-600">{label}</span>
      {children}
    </label>
  );
}
