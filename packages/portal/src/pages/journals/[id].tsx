import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { NextPage } from 'next'
import Head from 'next/head'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import moment from 'moment'

import styles from '~/src/styles/Home.module.css'
import PageLayout from '../PageLayout'
import { useRouter } from 'next/router'
import Reviews from './reviews'

const journal = {
  id: '3',
  journalName: 'Getting roasted 24/7',
  authorName: 'Chua Wei Siong',
  yearPublished: '1990',
  details: 'Sample Content',
  reviewClosedAt: moment().add(1, 'd'),
}

const Journal: NextPage = () => {
  const router = useRouter()
  const onClickBack = () => {
    router.push('/journals')
  }
  return (
    <PageLayout>
      <div className={styles.container}>
        <Button
          variant='text'
          onClick={onClickBack}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
        <Head>
          <title>DJournal | Journal Page</title>
          <meta name="description" content="Decentralised Journal" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {journal.journalName}
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              {journal.authorName} - Published in {journal.yearPublished}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {journal.details}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="info">
              Submit for Approval
            </Button>
          </CardActions>
        </Card>
        <Reviews journal={journal} />
      </div>
    </PageLayout>
  )
}

export default Journal
