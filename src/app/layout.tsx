import { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { getUserByCookie } from '@/components/db/neon';
import { Toaster } from 'sonner';

const jbMono = JetBrains_Mono({
  variable: '--font-jb-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Pokemon",
};





export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {


  const user = await getUserByCookie();

  return (
    <html lang="en" className={`${jbMono.className} h-full antialiased bg-slate-950 text-slate-200 flex flex-col w-full min-h-screen`}>

      <body className="min-h-full flex flex-col">
        <Navbar user={user} />
        {children}
        <Footer />
        <Toaster position="top-center" richColors={true} theme='dark' offset={70} toastOptions={{
          classNames: { toast: '!bg-slate-900/90 !border !border-slate-700 !font-extrabold !text-lg !justify-center !text-center', },
        }} />
      </body>

    </html>
  );
}
