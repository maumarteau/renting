import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
} from "typeorm";

@Entity({
  orderBy:{
      createdAt: "DESC"
  }
})
export class Message extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", nullable:false })
  subject: string

  @Column({ type: "varchar", nullable:false })
  name: string

  @Column({ type: "varchar", nullable:true })
  phone: string

  @Column({ type: "varchar", nullable:false })
  email: string

  @Column({ type: "varchar", nullable:false })
  message: string

  @Column({type: 'boolean', default:false})
  readed: Boolean

  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime" })
  updatedAt: Date;

  @DeleteDateColumn({ type: "datetime" })
  deletedAt: Date;

}

