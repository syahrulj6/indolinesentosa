import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { EdgeStoreProvider } from '@/lib/edgestore';
import { MainNav } from '@/components/sharedComponents/navbar/MainNav';
import { Footer } from '@/components/sharedComponents/footer/Footer';

export const metadata: Metadata = {
  title: {
    default: 'CV Indo-line Sentosa',
    template: '%s | CV Indo-line Sentosa',
  },
  description: 'Cv Indo-line Sentosa',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="shortcut icon" href="/logoIs.jpg" type="image/jgp" />
      </head>
      <body>
        <EdgeStoreProvider>
          <MainNav />
          <div className="">{children}</div>
          <Footer />
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
