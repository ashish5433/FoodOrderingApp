import Link from "next/link";
import { Geist, Geist_Mono, Macondo } from "next/font/google";
import "./globals.css";
import { TiHome } from "react-icons/ti";

import { use } from "react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const macondo = Macondo({
  subsets: ["latin"],
  weight: "400", // Macondo only has regular 400
});
export const metadata = {
  title: "Food Ordering",
  description: "App Designed for food ordering at restraunt.",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        <div className="nav">
          <p className={macondo.className} style={{ color: "white", fontSize: "48px" }}>{"Boss's Cafe"} </p>
          <Link href='/'><TiHome className="home-logo" /></Link>
        </div>
        <main>
        {children}
        </main>
      </body>
    </html>
  );
}
