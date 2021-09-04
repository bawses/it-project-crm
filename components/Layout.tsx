import React, { ReactNode } from 'react';
import Head from 'next/head';
import PersonalNavbar from "./PersonalNavbar";

type Props = {
    children?: ReactNode
    title?: string
}

export default function Layout({ children, title = 'CataLog' }: Props) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <PersonalNavbar/>
      {children}
    </div>
  )
    
}