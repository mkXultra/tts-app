import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ProviderWrapper from "./utils/ProviderWrapper";
import Header from './components/Header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Text to Speech App',
  description: 'Convert text to speech using Google Cloud TTS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <ProviderWrapper>
        <body className={`${inter.className} antialiased`}>
          <Header />
          <main>{children}</main>
        </body>
      </ProviderWrapper>
    </html>
  );
}