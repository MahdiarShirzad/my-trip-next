interface ContactInfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function ContactInfoItem({ icon, label, value }: ContactInfoItemProps) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#7167FF] shadow-md shadow-[#7167FF]/25">
        {icon}
      </span>
      <div className="font-inter">
        <p className="text-sm font-bold text-slate-900 dark:text-white">
          {label}
        </p>
        <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function ContactInfo() {
  return (
    <div className="w-full rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">
        Contact Information
      </h2>

      <div className="space-y-6">
        <ContactInfoItem
          label="Office Address"
          value="Mazandaran, Sari"
          icon={
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="white"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
              />
            </svg>
          }
        />

        <ContactInfoItem
          label="Call Us"
          value="+98 938 449 4884"
          icon={
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="white"
              strokeWidth={2}
              transform="matrix(-1, 0, 0, 1, 0, 0)"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 5.5C21 14.0604 14.0604 21 5.5 21C5.11378 21 4.73086 20.9859 4.35172 20.9581C3.91662 20.9262 3.69906 20.9103 3.50103 20.7963C3.33701 20.7019 3.18146 20.5345 3.09925 20.364C3 20.1582 3 19.9181 3 19.438V16.6207C3 16.2169 3 16.015 3.06645 15.842C3.12515 15.6891 3.22049 15.553 3.3441 15.4456C3.48403 15.324 3.67376 15.255 4.05321 15.117L7.26005 13.9509C7.70153 13.7904 7.92227 13.7101 8.1317 13.7237C8.31637 13.7357 8.49408 13.7988 8.64506 13.9058C8.81628 14.0271 8.93713 14.2285 9.17882 14.6314L10 16C12.6499 14.7999 14.7981 12.6489 16 10L14.6314 9.17882C14.2285 8.93713 14.0271 8.81628 13.9058 8.64506C13.7988 8.49408 13.7357 8.31637 13.7237 8.1317C13.7101 7.92227 13.7904 7.70153 13.9509 7.26005L15.117 4.05321C15.255 3.67376 15.324 3.48403 15.4456 3.3441C15.553 3.22049 15.6891 3.12515 15.842 3.06645C16.015 3 16.2169 3 16.6207 3H19.438C19.9181 3 20.1582 3 20.364 3.09925C20.5345 3.18146 20.7019 3.33701 20.7963 3.50103C20.9103 3.69907 20.9262 3.91662 20.9581 4.35173C20.9859 4.73086 21 5.11378 21 5.5Z"
              />
            </svg>
          }
        />

        <ContactInfoItem
          label="Email Us"
          value="mahdiar55582@gmail.com"
          icon={
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23 6V18C23 19.6523 21.6523 21 20 21H4C2.34772 21 1 19.6523 1 18V6C1 4.34315 2.34315 3 4 3H20C21.6569 3 23 4.34315 23 6ZM3.10658 5.55395C3.27196 5.22692 3.61204 5 4 5H20C20.388 5 20.728 5.22692 20.8934 5.55395L12 11.7793L3.10658 5.55395ZM3 7.92066L10.8531 13.4178C11.5417 13.8999 12.4583 13.8999 13.1469 13.4178L21 7.92066V18C21 18.5477 20.5477 19 20 19H4C3.45228 19 3 18.5477 3 18V7.92066Z"
                fill="white"
              />
            </svg>
          }
        />

        <ContactInfoItem
          label="Open Time"
          value="Mon - Sat (10:00 AM - 05:30 PM)"
          icon={
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="white"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 7V12H9M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              />
            </svg>
          }
        />
      </div>
    </div>
  );
}
