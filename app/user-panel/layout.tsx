import UserSidebar from "./_components/UserSidebar";

export default function UserPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0B1120]">
      <div className="h-20 w-full bg-[#0B1120]" />

      <div className="mx-auto max-w-[1320px] px-6 py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <UserSidebar />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>
    </main>
  );
}
