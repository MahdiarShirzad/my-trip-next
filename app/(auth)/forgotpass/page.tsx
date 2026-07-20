import ForgotPasswordCard from "../_components/ForgotPasswordCard";
import ForgotPasswordHeader from "../_components/ForgotPasswordHeader";

export default function ForgotPasswordPage() {
  return (
    <>
      <ForgotPasswordHeader />

      <div className="mx-auto my-16 max-w-[1320px] px-6 lg:my-20">
        <ForgotPasswordCard />
      </div>
    </>
  );
}
