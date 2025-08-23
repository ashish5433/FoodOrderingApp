import { Geist, Geist_Mono,Bebas_Neue } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebas=Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
})
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
      <p className={bebas.className} style={{color:"white",fontSize:"32px",paddingLeft:"15px"}}>Boss's Cafe </p>
        {children}
      </body>
    </html>
  );
}
