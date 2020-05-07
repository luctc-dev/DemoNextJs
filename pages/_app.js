import React, { useRef, useEffect, useLayoutEffect } from "react";
import Router from 'next/router'
import NProgress from 'nprogress'
import "nprogress/nprogress.css"

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})

Router.events.on('routeChangeComplete', () => NProgress.done())

Router.events.on('routeChangeError', () => NProgress.done())

const useConstructor = (callBack = () => { }) => {
  const hasBeenCalled = useRef(false);
  if (hasBeenCalled.current) return;
  callBack();
  hasBeenCalled.current = true;
}

const MyApp = ({ Component, pageProps }) => {
  useConstructor(() => {
    console.log("useConstructor");
  })
  useEffect(() => {
    console.log("useEffect run");
  }, [])
  useLayoutEffect(() => {
    console.log("useLayoutEffect run");
  }, [])

  console.log("rerender");
  return (
    <div className="test">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp;