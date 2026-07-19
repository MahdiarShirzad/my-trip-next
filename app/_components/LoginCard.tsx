import Image from "next/image";
import LoginForm from "@/app/_components/LoginForm";

export default function LoginCard() {
  return (
    <div className="mx-auto w-full max-w-[560px] rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
      {/* Light mode: dark logo on the white card background */}
      <Image
        src="/images/logo-dark.png"
        alt="MyTrip"
        width={180}
        height={40}
        className="mx-auto h-auto w-[180px] dark:hidden"
      />
      {/* Dark mode: light logo on the dark card background */}
      <Image
        src="/images/logo.png"
        alt="MyTrip"
        width={180}
        height={40}
        className="mx-auto hidden h-auto w-[180px] dark:block"
      />

      <p className="mt-4 text-center text-base text-slate-500 dark:text-slate-400">
        Login with your MyTrip account
      </p>

      <LoginForm />
    </div>
  );
}
