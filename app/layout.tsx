"use client";

import '@mantine/core/styles.css';
import { ColorSchemeScript,createTheme, MantineProvider } from '@mantine/core';

import NavBar from './_components/navbar'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

/* export const metadata: Metadata = {
*   title: "Project Management",
*   description: "project website",
* }; */

const mantineTheme = createTheme({
  /** Put your mantine theme override here */
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <ColorSchemeScript />
      </head>

      <body className={inter.className}>
	<div className='mt-[150px]'>
          <MantineProvider theme={mantineTheme}>
            <NavBar />
            {children}
          </MantineProvider>
	</div>
      </body>
    </html>
  );
}
