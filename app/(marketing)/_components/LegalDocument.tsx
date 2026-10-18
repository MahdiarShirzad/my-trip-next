export interface LegalSection {
  heading: string;
  body: string[];
  bullets?: string[];
}

interface LegalDocumentProps {
  updated: string;
  intro?: string;
  sections: LegalSection[];
}

export default function LegalDocument({
  updated,
  intro,
  sections,
}: LegalDocumentProps) {
  return (
    <div className="mx-auto my-16 max-w-[820px] px-6 lg:my-20">
      <p className="mb-8 text-sm font-inter text-slate-400 dark:text-slate-500">
        Last updated: <span className="text-slate-500 dark:text-slate-400">{updated}</span>
      </p>

      {intro ? (
        <p className="mb-10 text-base leading-relaxed text-slate-600 dark:text-slate-400">
          {intro}
        </p>
      ) : null}

      <div className="space-y-10">
        {sections.map((section, index) => (
          <section key={section.heading} id={slugify(section.heading)}>
            <h2 className="mb-3 flex items-baseline gap-3 text-xl font-bold text-slate-900 dark:text-white">
              <span className="font-inter text-sm text-[#7167FF]">
                {String(index + 1).padStart(2, "0")}
              </span>
              {section.heading}
            </h2>

            <div className="space-y-3 pl-0 sm:pl-8">
              {section.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-relaxed text-slate-600 dark:text-slate-400"
                >
                  {paragraph}
                </p>
              ))}

              {section.bullets ? (
                <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
