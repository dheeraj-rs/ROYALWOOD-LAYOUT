import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Providers } from './providers';
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: 'Royalwood - Luxury Furniture Collection',
  description: 'Discover exceptional luxury furniture crafted with premium materials and timeless design. Transform your space with Royalwood.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
