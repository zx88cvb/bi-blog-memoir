import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout-wrapper";
import { GoogleAnalytics } from "@next/third-parties/google";
import { constructMetadata } from "@/lib/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 根布局只提供可继承的站点默认信息，不设置任何页面 canonical。
export const metadata = constructMetadata({
  title: "Bi Blog Memoir",
  description: "Personal blog and memoir",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  
  return (
    <html lang="en">
      <head>
        {/* IndexNow 站点验证 */}
        <meta name="IndexNow" content="963011ef5f7746e2b680d9492f292702" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics 统计 */}
        {gaId && <GoogleAnalytics gaId={gaId} />}
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
