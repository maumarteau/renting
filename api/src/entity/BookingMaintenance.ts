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
export class BookingMaintenance extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", nullable:false })
  car: string
  
  @Column({ type: "varchar", nullable:false })
  mat: string
  
  @Column({ type: "varchar", nullable:false })
  department: string

  @Column({ type: "varchar", nullable:false })
  name: string

  @Column({ type: "varchar", nullable:true })
  phone: string

  @Column({ type: "varchar", nullable:false })
  email: string

  

  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime" })
  updatedAt: Date;

  @DeleteDateColumn({ type: "datetime" })
  deletedAt: Date;

}

