export default function TicketDivider() {
  return (
    <div className="relative flex items-center">
      <div className="absolute -left-3 w-6 h-6 rounded-full bg-[#F7F7FB] dark:bg-slate-900" />
      <div className="absolute -right-3 w-6 h-6 rounded-full bg-[#F7F7FB] dark:bg-slate-900" />
      <div className="w-full border-t border-dashed border-slate-200 dark:border-slate-600" />
    </div>
  );
}
