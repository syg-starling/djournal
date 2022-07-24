import { Entity, Column } from 'typeorm'
import { BaseEntity } from '@starterapp/common'

@Entity()
export class Journal extends BaseEntity {
  @Column({ nullable: true })
  fileName: string;

  @Column({
    type: 'bytea',
    nullable: true,
  })
  data: Uint8Array;
}
