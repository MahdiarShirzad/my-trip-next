"use client";

import * as yup from "yup";
import Link from "next/link";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";

type Values = {
  email: string;
};

const initialValues: Values = {
  email: "",
};

const validation = yup.object().shape({
  email: yup
    .string()
    .required("Please enter your email")
    .email("Email format is not correct"),
});

export default function ForgotPasswordForm() {
  const [isPending, setIsPending] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  async function handleSubmit(values: Values) {
    setIsPending(true);
    console.log("forgot password submit", values);
    setIsPending(false);
    setSubmittedEmail(values.email);
  }

  if (submittedEmail) {
    return (
      <div className="mt-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#7167FF]/10">
          <CheckIcon />
        </div>
        <p className="mt-4 text-base font-bold text-slate-900 dark:text-white">
          Check your inbox
        </p>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          We sent a password reset link to{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {submittedEmail}
          </span>
          .
        </p>

        <button
          type="button"
          onClick={() => setSubmittedEmail(null)}
          className="mt-6 text-sm font-bold text-[#7167FF] hover:opacity-80"
        >
          Didn&apos;t get it? Try again
        </button>

        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
          <Link
            href="/login"
            className="font-bold text-[#7167FF] hover:opacity-80"
          >
            Back to Login
          </Link>
        </p>
      </div>
    );
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={validation}
      initialValues={initialValues}
    >
      <Form className="mt-8">
        <label
          className="text-sm font-bold text-slate-700 dark:text-slate-200"
          htmlFor="email"
        >
          Email Address
        </label>
        <div className="mt-2 flex items-center gap-3 rounded-2xl border-2 border-slate-200 px-4 py-3.5 transition-colors focus-within:border-[#7167FF] dark:border-slate-700">
          <EmailIcon />
          <Field
            className="block w-full bg-transparent px-1 text-slate-800 focus:outline-none dark:text-slate-200"
            type="email"
            name="email"
            title="email"
            id="email"
            placeholder="Your Email"
            disabled={isPending}
          />
        </div>
        <ErrorMessage
          name="email"
          component="div"
          className="mt-1 text-sm text-red-500"
        />

        <button
          type="submit"
          disabled={isPending}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#7167FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#7167FF]/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5b51e6] active:translate-y-0 disabled:pointer-events-none disabled:opacity-70"
        >
          {isPending ? (
            "Sending..."
          ) : (
            <>
              <SendIcon />
              Send Reset Link
            </>
          )}
        </button>

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Remembered your password?{" "}
          <Link
            href="/login"
            className="font-bold text-[#7167FF] hover:opacity-80"
          >
            Login
          </Link>
        </p>
      </Form>
    </Formik>
  );
}

function EmailIcon() {
  return (
    <svg
      aria-hidden
      className="w-[22px] shrink-0"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 6V18C23 19.6523 21.6523 21 20 21H4C2.34772 21 1 19.6523 1 18V6C1 4.34315 2.34315 3 4 3H20C21.6569 3 23 4.34315 23 6ZM3.10658 5.55395C3.27196 5.22692 3.61204 5 4 5H20C20.388 5 20.728 5.22692 20.8934 5.55395L12 11.7793L3.10658 5.55395ZM3 7.92066L10.8531 13.4178C11.5417 13.8999 12.4583 13.8999 13.1469 13.4178L21 7.92066V18C21 18.5477 20.5477 19 20 19H4C3.45228 19 3 18.5477 3 18V7.92066Z"
        className="fill-slate-400 dark:fill-slate-500"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg aria-hidden className="w-[18px]" viewBox="0 0 15 15" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5 1C4.22386 1 4 1.22386 4 1.5C4 1.77614 4.22386 2 4.5 2H12V13H4.5C4.22386 13 4 13.2239 4 13.5C4 13.7761 4.22386 14 4.5 14H12C12.5523 14 13 13.5523 13 13V2C13 1.44772 12.5523 1 12 1H4.5ZM6.60355 4.89645C6.40829 4.70118 6.09171 4.70118 5.89645 4.89645C5.70118 5.09171 5.70118 5.40829 5.89645 5.60355L7.29289 7H0.5C0.223858 7 0 7.22386 0 7.5C0 7.77614 0.223858 8 0.5 8H7.29289L5.89645 9.39645C5.70118 9.59171 5.70118 9.90829 5.89645 10.1036C6.09171 10.2988 6.40829 10.2988 6.60355 10.1036L8.85355 7.85355C9.04882 7.65829 9.04882 7.34171 8.85355 7.14645L6.60355 4.89645Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-7 w-7 text-[#7167FF]"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
