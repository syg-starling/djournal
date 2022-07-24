import { Entity, Column } from 'typeorm'
import { BaseEntity } from '@starterapp/common'
import { User } from '../user/user.entity';

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
  author: User
}
