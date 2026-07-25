import type { Metadata } from "next";
import Sidebar from "./_components/Sidebar";
import Topbar from "./_components/Topbar";

export const metadata: Metadata = {
  title: "Admin Panel",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0B1120]">
      <div className="h-20 w-full bg-[#0B1120]" />

      <div className="mx-auto max-w-[1320px] px-6 py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <Sidebar />
          <div className="min-w-0 flex-1">
            <Topbar />
            <div className="mt-6">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
