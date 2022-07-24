import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { NextPage } from 'next'
import Head from 'next/head'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import styles from '~/src/styles/Home.module.css'
import PageLayout from '../PageLayout'
import { useRouter } from 'next/router'
import Reviews from './reviews'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '~/src/hooks'
import { fetchJournal, selectJournal } from '~/src/reducers/journalSlice'
import SubmitReviewForm from './form-submit-review'
import ModalForm from '~/src/components/formModal'

const Journal: NextPage = () => {
  const router = useRouter()
  const journal = useAppSelector(selectJournal)
  const dispatch = useAppDispatch()
  const [showForm, setModalForm] = useState(false)
  const onClickBack = () => {
    router.push('/journals')
  }

  const onClickSubmitReview = () => {
    setModalForm(true)
  }

  const onClickSubmitApproval = () => { }

  const onCloseModal = () => {
    setModalForm(false)
  }

  useEffect(() => {
    const { id } = router.query
    dispatch(fetchJournal(id))
  }, [])

  if (!journal) {
    return null
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
            {
              !journal.reviewStarted &&
              <Button size="small" color="info" onClick={onClickSubmitReview}>
                Submit for Review
              </Button>
            }
            <Button size="small" color="inherit" onClick={onClickSubmitApproval}>
              Submit for Approval
            </Button>
          </CardActions>
        </Card>
        <Reviews journal={journal} />
      </div>
      <ModalForm
        modalForm={showForm}
        onClose={onCloseModal}
      >
        <SubmitReviewForm journalId={journal?.id} onCloseForm={onCloseModal} />
      </ModalForm>
    </PageLayout>
  )
}

export default Journal
