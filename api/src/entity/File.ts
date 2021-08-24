import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity, ManyToOne, ManyToMany, JoinTable, AfterLoad, JoinColumn } from "typeorm"
import fs from "fs"
import { CarCategory } from "./CarCategory"

var ip = require("ip")
@Entity()
export class File extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id!: string

	@Column({ type: "varchar", length: 200 })
	filename: string

	@Column({ type: "varchar" })
	url: string

	@Column({ type: "varchar", nullable: true })
	urlThumb: string

	@Column({ type: "varchar", length: 20 })
	type: string

	@Column({ type: "varchar", length: 20 })
	extension: string

	@CreateDateColumn({ type: "datetime" })
	createdAt: Date

	@UpdateDateColumn({ type: "datetime" })
	updatedAt: Date

	@DeleteDateColumn({ type: "datetime" })
	deletedAt: Date

	@ManyToOne(() => CarCategory, carCategory => carCategory.gallery)
	@JoinColumn({name: 'carCategoryId', referencedColumnName: 'id'})
  	carCategory: CarCategory

	
	@AfterLoad()
	async afterLoad() {
		this.urlThumb = this.url
	}
}

export async function deleteFile(id: string) {
	console.log("deleteFile")
	const file = await File.findOneOrFail(id)
	//elimino archivos fisicos.
	if (file.url && fs.existsSync(file.url)) fs.unlinkSync(file.url)
	return await file.remove()
}
