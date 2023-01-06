import '../assets/scss/main.scss';
import type { AppProps } from 'next/app';
import wrapper from '../store';
import { Provider } from 'react-redux';
import Head from 'next/head';

export default (function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...props.pageProps} />
    </Provider>
  );
});
