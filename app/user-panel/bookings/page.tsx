import { Suspense } from "react";
import BookingsPageContent from "../_components/BookingsPageContent";

export default function BookingsPage() {
  return (
    <Suspense fallback={null}>
      <BookingsPageContent />
    </Suspense>
  );
}
