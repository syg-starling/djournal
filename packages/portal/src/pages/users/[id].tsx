import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useAppDispatch } from '~/src/hooks'
import { getProfile } from '~/src/reducers/userSlice'

import styles from '~/src/styles/Home.module.css'
import PageLayout from '../PageLayout'

const User: NextPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [profile, setProfile] = useState(null)

  const { id } = router.query

  const fetchProfile = async (addr) => {
    const res = await dispatch(getProfile(addr)).unwrap()
    setProfile(res)
  }

  useEffect(() => {
    if (!id) return
    fetchProfile(id)
  }, [id])

  return (
    <PageLayout>
      <div className={styles.container}>
        <Head>
          <title>DJournal | User Page</title>
          <meta name="description" content="Decentralised Journal" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
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
      </div>
    </PageLayout>
  )
}

export default User
