import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <title>Kinorea</title>
      <link rel="icon" href="/helmet.png" />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
