import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import './globals.css';
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/sections/NewsletterSection";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: "Prince Adeola - Global Speaker || Saxophonist || Author",
  description: "Writer and Global Speaker - Prince Adeola. A transformative Speaker and Writer on Spiritual growth, faith, and purpose. Preorder your copy today.",
  authors: [{ name: "Prince Adeola" }],
  keywords: ["Hello, I am Light - It is Light to meet you", "Prince Adeola", "Adeola Prince", "spiritual growth", "faith", "Christian book", "preorder"],
  metadataBase: new URL("https://www.princeadeola.com"),
  icons: {
    icon: "/icon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script src="https://js.paystack.co/v1/inline.js" />
      </head>
      <body className={`${inter.variable} ${playfairDisplay.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />  
          {children}
          <NewsletterSection />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}