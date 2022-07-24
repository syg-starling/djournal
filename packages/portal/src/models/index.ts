export interface User {
  name: string;
}

export interface JournalReview {
  id: string;
  journalId: string;
  reviewerId: string;
  rating: number;
  remarks?: string;
  reviewer: User;
}