import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';
import Head from 'expo-router/head';
import React from 'react';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {}
        <ScrollViewStyleReset />

        {}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-L0KCEMVECM"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L0KCEMVECM');
          `}
        </script>

        {}
      </head>
      <Head>
        <title>Seahawks Today</title>
        <meta name="description" content="An unfiltered Seahawks blog with insightful analysis." />
        <meta property="og:image" content="https://pbs.twimg.com/profile_images/1577822032490041344/9sm_ZYGp_400x400.jpg" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
