import '../styles/globals.css'
import { useEffect } from 'react';
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(()=>{
    if ('serviceWorker' in navigator) {

      // register service worker
      navigator.serviceWorker.register('../service-worker.js');
    }
  }, [])
  return <>
    <Component {...pageProps} />
    <ToastContainer />
  </>
}

export default MyApp
