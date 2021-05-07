import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import "./styles.css"

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to jpl!</title>
      </Head>

      <div className="app">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default CustomApp;
