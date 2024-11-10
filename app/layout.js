import "./globals.css";
import Header from "./_components/main/Header";
import { Rubik } from "next/font/google";
import Dots from "./_components/designs/Dots";
import { ThemeProvider } from "./_components/providers/ThemeProvider";
import ReactQueryProvider from "./_components/providers/ReactQueryProvider";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "Somana : [ Main ]",
  description:
    "Somana : Explore blogs, music, podcasts, movies, anime and many more...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${rubik.className} antialiased`}>
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
