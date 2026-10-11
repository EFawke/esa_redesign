import Metadata from "next"
import { Geist, Geist_Mono } from "next/font/google";
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { Header } from "./header/Header";
import { cookies } from "next/headers";
import Script from "next/script";
import { ThemeProvider } from "./ThemeProvider";
import "./globals.css";

// Runs before first paint so the correct theme is on <html> immediately — no dark flash.
const themeScript = `
(function () {
  try {
    var m = document.cookie.match(/(?:^|;\\s*)appearance=(light|dark)/);
    var a = m ? m[1] : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var d = document.documentElement;
    d.classList.add(a);
    d.style.colorScheme = a;
  } catch (e) {}
})();`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Eve Subsystem Analysis",
  description: "Building tool for Eve Online T3 manufacturing",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const stored = cookieStore.get("appearance")?.value;
  const initialAppearance =
    stored === "light" || stored === "dark" ? stored : undefined;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_MEASUREMENT_ID}');
          `}
        </Script>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          initialAppearance={initialAppearance}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
