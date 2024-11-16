import "./globals.css";
import Header from "./_components/main/Header";
import Dots from "./_components/designs/Dots";
import { ThemeProvider } from "./_components/providers/ThemeProvider";
import ReactQueryProvider from "./_components/providers/ReactQueryProvider";
import { Rubik } from "next/font/google";

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
      </body>
    </html>
  );
}
