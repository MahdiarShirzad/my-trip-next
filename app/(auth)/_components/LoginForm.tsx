"use client";

import * as yup from "yup";
import Link from "next/link";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";

type Values = {
  email: string;
  password: string;
};

const initialValues: Values = {
  email: "",
  password: "",
};

const validation = yup.object().shape({
  email: yup
    .string()
    .required("Please enter your email")
    .email("Email format is not correct"),
  password: yup
    .string()
    .min(8, "Password should at 8 characters")
    .required("Please enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      "Password should contain number and letter",
    ),
});

export default function LoginForm() {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  // TODO: wire this up to your actual login mutation / server action.
  const isPending = false;

  function handleSubmit(values: Values) {
    const { email, password } = values;
    if (!email || !password) return;

    // TODO: call your login logic here, e.g. login({ email, password })
    console.log("login submit", { email, password });
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

        <label
          className="mt-5 block text-sm font-bold text-slate-700 dark:text-slate-200"
          htmlFor="password"
        >
          Password
        </label>
        <div className="relative mt-2 flex items-center gap-3 rounded-2xl border-2 border-slate-200 px-4 py-3.5 transition-colors focus-within:border-[#7167FF] dark:border-slate-700">
          <PasswordIcon />
          <Field
            className="block w-full bg-transparent px-1 text-slate-800 focus:outline-none dark:text-slate-200"
            type={passwordIsVisible ? "text" : "password"}
            title="password"
            id="password"
            name="password"
            placeholder="Your Password"
            disabled={isPending}
          />
          <button
            type="button"
            onClick={() => setPasswordIsVisible((v) => !v)}
            aria-label={
              passwordIsVisible ? "Hide password" : "Show password"
            }
            className="absolute right-3 cursor-pointer text-slate-400 transition-colors hover:text-[#7167FF]"
          >
            {passwordIsVisible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        <ErrorMessage
          name="password"
          component="div"
          className="mt-1 text-sm text-red-500"
        />

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              className="h-4 w-4 cursor-pointer accent-[#7167FF]"
              type="checkbox"
              name="remember"
              id="remember"
              title="remember"
            />
            <label
              className="cursor-pointer text-sm font-semibold text-slate-600 dark:text-slate-300"
              htmlFor="remember"
            >
              Remember Me
            </label>
          </div>

          <Link
            href="/forgotpass"
            className="text-sm font-bold text-[#7167FF] hover:opacity-80"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#7167FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#7167FF]/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5b51e6] active:translate-y-0 disabled:pointer-events-none disabled:opacity-70"
        >
          {isPending ? (
            "Loading..."
          ) : (
            <>
              <LoginIcon />
              Login
            </>
          )}
        </button>

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-bold text-[#7167FF] hover:opacity-80"
          >
            Sign up
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

function PasswordIcon() {
  return (
    <svg
      aria-hidden
      className="w-6 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288"
        className="stroke-slate-400 dark:stroke-slate-500"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg aria-hidden className="w-6" viewBox="0 0 24 24" fill="none">
      <path
        d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg aria-hidden className="w-6" viewBox="0 0 24 24" fill="none">
      <path
        d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LoginIcon() {
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
