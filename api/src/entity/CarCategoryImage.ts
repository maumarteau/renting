import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
} from "typeorm";
import { CarCategory } from "./CarCategory";
import { File } from './File'


@Entity()
export class CarCategoryImage extends BaseEntity {
  
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @ManyToOne(() => CarCategory)
  carCategory: CarCategory

  @Column({ type: "varchar", length: 150 })
  title: string

  @Column({type: 'text', nullable:true})
  body: string

  @ManyToOne(() => File, { nullable:true})
  image: File

  @CreateDateColumn({ type: "datetime" })
  createdAt: Date

  @UpdateDateColumn({ type: "datetime" })
  updatedAt: Date

  @DeleteDateColumn({ type: "datetime" })
  deletedAt: Date

}
