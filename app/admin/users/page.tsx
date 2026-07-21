"use client";

import { useEffect, useState, useCallback } from "react";
import { Users as UsersIcon, ChevronRight } from "lucide-react";
import SearchInput from "../_components/SearchInput";
import Pagination from "../_components/Pagination";
import Badge from "../_components/Badge";
import UserModal from "./_components/UserModal";
import { api, buildQuery } from "../_lib/api";
import { AdminUser, Paginated } from "../_lib/types";

const LIMIT = 10;

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<AdminUser | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const query = buildQuery({
        page,
        limit: LIMIT,
        keyword: search || undefined,
      });
      const res = await api.get<Paginated<AdminUser>>(`/users${query}`);
      setUsers(res.data);
      setTotal(res.total);
    } catch {
      setError("Failed to fetch users list");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    load();
  }, [load]);

  const totalPages = Math.max(Math.ceil(total / LIMIT), 1);

  return (
    <div className="space-y-4">
      <SearchInput
        value={search}
        onChange={(v) => {
          setPage(1);
          setSearch(v);
        }}
        placeholder="Search by name or email..."
      />

      {error && (
        <div className="rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 text-sm px-4 py-3">
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="text-left font-medium px-4 py-3">Name</th>
                <th className="text-left font-medium px-4 py-3">Email</th>
                <th className="text-left font-medium px-4 py-3">Phone</th>
                <th className="text-left font-medium px-4 py-3">Role</th>
                <th className="text-left font-medium px-4 py-3">Status</th>
                <th className="text-left font-medium px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-slate-400"
                  >
                    Loading...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-slate-400"
                  >
                    <UsersIcon className="w-6 h-6 mx-auto mb-2 opacity-50" />
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr
                    key={u._id}
                    onClick={() => setSelected(u)}
                    className="border-b border-slate-100 dark:border-slate-800/60 last:border-0 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/30"
                  >
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                      {u.name}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      {u.email}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      {u.phone}
                    </td>
                    <td className="px-4 py-3">
                      <Badge value={u.role} />
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        value={u.isActive === false ? "disabled" : "active"}
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <ChevronRight className="w-4 h-4 text-slate-400 inline" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          page={page}
          totalPages={totalPages}
          total={total}
          limit={LIMIT}
          onChange={setPage}
        />
      </div>

      <UserModal
        open={Boolean(selected)}
        user={selected}
        onClose={() => setSelected(null)}
        onUpdated={load}
      />
    </div>
  );
}
