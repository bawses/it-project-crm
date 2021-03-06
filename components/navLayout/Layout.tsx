/**
 * CataLog Nav Layout for both Personal and Organisational accounts.
 * Contains both Navbar (desktop + mobile) and Footer (mobile only)
 */

import React, { ReactNode } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

type Props = {
  children?: ReactNode;
  title?: string;
  pageType?: string;
};

export default function Layout({
  children,
  title = "CataLog",
  pageType = "personal",
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar pageType={pageType} />
      {children}
      {/* Responsive design - Show bottom navigation if mobile */}
      {isMobile ? <Footer pageType={pageType} /> : <></>}
    </div>
  );
}
