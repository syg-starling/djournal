import { api } from './api'

export const getJournals = (params) => api.get('/journals', params)
export const getJournal = (params) => api.get(`/journals/${params.id}`, params)
export const createJournal = (params) => api.post('/journals', params)

