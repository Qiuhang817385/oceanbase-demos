import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';import $i18n from "../../i18n";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: $i18n.get({id:"oceanbase-demo.app.materialized-view.layout.MaterializedViewDemo",dm:"物化视图 Demo"}),
  description: $i18n.get({id:"oceanbase-demo.app.materialized-view.layout.OceanbaseMaterializedViewDemoApplication",dm:"OceanBase 物化视图演示应用"})
};

export default function RootLayout({
  children


}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        {children}
      </body>
    </html>);

}