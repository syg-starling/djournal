import { Journal } from '~/../service/src/app/journal/journal.interface'
import { api } from './api'

export const getJournals = (params: Partial<Journal>) => api.get('/journals', params)
export const getJournal = ({ id }: any) => api.get(`/journals/${id}`)
export const postJournal = (payload: Partial<Journal>) => {
  const formData = new FormData()
  Object.entries(payload).forEach(([k, v]) => {
    formData.append(k, v)
  })

  return api.post('/journals', formData)
}
export const updateJournal = (payload: Partial<Journal>) => {
  return api.put(`/journals/${payload.id}`, payload)
}

