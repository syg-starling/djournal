import { NextPage } from 'next'
import Head from 'next/head'
import { RootState } from '~/src/store'

import styles from '~/src/styles/Home.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks'
import PageLayout from '../PageLayout'
import { setModalForm } from '../../reducers/journalSlice'
const columns = [
  { field: 'journalName', headerName: 'Journal Title', width: 70 },
  { field: 'authorName', headerName: 'Author', width: 70 },
  { field: 'yearPublished', headerName: 'Year Published', width: 70 },
]

const rows = [
  { id: '1', journalName: 'Becoming a XXR at 27', authorName: 'Keith Ang', yearPublished: '1995' },
  { id: '2', journalName: 'Discovering Bugs on Portal Admin', authorName: 'Tay/Dai Yu Jie', yearPublished: '1993' },
  { id: '3', journalName: 'Getting roasted 24/7', authorName: 'Chua Wei Siong', yearPublished: '1990' },
]

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
};

const Journals: NextPage = () => {
  const dispatch = useAppDispatch()
  const { modalForm } = useAppSelector((state: RootState) => state?.journal)

  return (
    <PageLayout>
      <div className={styles.container}>
        <Head>
          <title>DJournal | Journal List</title>
          <meta name="description" content="Decentralised Journal" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div>
          Journal List
        </div>
      </div>
    </PageLayout>
  )
}

export default Journals
