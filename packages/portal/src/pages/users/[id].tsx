import { NextPage } from 'next'
import Head from 'next/head'

import styles from '~/src/styles/Home.module.css'

const User: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>DJournal | User Page</title>
        <meta name="description" content="Decentralised Journal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        User Page
      </div>
    </div>
  )
}

export default User
