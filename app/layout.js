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
