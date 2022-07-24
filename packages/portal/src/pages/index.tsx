import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Typography } from '@mui/material'

import { useAppSelector } from '../hooks'
import { RootState } from '../store'
import styles from '~/src/styles/Home.module.css'

const Home: NextPage = () => {
  const { account } = useAppSelector((state: RootState) => state.user)
  return (
    <div className={styles.container}>
      <Head>
        <title>DJournal</title>
        <meta name="description" content="Decentralised Journal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Typography variant="h1">
          DJournal: Decentralised Journal
        </Typography>
        <Typography variant="caption">
          Connected Wallet: {account}
        </Typography>
        <div style={{ padding: '2rem', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ padding: '1rem', margin: '1rem', textAlign: 'center' }}>
            <Link href="/users">
              User List
            </Link>
          </div>
          <div style={{ padding: '1rem', margin: '1rem', textAlign: 'center' }}>
            <Link href="/journals">
              Journal List
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
