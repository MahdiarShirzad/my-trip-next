"use client";

import * as yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

export type BookingInfoValues = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
};

interface BookingPersonalInfoProps {
  initialValues: BookingInfoValues;
  disabled: boolean;
  isSubmitting: boolean;
  onSubmit: (values: BookingInfoValues) => void;
}

const validation = yup.object().shape({
  fullName: yup.string().required("Please enter your full name"),
  phone: yup
    .string()
    .required("Please enter your phone number")
    .matches(/^[0-9+\-\s]{7,}$/, "Enter a valid phone number"),
  address: yup.string().required("Please enter your address"),
});

export default function BookingPersonalInfo({
  initialValues,
  disabled,
  isSubmitting,
  onSubmit,
}: BookingPersonalInfoProps) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
      <p className="text-xl font-extrabold text-slate-900 dark:text-white">
        Passenger Details
      </p>

      <Formik
        onSubmit={onSubmit}
        validationSchema={validation}
        initialValues={initialValues}
        enableReinitialize
      >
        <Form className="mt-6 flex flex-wrap justify-between gap-y-5">
          <div className="w-[48%] max-lg:w-full">
            <label
              className="text-sm font-bold text-slate-700 dark:text-slate-200"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <div className="mt-2 flex items-center gap-3 rounded-2xl border-2 border-slate-200 px-4 py-3.5 transition-colors focus-within:border-[#7167FF] dark:border-slate-700">
              <UserIcon />
              <Field
                className="block w-full bg-transparent px-1 capitalize text-slate-800 focus:outline-none dark:text-slate-200"
                type="text"
                title="fullName"
                name="fullName"
                id="fullName"
                placeholder="Your Full Name"
              />
            </div>
            <ErrorMessage
              name="fullName"
              component="div"
              className="mt-1 text-sm text-red-500"
            />
          </div>

          <div className="w-[48%] max-lg:w-full">
            <label
              className="text-sm font-bold text-slate-700 dark:text-slate-200"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="mt-2 flex items-center gap-3 rounded-2xl border-2 border-slate-200 px-4 py-3.5 dark:border-slate-700">
              <EmailIcon />
              <Field
                className="block w-full bg-transparent px-1 text-slate-500 focus:outline-none dark:text-slate-400"
                type="email"
                title="email"
                name="email"
                id="email"
                disabled
                placeholder="Your Email"
              />
            </div>
          </div>

          <div className="w-[48%] max-lg:w-full">
            <label
              className="text-sm font-bold text-slate-700 dark:text-slate-200"
              htmlFor="phone"
            >
              Phone
            </label>
            <div className="mt-2 flex items-center gap-3 rounded-2xl border-2 border-slate-200 px-4 py-3.5 transition-colors focus-within:border-[#7167FF] dark:border-slate-700">
              <PhoneIcon />
              <Field
                className="block w-full bg-transparent px-1 text-slate-800 focus:outline-none dark:text-slate-200"
                type="text"
                title="phone"
                name="phone"
                id="phone"
                placeholder="Your Phone Number"
              />
            </div>
            <ErrorMessage
              name="phone"
              component="div"
              className="mt-1 text-sm text-red-500"
            />
          </div>

          <div className="w-[48%] max-lg:w-full">
            <label
              className="text-sm font-bold text-slate-700 dark:text-slate-200"
              htmlFor="address"
            >
              Address
            </label>
            <div className="mt-2 flex items-center gap-3 rounded-2xl border-2 border-slate-200 px-4 py-3.5 transition-colors focus-within:border-[#7167FF] dark:border-slate-700">
              <AddressIcon />
              <Field
                className="block w-full bg-transparent px-1 text-slate-800 focus:outline-none dark:text-slate-200"
                type="text"
                title="address"
                name="address"
                id="address"
                placeholder="Your Address"
              />
            </div>
            <ErrorMessage
              name="address"
              component="div"
              className="mt-1 text-sm text-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={disabled || isSubmitting}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#7167FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#7167FF]/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5b51e6] active:translate-y-0 disabled:pointer-events-none disabled:opacity-50"
          >
            {isSubmitting ? (
              "Booking..."
            ) : (
              <>
                Confirm Booking
                <ArrowRightIcon />
              </>
            )}
          </button>
          {disabled && !isSubmitting && (
            <p className="w-full text-center text-xs font-semibold text-amber-600 dark:text-amber-400">
              Select a seat above to continue
            </p>
          )}
        </Form>
      </Formik>
    </div>
  );
}

function UserIcon() {
  return (
    <svg
      aria-hidden
      className="w-[22px] shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
        className="stroke-slate-400 dark:stroke-slate-500"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
        className="stroke-slate-400 dark:stroke-slate-500"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg aria-hidden className="w-[22px] shrink-0" viewBox="0 0 24 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 6V18C23 19.6523 21.6523 21 20 21H4C2.34772 21 1 19.6523 1 18V6C1 4.34315 2.34315 3 4 3H20C21.6569 3 23 4.34315 23 6ZM3.10658 5.55395C3.27196 5.22692 3.61204 5 4 5H20C20.388 5 20.728 5.22692 20.8934 5.55395L12 11.7793L3.10658 5.55395ZM3 7.92066L10.8531 13.4178C11.5417 13.8999 12.4583 13.8999 13.1469 13.4178L21 7.92066V18C21 18.5477 20.5477 19 20 19H4C3.45228 19 3 18.5477 3 18V7.92066Z"
        className="fill-slate-400 dark:fill-slate-500"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      aria-hidden
      className="w-[23px] shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z"
        className="stroke-slate-400 dark:stroke-slate-500"
      />
    </svg>
  );
}

function AddressIcon() {
  return (
    <svg
      aria-hidden
      className="w-[23px] shrink-0"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        d="M19.799 5.165l-2.375-1.83a1.997 1.997 0 0 0-.521-.237A2.035 2.035 0 0 0 16.336 3H9.5l.801 5h6.035c.164 0 .369-.037.566-.098s.387-.145.521-.236l2.375-1.832c.135-.091.202-.212.202-.334s-.067-.243-.201-.335zM8.5 1h-1a.5.5 0 0 0-.5.5V5H3.664c-.166 0-.37.037-.567.099-.198.06-.387.143-.521.236L.201 7.165C.066 7.256 0 7.378 0 7.5c0 .121.066.242.201.335l2.375 1.832c.134.091.323.175.521.235.197.061.401.098.567.098H7v8.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-17a.5.5 0 0 0-.5-.5z"
        className="fill-slate-400 dark:fill-slate-500"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg aria-hidden className="w-[19px]" viewBox="0 0 24 24" fill="none">
      <path
        d="M15.7071 5.29289C15.3166 4.90237 14.6834 4.90237 14.2929 5.29289C13.9024 5.68342 13.9024 6.31658 14.2929 6.70711L18.5858 11L3 11C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13L18.5858 13L14.2929 17.2929C13.9024 17.6834 13.9024 18.3166 14.2929 18.7071C14.6834 19.0976 15.3166 19.0976 15.7071 18.7071L21.7071 12.7071C22.0976 12.3166 22.0976 11.6834 21.7071 11.2929L15.7071 5.29289Z"
        fill="currentColor"
      />
    </svg>
  );
}
