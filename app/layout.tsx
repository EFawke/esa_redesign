import { Geist, Geist_Mono } from "next/font/google";
import "@radix-ui/themes/styles.css";
import { cookies } from "next/headers";
import Script from "next/script";
import { ThemeProvider } from '@/app/ThemeProvider';
import { Footer } from '@/app/Footer';
import '@/app/globals.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EVE Subsystem Analysis",
  description: "Building tool for EVE Online T3 manufacturing",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const stored = cookieStore.get("appearance")?.value;
  const initialAppearance = stored === "light" || stored === "dark" ? stored : undefined;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID}');
          `}
        </Script>
        <Script id="set-theme" strategy="beforeInteractive">
          {`
            (function () {
              try {
                var m = document.cookie.match(/(?:^|;\\s*)appearance=(light|dark)/);
                var a = m ? m[1] : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                var d = document.documentElement;
                d.classList.add(a);
                d.style.colorScheme = a;
              } catch (e) {}
            })();
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          initialAppearance={initialAppearance}
        >
          {children}
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
