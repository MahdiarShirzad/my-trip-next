import LoginHeader from "@/app/(auth)/_components/LoginHeader";
import LoginCard from "@/app/(auth)/_components/LoginCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <>
      <LoginHeader />

      <div className="mx-auto my-16 max-w-[1320px] px-6 lg:my-20">
        <LoginCard />
      </div>
    </>
  );
}
