import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";

export default function GuestLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="mx-auto w-full max-w-5xl flex-1 px-6">{children}</div>
      <Footer />
    </div>
  );
}
