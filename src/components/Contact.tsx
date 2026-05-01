import { motion } from "motion/react";
import { easeStudio } from "../lib/easings";
import SplitText from "./primitives/SplitText";
import MagneticButton from "./primitives/MagneticButton";

// ─── Replace these with your real details ──────────────────────────────────
const WHATSAPP_NUMBER = "919999999999"; // format: country code + number, no +
const EMAIL = "nirmaancostudio@gmail.com";
const CALENDLY_URL = "https://calendly.com/nirmaan"; // replace with real link
// ───────────────────────────────────────────────────────────────────────────

export default function Contact() {
  return (
    <section id="contact" className="py-32 md:py-40 relative overflow-hidden">
      {/* soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[color:var(--color-accent)] opacity-[0.05] blur-[120px] pointer-events-none hidden md:block" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-10">
          <div>
            <span className="text-eyebrow mb-4 block text-center">
              <span className="text-[color:var(--color-accent)]">04</span> — Let's talk
            </span>
            <SplitText
              text="Ready to start?"
              as="h2"
              className="font-display font-extrabold text-[clamp(44px,8vw,110px)] leading-[0.88] tracking-[-0.04em] text-[color:var(--color-ink)]"
              stagger={0.07}
              duration={1.0}
            />
          </div>

          <p className="max-w-md text-[color:var(--color-ink-dim)] text-base md:text-lg leading-relaxed">
            Tell us about your business — a quick call is the fastest way to figure out what you need and what it'll cost.
          </p>

          {/* CTA cluster */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeStudio }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
          >
            {/* WhatsApp */}
            <MagneticButton
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Nirmaan%2C%20I%27d%20like%20to%20talk%20about%20a%20project.`}
              dataCursor="link"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#25D366] text-white font-semibold text-sm tracking-[0.02em] hover:brightness-110 transition-all w-full sm:w-auto justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp us
            </MagneticButton>

            {/* Email */}
            <MagneticButton
              href={`mailto:${EMAIL}`}
              dataCursor="link"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full border border-[color:var(--color-line-strong)] text-[color:var(--color-ink-dim)] font-medium text-sm hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-ink)] transition-colors w-full sm:w-auto justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 10 7 10-7" />
              </svg>
              {EMAIL}
            </MagneticButton>

            {/* Book a call */}
            <MagneticButton
              href={CALENDLY_URL}
              dataCursor="link"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[color:var(--color-accent)] text-[color:var(--color-bg)] font-semibold text-sm tracking-[0.02em] hover:bg-[color:var(--color-ink)] transition-colors w-full sm:w-auto justify-center"
            >
              Book a free call
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
          </motion.div>

          <p className="text-meta">
            Free 30-min discovery call · No commitment · Usually reply within a few hours
          </p>
        </div>
      </div>
    </section>
  );
}
