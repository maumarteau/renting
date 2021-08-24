import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
  AfterLoad,
} from "typeorm";
import { formatTextDecorators } from "../utils";
import { File } from './File'

export enum MainSliderStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

@Entity()
export class MainSlider extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 150 })
  title: string;
  
  formattedTitle: string

  @Column({ type: "varchar", nullable:false })
  description: string
  
  @Column({ type: "varchar", length: 150, nullable:true })
  link: string;

  @ManyToOne(() => File)
  image: File

  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime" })
  updatedAt: Date;

  @DeleteDateColumn({ type: "datetime" })
  deletedAt: Date;


  @Column({
    type: "enum",
    enum: MainSliderStatus,
    default: MainSliderStatus.ACTIVE
  })
  status: MainSliderStatus
  statusText: String

  @AfterLoad()
	async afterLoad() {
    this.formattedTitle = formatTextDecorators(this.title)
	}

}
