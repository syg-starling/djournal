import { useEffect } from 'react'
import {
  Button,
  Modal,
  Card,
  Typography,
} from '@mui/material'

import { RootState } from '~/src/store'
import { useAppDispatch, useAppSelector } from '~/src/hooks'
import { getProfile, setModalForm } from '~/src/reducers/userSlice'

import PageLayout from "../PageLayout"

import ProfileForm from './form'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  padding: '10px'
}

const Profile = () => {
  const dispatch = useAppDispatch()
  const { modalForm, profile, tokenId, isMember } = useAppSelector((state: RootState) => state?.user)

  useEffect(() => {
    console.log('useEffect Profile', tokenId)
    if (!isMember || Number(tokenId) < 0) return
    console.log('useEffect Profile DISPATCH', tokenId)
    dispatch(getProfile(tokenId))
  }, [tokenId, isMember])

  return (
    <PageLayout>
      <main>
        <Typography>
          Member Profile
        </Typography>
        <Button onClick={() => { dispatch(setModalForm(true)) }}>
          Edit
        </Button>
        {profile ? (
          <div>
            <div>
              Name: {profile.name}
            </div>
            <div>
              Salutation: {profile.salutation}
            </div>
            <div>
              Accredition: {profile.accredition}
            </div>
          </div>
        ) : (
          <div>
            No profile found
          </div>
        )}
      </main>
      <Modal
        open={modalForm}
        onClose={() => dispatch(setModalForm(false))}
      >
        <Card style={style}>
          <ProfileForm />
        </Card>
      </Modal>
    </PageLayout>
  )
}

export default Profile