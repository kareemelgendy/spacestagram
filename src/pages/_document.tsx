import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta
            name='description'
            content='Spacestagram. An image-sharing application using NASAs Picture of the Day API'
          />
          <meta name='theme-color' content='#efefef' />
          <link rel='preconnect' href='https://apod.nasa.gov/' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
