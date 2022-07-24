import { JournalReview } from '../models'
import { api } from './api'

export const getJournalReviews = (query: Partial<JournalReview>) => api.get('/journal-reviews', query)
export const getJournalReview = (id: string) => api.get(`/journal-reviews/${id}`)
export const createJournalReview = (payload: Partial<JournalReview>) => api.post('/journal-reviews', payload)

