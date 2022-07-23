import { Column, Entity } from "typeorm";
import { BaseEntity } from "~/../common/dist";

@Entity()
export class JournalApproval extends BaseEntity {
  @Column({ nullable: false })
  journalId: string;

  @Column({ nullable: false })
  approverId: string;

  @Column({ nullable: true })
  remarks: string;

  @Column({ type: 'int', nullable: false })
  vote: number; // 1 OR 0
}