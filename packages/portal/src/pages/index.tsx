import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Button } from '@mui/material'

import styles from '~/src/styles/Home.module.css'
import * as svc from '../services'

const Home: NextPage = () => {
  const handleClick = () => {
    svc.getUsers({})
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>DJournal</title>
        <meta name="description" content="Decentralised Journal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Button
          variant="contained"
          onClick={handleClick}
        >
          Test
        </Button>
        <Link href="/users">User List</Link>
        <Link href="/journals">Journal List</Link>
      </main>
    </div>
  )
}

export default Home
