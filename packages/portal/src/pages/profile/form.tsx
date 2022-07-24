import { Button, CardHeader, Divider, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

import { RootState } from '~/src/store'
import { useAppDispatch, useAppSelector } from '~/src/hooks'
import { setProfile } from '~/src/reducers/userSlice'

const ProfileForm = () => {
  const dispatch = useAppDispatch()
  const { tokenId } = useAppSelector((state: RootState) => state.user)

  const { control, handleSubmit: handleFormSubmit } = useForm({
    defaultValues: {
      name: null,
      salutation: null,
      accredition: null,
    }
  })

  const handleSubmit = (values: any) => {
    try {
      dispatch(setProfile({
        id: tokenId,
        ...values,
      }))
    } catch (err) {
      console.log({ err })
    }

  }
  return (<>
    <CardHeader
      title="Member Profile"
    />
    <form
      onSubmit={handleFormSubmit(handleSubmit)}
    >
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Controller
          name='name'
          control={control}
          render={({
            field: { onChange, onBlur, value, name, ref },
          }) => (
            <TextField
              sx={{ margin: '5px' }}
              label='Name'
              onBlur={onBlur} // notify when input is touched
              onChange={onChange} // send value to hook form
              inputRef={ref}
            />
          )}
        />
        <Controller
          name='salutation'
          control={control}
          render={({
            field: { onChange, onBlur, value, name, ref },
          }) => (
            <TextField
              sx={{ margin: '5px' }}
              label='Salutation'
              onBlur={onBlur} // notify when input is touched
              onChange={onChange} // send value to hook form
              inputRef={ref}
            />
          )}
        />
        <Controller
          name='accredition'
          control={control}
          render={({
            field: { onChange, onBlur, value, name, ref },
          }) => (
            <TextField
              sx={{ margin: '5px' }}
              label='Accredition'
              onBlur={onBlur} // notify when input is touched
              onChange={onChange} // send value to hook form
              inputRef={ref}
            />
          )}
        />
      </div>
      <div style={{ margin: '5px', display: 'flex', justifyContent: 'end' }}>
        <Button variant='contained' type='submit'>
          Save
        </Button>
      </div>
    </form>
  </>)
}

export default ProfileForm