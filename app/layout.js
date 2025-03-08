import "./globals.css";
import Header from "./_components/main/Header";
import Dots from "./_components/designs/Dots";
import { ThemeProvider } from "./_components/providers/ThemeProvider";
import ReactQueryProvider from "./_components/providers/ReactQueryProvider";
import { Kanit, Montserrat, Nunito_Sans, Rubik } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import Bot from "./_components/main/Bot";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ApplePodcastsLogo,
  BookOpen,
  DotsThree,
  House,
  MusicNote,
  MusicNoteSimple,
  Sparkle,
  User,
} from "@phosphor-icons/react/dist/ssr";
import { Separator } from "@/components/ui/separator";
import Footer from "./_components/main/Footer";
import SideBar from "./_components/main/SideBar";

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

        {/* Global Ads script of adsense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3750195818284635"
          crossOrigin="anonymous"
        />

        {/* Adsterra Social Bar (Updated) */}
        {/* <Script
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
        ></Script> */}
      </head>
      <body className={`${fonts.className} dark:bg-black antialiased`}>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div className="fixed top-0 left-0 w-full z-50">
              <Header />
            </div>
            <div className="max-w-[1250px] mt-14 mx-auto w-full flex">
              <div className="w-1.5/6 hidden sm:block h-screen sticky top-14 overflow-y-auto border-r px-2">
                <SideBar />
              </div>
              <div className="flex-1 overflow-y-auto px-2">{children}</div>
              <div className="w-1/6 hidden sm:block  h-screen sticky top-14 overflow-y-auto px-2"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="max-w-[1250px] w-full">
                <Footer />
              </div>
            </div>
            <Bot />
          </ThemeProvider>
        </ReactQueryProvider>

        {/* Other Components */}
        <Toaster />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
