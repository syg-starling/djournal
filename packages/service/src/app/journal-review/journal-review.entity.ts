import { Column, Entity } from "typeorm";
import { BaseEntity } from "@starterapp/common";

@Entity()
export class JournalReview extends BaseEntity {
  @Column({ nullable: false })
  journalId: string;

  @Column({ nullable: false })
  reviewerId: string;

  @Column({ nullable: true })
  remarks: string;

  @Column({ type: 'int', nullable: false })
  rating: number;
}