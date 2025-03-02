import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProvider from "./ClientProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Digital Menu Ethioapia",
  description:
    "Digital Menu Ethiopia empower restaurant found in Ethiopia to create digital menu for their customers. and also help customers to order food online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
