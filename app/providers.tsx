"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
// import { Provider as ReduxProvider } from "react-redux";
// import { store } from "@/features/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { staleTime: 0 } } }),
  );

  return (
    // <ReduxProvider store={store}>
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <Toaster />
      {children}
    </QueryClientProvider>
    // </ReduxProvider>
  );
}
