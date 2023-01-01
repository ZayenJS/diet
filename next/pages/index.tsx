import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import { APP_NAME } from '../constants';

export default function Home() {
  return (
    <>
      <Head>
        <title>{APP_NAME} | Accueil</title>
        <meta name="description" content="Trouvez des recettes saines et équilibrées pour votre régime" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1>Home</h1>
      </Layout>
    </>
  );
}
