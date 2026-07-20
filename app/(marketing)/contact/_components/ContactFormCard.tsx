import ContactForm from "./ContactForm";

export default function ContactFormCard() {
  return (
    <div className="w-full rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-9">
      <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
        Send Us A Message
      </p>
      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
        Fill out the form below and our team will get back to you as soon as
        possible.
      </p>

      <ContactForm />
    </div>
  );
}
