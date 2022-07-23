import { NextPage } from 'next'
import Head from 'next/head'

import styles from '~/src/styles/Home.module.css'

const Journals: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>DJournal | Journal List</title>
        <meta name="description" content="Decentralised Journal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        Journal List
      </div>
    </div>
  )
}

export default Journals
