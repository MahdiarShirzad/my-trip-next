"use client";

import React, { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const faqData = [
  {
    title: "How can I modify or cancel my flight booking?",
    desc: "You can modify or cancel your booking up to 24 hours before departure from your account dashboard. Visit Bookings > Select Flight > Modify or Cancel. Note that cancellation fees may apply depending on your ticket type.",
  },
  {
    title: "What is your refund policy for hotel cancellations?",
    desc: "Most hotels offer free cancellation up to 7 days before check-in. Some properties may have stricter policies. The cancellation terms are clearly displayed during booking. Full refunds are issued within 5-7 business days after cancellation.",
  },
  {
    title: "Are there any hidden fees in flight prices?",
    desc: "No, our prices include all mandatory taxes and fees. The total price shown at checkout is what you'll pay. Optional services like seat selection, baggage upgrade, or travel insurance are clearly listed separately.",
  },
  {
    title: "Can I book flights and hotels together?",
    desc: "Yes! Use our Holiday Packages to bundle flights and hotels for better rates. Simply search for your destination, select your dates, and we'll show you package deals with significant savings.",
  },
  {
    title: "How do I earn loyalty points?",
    desc: "Every booking earns loyalty points based on the amount spent. These points can be redeemed for discounts on future bookings. Check your account to view your points balance and available rewards.",
  },
  {
    title: "Is travel insurance included in my booking?",
    desc: "Travel insurance is optional and not included by default. However, we recommend adding it to protect against unexpected cancellations, medical emergencies, or lost baggage. You can add it during checkout.",
  },
];

const PlaneIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </svg>
);

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const uid = useId();
  const shouldReduceMotion = useReducedMotion();

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 md:py-24 px-4">
      {/* Section header */}
      <div className="max-w-[900px] mx-auto mb-10 md:mb-14">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-px w-8 bg-[#7167FF]" />
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#7167FF]">
            Travel FAQ
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
          Everything you need to know before you book
        </h2>
        <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-lg">
          Straight answers on bookings, refunds, and rewards, no fine print
          required.
        </p>
      </div>

      <div className="max-w-[900px] mx-auto space-y-4">
        {faqData.map((item, index) => {
          const isOpen = activeIndex === index;
          const code = `Q${String(index + 1).padStart(2, "0")}`;
          const panelId = `${uid}-panel-${index}`;
          const buttonId = `${uid}-button-${index}`;

          return (
            <div key={index} className="relative">
              {/* die-cut notches, matching page background */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-2 left-12 md:left-14 z-20 h-4 w-4 rounded-full bg-slate-50 dark:bg-slate-950"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-2 left-12 md:left-14 z-20 h-4 w-4 rounded-full bg-slate-50 dark:bg-slate-950"
              />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`flex rounded-2xl border-2 transition-colors overflow-hidden ${
                  isOpen
                    ? "border-[#7167FF] bg-white shadow-lg dark:bg-slate-800 dark:shadow-[#7167FF]/10"
                    : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900"
                }`}
              >
                {/* Ticket stub */}
                <div
                  className={`flex w-14 md:w-16 shrink-0 flex-col items-center justify-center gap-1.5 border-r-2 border-dashed py-5 ${
                    isOpen
                      ? "border-[#7167FF]/40 bg-amber-50/60 dark:bg-slate-950/40"
                      : "border-slate-300 dark:border-slate-600 bg-slate-100/60 dark:bg-slate-950/30"
                  }`}
                >
                  <PlaneIcon className="h-3.5 w-3.5 text-[#7167FF]" />
                  <span className="font-mono text-[11px] font-bold tracking-wider text-[#7167FF]">
                    {code}
                  </span>
                </div>

                {/* Question / Answer */}
                <div className="min-w-0 flex-1">
                  <button
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                    className="flex w-full items-center justify-between gap-4 rounded-lg px-4 py-4 text-left transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7167FF] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 md:px-6"
                  >
                    <span
                      className={`font-bold text-base md:text-lg transition-colors ${
                        isOpen
                          ? "text-[#7167FF]"
                          : "text-slate-900 dark:text-slate-100"
                      }`}
                    >
                      {item.title}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                      className={`shrink-0 ${isOpen ? "text-[#7167FF]" : "text-slate-400 dark:text-slate-500"}`}
                    >
                      <PlaneIcon className="h-5 w-5" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.35,
                          ease: "easeInOut",
                        }}
                        className="overflow-hidden"
                      >
                        <div className="border-t-2 border-slate-200 px-4 py-4 dark:border-slate-700 md:px-6">
                          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
                            {item.desc}
                          </p>
                          <div
                            aria-hidden="true"
                            className="mt-4 h-3 w-full text-slate-200 dark:text-slate-700"
                            style={{
                              backgroundImage:
                                "repeating-linear-gradient(90deg, currentColor 0 2px, transparent 2px 5px, currentColor 5px 6px, transparent 6px 11px, currentColor 11px 13px, transparent 13px 18px)",
                            }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
