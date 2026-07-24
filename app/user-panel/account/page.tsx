"use client";

import AccountHeader from "../_components/AccountHeader";
import PasswordCard from "../_components/PasswordCard";
import ProfileForm from "../_components/ProfileForm";
import VerifiedIdentityCard from "../_components/VerifiedIdentityCard";
import { useAuth } from "@/app/_components/AuthProvider";

export default function AccountPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-[#7167FF]" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div>
      <AccountHeader
        name={user.name ?? ""}
        email={user.email}
        role={user.role}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6 lg:col-span-2">
          <ProfileForm
            initialName={user.name ?? ""}
            initialPhone={user.phone ?? ""}
          />
        </div>
        <VerifiedIdentityCard
          email={user.email}
          nationalId={user.nationalId ?? ""}
        />
        <PasswordCard />
      </div>
    </div>
  );
}
