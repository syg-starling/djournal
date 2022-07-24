import { NextPage } from 'next'
import Head from 'next/head'
import { 
  Button,
  Typography,
  CircularProgress,
} from '@mui/material'

import styles from '~/src/styles/Home.module.css'
import { useAppDispatch, useAppSelector } from '../hooks'
import { connect } from '../reducers/userSlice'
import { RootState } from '../store'

const Login: NextPage = () => {
  const dispatch = useAppDispatch()
  const { processingMetamask } = useAppSelector((state: RootState) => state.user)
  const handleClick = () => {
    dispatch(connect())
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>DJournal | Login</title>
        <meta name="description" content="Decentralised Journal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Button
          variant="contained"
          color="metamask"
          fullWidth
          onClick={handleClick}
        >
          <img
            src="/metamask.png"
            alt="metamask"
            width={22}
          />
          <Typography
            sx={{
              flex: 1,
              marginLeft: '1rem',
              fontWeight: 600,
            }}
          >
            Connect to MetaMask
          </Typography>
          <CircularProgress
            size={24}
            color="white"
            sx={{
              marginLeft: '0.5rem',
              opacity: processingMetamask ? 1 : 0,
            }}
          />
        </Button>
      </main>
    </div>
  )
}

export default Login
