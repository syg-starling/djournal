import { Avatar, Button, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Rating, TextField, Typography } from "@mui/material"
import moment from 'moment'
import { useState } from "react"

import { RootState } from '~/src/store'
import { useAppDispatch, useAppSelector } from "~/src/hooks"
import { JournalReview } from "~/src/models"
import { createJournalReview, selectReviews } from "~/src/reducers/journalReviewSlice"

const Reviews = ({ journal }: any) => {
  const { account } = useAppSelector((state: RootState) => state.user)
  const [review, setReview] = useState('')
  const [rating, setRating] = useState(0)
  const reviews = useAppSelector(selectReviews) || []
  const dispatch = useAppDispatch()
  const isReviewable = moment().isBefore(moment(journal.reviewClosedAt)) // indicate if the journal review deadline has been met

  const onReviewChange = (e: any) => {
    setReview(e.target.value)
  }

  const onRatingChange = (e: any, value: number) => {
    setRating(value)
  }
  const onSubmitReview = () => {
    dispatch(createJournalReview({ remarks: review, rating, reviewerId: account, journalId: journal.id }))
  }

  return (
    <Paper elevation={0} variant="outlined" sx={{ mt: '2rem', p: '1rem' }}>
      <div style={{ padding: '1rem' }}>
        <Typography variant="h6"> Reviews ({reviews.length || 0}) </Typography>
      </div>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {
          isReviewable && (
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={review?.reviewer?.name} src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <Grid container>
                <Grid item xs={10}>
                  <Rating
                    name="rating"
                    value={rating}
                    onChange={onRatingChange}
                  />
                  <br />
                  <TextField name="review" onChange={onReviewChange} value={review} fullWidth />
                </Grid>
                <Grid item xs={2} style={{ padding: '1rem' }}>
                  <Button variant="contained" sx={{ ml: '1rem' }} onClick={onSubmitReview}>Submit</Button>
                </Grid>
              </Grid>
            </ListItem>
          )
        }
        {
          reviews.map((review: JournalReview, index: number) => (
            <>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={review?.reviewer?.name} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={<Rating precision={0.5} max={5} value={review.rating} readOnly />}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {review.remarks}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index !== reviews.length - 1 && <Divider variant="inset" component="li" sx={{ mr: '1rem' }} />}
            </>
          ))
        }
      </List>
    </Paper>
  )
}

export default Reviews