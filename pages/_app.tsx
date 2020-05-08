import React, { useRef, useEffect } from "react";
import Router from 'next/router'
import NProgress from 'nprogress'
import App, { AppContext } from "next/app";
import { parseCookies } from 'nookies'

import "nprogress/nprogress.css"

Router.events.on('routeChangeStart', url => {
  // console.log(`Loading: ${url}`)
  NProgress.start()
})

Router.events.on('routeChangeComplete', () => NProgress.done())

Router.events.on('routeChangeError', () => NProgress.done())

// const useConstructor = (callBack = () => { }) => {
//   const hasBeenCalled = useRef(false);
//   if (hasBeenCalled.current) return;
//   callBack();
//   hasBeenCalled.current = true;
// }

const MyApp = ({ Component, pageProps }) => {
  // useConstructor(() => {
  //   console.log("useConstructor");
  // })

  return (
    <div className="test">
      <Component {...pageProps} />
    </div>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  let pageProps = {};
  const appProps = await App.getInitialProps(appContext);

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  const cookie = parseCookies(appContext.ctx);

  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      ...pageProps,
      token: cookie?.token
    }
  }
}

export default MyApp;