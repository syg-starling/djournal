import { Entity, Column } from 'typeorm'
import { BaseEntity } from '@starterapp/common'
import { User } from '../user/user.entity';
import { ApproveStatus, ReviewStatus } from './journal.enum';

@Entity()
export class Journal extends BaseEntity {
  @Column({ nullable: true })
  fileName: string;

  @Column({
    type: 'bytea',
    nullable: true,
  })
  data: Uint8Array;

  @Column({ nullable: true })
  journalName: string;

  @Column({ nullable: true })
  authorId: string;

  @Column({ nullable: true })
  yearPublished: string;

  //virtual property
  author: User;

  @Column({ type: 'timestamp', nullable: true })
  reviewClosedAt: string;

  @Column({ type: 'bool', nullable: false, default: false })
  isPublished: boolean;

  @Column({ type: 'decimal', nullable: true })
  bounty: number;

  @Column({ type: 'text', nullable: true, default: ReviewStatus.NotStarted })
  reviewStatus: string;

  @Column({ type: 'text', nullable: true, default: ApproveStatus.NotStarted })
  approveStatus: string;
}
