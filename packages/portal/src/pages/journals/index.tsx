import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button, Modal, Typography, Card, CardHeader } from '@mui/material'
import { NextPage } from 'next'
import Head from 'next/head'
import { RootState } from '~/src/store'

import styles from '~/src/styles/Home.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks'
import PageLayout from '../PageLayout'
import { fetchJournals, setModalForm } from '../../reducers/journalSlice'
import CreateJournalForm from './form'
import { useEffect } from 'react'
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
  padding: '10px'
};

const Journals: NextPage = () => {
  const dispatch = useAppDispatch()
  const { modalForm, list: rows } = useAppSelector((state: RootState) => state?.journal)

  useEffect(() => {
    dispatch(fetchJournals())
  }, [])
  return (
    <PageLayout>
      <div className={styles.container}>
        <Head>
          <title>DJournal | Journal List</title>
          <meta name="description" content="Decentralised Journal" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div>
            <CardHeader
              title='Journals'
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <Button
              variant='contained'
              onClick={() => dispatch(setModalForm(true))}
            >
              Add Journal
            </Button>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, mt: '1rem' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Journal Title</TableCell>
                <TableCell align="right">Author</TableCell>
                <TableCell align="right">Year Published</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.journalName}
                  </TableCell>
                  <TableCell align="right">{row.authorName}</TableCell>
                  <TableCell align="right">{row.yearPublished}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal
          open={modalForm}
          onClose={() => dispatch(setModalForm(false))}
        >
          <Card style={style}>
            <CreateJournalForm />
          </Card>
        </Modal>
      </div>
    </PageLayout>
  )
}

export default Journals
