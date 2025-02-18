import "./globals.css";
import Header from "./_components/main/Header";
import Dots from "./_components/designs/Dots";
import { ThemeProvider } from "./_components/providers/ThemeProvider";
import ReactQueryProvider from "./_components/providers/ReactQueryProvider";
import { Kanit, Montserrat, Nunito_Sans, Rubik } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

const fonts = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "Somana | Explore",
  description:
    "Somana : Explore blogs, music, podcasts, movies, anime and many more...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Add Google Analytics script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4T3N7M8Q6Y"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4T3N7M8Q6Y');
            `,
          }}
        />

        {/* Google Adsense script */}
        <meta
          name="google-adsense-account"
          content="ca-pub-3750195818284635"
        ></meta>

        {/* Adsterra Social Bar (Updated) */}
        <Script
          src="//pl24108933.effectiveratecpm.com/6d/f8/17/6df8171da1018fd7c9114e8a5b55b7ba.js"
          strategy="lazyOnload"
        />

        <Script
          src="//pl24109204.effectiveratecpm.com/2a23f44d708874fffe31b49e3f5cd5d5/invoke.js"
          strategy="lazyOnload"
        />

        <Script
          src="//pl24108613.effectiveratecpm.com/5e/01/19/5e011983bc3dd426495a69571c73ae5c.js"
          strategy="lazyOnload"
        ></Script>

        <Script
          src="//www.highperformanceformat.com/bcc1400ed4c6e1019b60916e7171eb70/invoke.js"
          strategy="lazyOnload"
        ></Script>
      </head>
      <body className={`${fonts.className} antialiased`}>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div className="sticky z-50 flex justify-center">
              <Header />
            </div>
            {/* <Dots>{children}</Dots> */}
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
