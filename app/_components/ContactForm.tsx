"use client";

export default function ContactForm() {
  // NOTE: no submit handler wired up yet — hook this up to your
  // server action / API route of choice. Structure only.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: wire up submission
  }

  return (
    <form className="mt-6 flex flex-wrap justify-between gap-y-6" onSubmit={handleSubmit}>
      <input
        className="block w-[48%] rounded-2xl border-2 border-slate-200 bg-transparent px-4 py-3.5 text-sm text-slate-800 transition-colors focus:border-[#7167FF] focus:outline-none dark:border-slate-700 dark:text-slate-200 dark:focus:border-[#7167FF] max-lg:w-full"
        type="text"
        name="name"
        id="contact-name"
        placeholder="Your Name"
        required
      />
      <input
        className="block w-[48%] rounded-2xl border-2 border-slate-200 bg-transparent px-4 py-3.5 text-sm text-slate-800 transition-colors focus:border-[#7167FF] focus:outline-none dark:border-slate-700 dark:text-slate-200 dark:focus:border-[#7167FF] max-lg:w-full"
        type="email"
        name="email"
        id="contact-email"
        placeholder="Your Email"
        required
      />
      <input
        className="block w-full rounded-2xl border-2 border-slate-200 bg-transparent px-4 py-3.5 text-sm text-slate-800 transition-colors focus:border-[#7167FF] focus:outline-none dark:border-slate-700 dark:text-slate-200 dark:focus:border-[#7167FF]"
        type="text"
        name="subject"
        id="contact-subject"
        placeholder="Your Subject"
        required
      />
      <textarea
        className="block h-40 w-full rounded-2xl border-2 border-slate-200 bg-transparent px-4 py-3.5 text-sm text-slate-800 transition-colors focus:border-[#7167FF] focus:outline-none dark:border-slate-700 dark:text-slate-200 dark:focus:border-[#7167FF]"
        name="message"
        id="contact-message"
        placeholder="Write Your Message"
        required
      />
      <button
        type="submit"
        className="mt-2 rounded-2xl bg-[#7167FF] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#7167FF]/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5b51e6] active:translate-y-0"
      >
        Send Message
      </button>
    </form>
  );
}
