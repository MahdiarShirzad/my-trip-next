export default function Title({
  title,
  desc,
  isCommentTitle,
}: {
  title: string;
  desc: string;
  isCommentTitle: boolean;
}) {
  return (
    <div className={`flex flex-col ${!isCommentTitle && "items-center"}`}>
      <span
        className={`px-6 py-1.5 ${!isCommentTitle && "mx-auto inline-block"} ${
          isCommentTitle && "w-48"
        } text-center bg-[#7167FF] font-interSemiBold text-white rounded-full text-sm uppercase tracking-widest shadow-sm shadow-[#7167FF]/30`}
      >
        {title}
      </span>
      <p
        className={`${
          !isCommentTitle && "text-center"
        } text-[#4f4b8b] dark:text-slate-200 font-interBold text-3xl sm:text-4xl mt-4 tracking-tight`}
      >
        {desc}
      </p>
    </div>
  );
}
