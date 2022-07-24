import { Button, CardHeader, InputAdornment, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '~/src/hooks'
import { fetchJournals, selectStatus, startReview, StatusEnum } from '~/src/reducers/journalSlice'

const SubmitReviewForm = ({ journalId, onCloseForm }: any) => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectStatus)

  const { control, handleSubmit: handleFormSubmit, reset } = useForm({
    defaultValues: { bounty: 0, reviewClosedAt: null }
  })

  const handleSubmit = (values: any) => {
    try {
      dispatch(startReview({ ...values, id: journalId }))
      reset({})
      onCloseForm()
    } catch (err) {
      console.log({ err })
    }
  }

  useEffect(() => {
    if (status.startReview === StatusEnum.Idle) {
      dispatch(fetchJournals())
    }
  }, [status.startReview])

  return (
    <>
      <CardHeader
        title="Submit for Review"
      />
      <form
        method='POST'
        onSubmit={handleFormSubmit(handleSubmit)}
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Controller
            name='bounty'
            control={control}
            render={({
              field: { onChange, onBlur, ref },
            }) => (
              <TextField
                type="number"
                sx={{ margin: '5px' }}
                label='Reward Amount'
                onBlur={onBlur} // notify when input is touched
                onChange={onChange} // send value to hook form
                inputRef={ref}
                InputProps={{
                  endAdornment: <InputAdornment position="end">MATIC</InputAdornment>,
                }}
              />
            )}
          />
          <Controller
            name='reviewClosedAt'
            control={control}
            render={({
              field,
            }) => (
              <DatePicker
                label="Review End Date"
                onChange={field.onChange}
                value={field.value || null}
                inputFormat="dd/MM/yyyy"
                minDate={new Date()}
                renderInput={(params) => {
                  return (
                    <TextField fullWidth {...params} sx={{ px: '5px', my: '10px' }} />
                  )
                }}
                desktopModeMediaQuery="@media (pointer: fine)" // defines when it will be desktop mode, else mobile mode
              />
            )}
          />
        </div>
        <div style={{ margin: '5px', display: 'flex', justifyContent: 'end' }}>
          <Button variant='contained' type='submit'>Submit</Button>
        </div>
      </form>
    </>
  )
}

export default SubmitReviewForm