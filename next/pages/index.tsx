import Head from 'next/head';
import Layout from '../components/Layout/Layout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Diet app</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1>Home</h1>
      </Layout>
    </>
  );
}
