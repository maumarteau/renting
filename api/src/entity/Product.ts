import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity, OneToMany, BeforeUpdate, BeforeInsert, createQueryBuilder, AfterLoad } from 'typeorm'
import { File } from './File'

export enum ProductStatus {
	ACTIVE = "ACTIVE",
	INACTIVE = "INACTIVE",
	SOLD = "SOLD"
}

@Entity({
    orderBy:{
        createdAt: 'DESC'
    }
})
export class Product extends BaseEntity{

    @PrimaryGeneratedColumn("uuid") 
    id!: string

    @Column({type: 'varchar', length: 200})
    title: string

    @Column({type: 'varchar', length: 200, unique: true})
    slug: string
    
    @Column({type: 'text'})
    description: string
    
    @Column({ type: "double precision", scale: 2 })
    price: number

    @OneToMany(type => File, file => file.product)
    gallery: File[]

    @Column({type: 'varchar', length: 100, nullable: true})
    brand: string

    @Column({type: 'varchar', length: 100, nullable: true})
    model: string

    @Column({type: 'int', nullable: true})
    year: number

    @Column({type: 'varchar', length: 50, nullable: true})
    mileage: string

    @Column({type: 'varchar', length: 50, nullable: true})
    fuel: string

    @Column({type: 'varchar', length: 50, nullable: true})
    transmission: string

    @Column({type: 'varchar', length: 50, nullable: true})
    color: string

    @Column({type: 'varchar', length: 20, nullable: true})
    contactPhone: string

    @Column({type: 'varchar', length: 100, nullable: true})
    contactEmail: string

    @Column({
		type: "enum",
		enum: ProductStatus,
		default: ProductStatus.ACTIVE
	})
	status: ProductStatus
	statusText: String
	statusHelp: String
	statusClass: String

    @Column({type: 'int', nullable: true})
    order: Number

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'datetime' })
    deletedAt: Date; 
    
    @BeforeUpdate()
    @BeforeInsert()
    parseSlug = async () => {
        this.slug = this.title.toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        .replace(/-+/g,'-')
        .replace(/^-|-$/g,'')
    };
    
    @BeforeInsert()
    assignOrder = async () => {
        // obtengo el order mayor y le sumo uno.
        const query = createQueryBuilder("Product")
        query.select("MAX(Product.order)", "max")
        const result:any = await query.getRawOne();
        (result && result.max > 0) ? this.order = result.max+1 : this.order = 1
    };

    @AfterLoad()
	async afterLoad() {
		let status = getStatus(this.status)
		if (status) {
			this.statusText = status.text
			this.statusHelp = status.help
			this.statusClass = status.class
		}
    }
}

export function getStatus(status: ProductStatus) {
	if (status == ProductStatus.ACTIVE) {
		return { text: "Activo", help: "Vehículo disponible", class: "success" }
	}
	if (status == ProductStatus.INACTIVE) {
		return { text: "Inactivo", help: "Vehículo no disponible", class: "warning" }
	}
	if (status == ProductStatus.SOLD) {
		return { text: "Vendido", help: "Vehículo vendido", class: "danger" }
	}
	return false
}
