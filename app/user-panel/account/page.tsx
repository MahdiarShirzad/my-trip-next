// --- SWAP POINT ---------------------------------------------------------
// Replace with a real session-based fetch, e.g.:

import AccountHeader from "../_components/AccountHeader";
import PasswordCard from "../_components/PasswordCard";
import ProfileForm from "../_components/ProfileForm";
import VerifiedIdentityCard from "../_components/VerifiedIdentityCard";

// const user = await getCurrentUser(); // reads JWT from cookies, hits your API
interface MockUser {
  name: string;
  email: string;
  phone: string;
  nationalId: string;
  role: "user" | "admin";
}

async function getCurrentUser(): Promise<MockUser> {
  return {
    name: "Mahdyar Shirzad",
    email: "mahdyar@example.com",
    phone: "09121234567",
    nationalId: "0123456789",
    role: "user",
  };
}
// -------------------------------------------------------------------------

export default async function AccountPage() {
  const user = await getCurrentUser();

  return (
    <div>
      <AccountHeader name={user.name} email={user.email} role={user.role} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6 lg:col-span-2">
          <ProfileForm initialName={user.name} initialPhone={user.phone} />
        </div>
        <VerifiedIdentityCard email={user.email} nationalId={user.nationalId} />
        <PasswordCard />
      </div>
    </div>
  );
}
