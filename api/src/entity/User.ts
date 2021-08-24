import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity, ManyToOne, OneToMany, AfterLoad } from "typeorm"
import { File } from "./File"

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id!: string

	@Column({ type: "varchar", length: 150 })
	name: string

	@Column({ type: "varchar", length: 150 })
	lastname: string

	@Column({ type: "varchar", length: 200 })
	email: string

	@Column({ type: "varchar", length: 30 })
	username: string

	@Column({ type: "varchar", length: 300 })
	password: string

	@CreateDateColumn({ type: "datetime" })
	createdAt: Date

	@UpdateDateColumn({ type: "datetime" })
	updatedAt: Date

	@DeleteDateColumn({ type: "datetime" })
	deletedAt: Date

	@ManyToOne(type => File)
	avatar: File


}
