import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Button, Typography } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../hooks'
import * as svc from '../services'
import { RootState } from '../store'
import styles from '~/src/styles/Home.module.css'

const Home: NextPage = () => {
  const { account } = useAppSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()

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
        <Typography>
          Connected Wallet: {account}
        </Typography>
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
