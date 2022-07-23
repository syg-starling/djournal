import { NextPage } from 'next'
import Head from 'next/head'

import styles from '~/src/styles/Home.module.css'

const Journal: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>DJournal | Journal Page</title>
        <meta name="description" content="Decentralised Journal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        Journal Page
      </div>
    </div>
  )
}

export default Journal
