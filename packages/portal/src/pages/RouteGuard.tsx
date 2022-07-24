import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { useAppDispatch, useAppSelector } from '../hooks'
import { RootState } from '../store'
import { connect } from '../reducers/userSlice'

export { RouteGuard }

function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const { account } = useAppSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    // on initial load - run auth check 
    authCheck(router.asPath)

    if (
      window.localStorage.getItem('connectorId') === 'injected'
    ) {
      dispatch(connect())
    }

    // on route change start - hide page content by setting authorized to false  
    const hideContent = () => setAuthorized(false)
    router.events.on('routeChangeStart', hideContent)

    // on route change complete - run auth check 
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent)
      router.events.off('routeChangeComplete', authCheck)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in 
    const publicPaths = ['/login']
    const path = url.split('?')[0]
    if (!account && !publicPaths.includes(path)) {
      setAuthorized(false)
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath }
      })
    } else {
      setAuthorized(true)
    }
  }

  return (authorized && children)
}