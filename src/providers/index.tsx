import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function Providers({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <NextTopLoader easing="ease" showSpinner={false} color="var(--primary)" />
      {children}
      <Toaster position="top-center" />
    </NextIntlClientProvider>
  );
}
