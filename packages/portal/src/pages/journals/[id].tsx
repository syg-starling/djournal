import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { NextPage } from 'next'
import Head from 'next/head'

import styles from '~/src/styles/Home.module.css'
import PageLayout from '../PageLayout'

const Journal: NextPage = () => {
  return (
    <PageLayout>
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
    </PageLayout>
  )
}

export default Journal
