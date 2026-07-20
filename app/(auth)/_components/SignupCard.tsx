import Image from "next/image";
import SignupForm from "@/app/(auth)/_components/SignupForm";

export default function SignupCard() {
  return (
    <div className="mx-auto w-full max-w-[560px] rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
      <Image
        src="/images/logo-dark.png"
        alt="MyTrip"
        width={180}
        height={40}
        className="mx-auto h-auto w-[180px] dark:hidden"
      />
      <Image
        src="/images/logo.png"
        alt="MyTrip"
        width={180}
        height={40}
        className="mx-auto hidden h-auto w-[180px] dark:block"
      />

      <p className="mt-4 text-center text-base text-slate-500 dark:text-slate-400">
        Create your MyTrip account
      </p>

      <SignupForm />
    </div>
  );
}
