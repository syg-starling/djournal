import { Journal } from '~/../service/src/app/journal/journal.interface'
import { api } from './api'

export const getJournals = (params) => api.get('/journals', params)
export const getJournal = (params) => api.get(`/journals/${params.id}`, params)
export const postJournal = (params) => {
    const formData = new FormData()
    Object.entries(params).forEach(([k, v]) => {
        formData.append(k, v)
    })

    return api.post('/journals', formData)
}

