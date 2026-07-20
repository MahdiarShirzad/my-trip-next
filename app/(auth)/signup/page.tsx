import SignupHeader from "@/app/(auth)/_components/SignupHeader";
import SignupCard from "@/app/(auth)/_components/SignupCard";

export default function SignupPage() {
  return (
    <>
      <SignupHeader />

      <div className="mx-auto my-16 max-w-[1320px] px-6 lg:my-20">
        <SignupCard />
      </div>
    </>
  );
}
