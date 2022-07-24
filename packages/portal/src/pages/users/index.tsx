import { NextPage } from 'next'
import Head from 'next/head'

import styles from '~/src/styles/Home.module.css'
import PageLayout from '../PageLayout'

const Users: NextPage = () => {
  return (
    <PageLayout>
      <div className={styles.container}>
        <Head>
          <title>DJournal | User List</title>
          <meta name="description" content="Decentralised Journal" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div>
          User List
        </div>
      </div>
    </PageLayout>
  )
}

export default Users
