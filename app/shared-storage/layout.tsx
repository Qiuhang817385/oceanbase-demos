import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

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
  title: $i18n.get({id:"oceanbase-demo.app.shared-storage.layout.SharedStorageDemo",dm:"共享存储 Demo"}),
  description: $i18n.get({id:"oceanbase-demo.app.shared-storage.layout.OceanbaseSharedStorageDemoApp",dm:"OceanBase 共享存储演示应用"})
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