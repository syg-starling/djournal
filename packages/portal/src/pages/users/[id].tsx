import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '~/src/hooks'
import { selectName, getPrice, selectPrice } from '~/src/reducers/userSlice'

import styles from '~/src/styles/Home.module.css'
import PageLayout from '../PageLayout'

const User: NextPage = () => {
  const userName = useAppSelector(selectName)
  const price = useAppSelector(selectPrice)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPrice())
  }, [])
  return (
    <PageLayout>
      <div className={styles.container}>
        <Head>
          <title>DJournal | User Page</title>
          <meta name="description" content="Decentralised Journal" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div>
          User {userName}
          <br />
          Ethereum Price: {price}
        </div>
      </div>
    </PageLayout>
  )
}

export default User
