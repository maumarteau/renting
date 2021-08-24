import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,DeleteDateColumn, BaseEntity, ManyToOne, BeforeUpdate, BeforeInsert, OneToMany, createQueryBuilder, AfterLoad} from 'typeorm'
import { CarCategoryImage } from './CarCategoryImage'
import { File } from './File'

export enum CarCategoryStatus {
	ACTIVE = "ACTIVE",
	INACTIVE = "INACTIVE"
}

@Entity({
    orderBy:{
        order: 'DESC'
    }
})
export class CarCategory extends BaseEntity{

    @PrimaryGeneratedColumn("uuid") 
    id!: string

    @Column({type: 'varchar', length: 150})
    slug: string

    @Column({type: 'varchar', length: 150})
    name: string
    
    @Column({type: 'varchar', length: 150})
    similary: string
    
    @ManyToOne(type => File)
    image: File
    
    @ManyToOne(type => File)
    imageMain: File
    
    @ManyToOne(type => File)
    dataSheet: File

    @OneToMany(type => File, file => file.carCategory)
    gallery: File[]

    @OneToMany(type => CarCategoryImage, carCategoryImage => carCategoryImage.carCategory, { cascade: true})
    images: CarCategoryImage[]

    @Column({type: 'text', nullable:true})
    featuredDetail: string

    @Column({type: 'varchar', nullable:true})
    detailTitle: string

    @Column({type: 'text', nullable:true})
    intro: string

    @Column({type: 'text', nullable:true})
    detail: string

    @Column({type: 'boolean', default:false})
    featured: Boolean

    @Column({type: 'boolean', default:false})
    propAirConditioner: Boolean
    
    @Column({type: 'int', nullable:true})
    propPassengers: Number
    
    @Column({type: 'int', nullable:true})
    propDoors: Number
    
    @Column({type: 'int', nullable:true})
    propLuggages: Number
    
    @Column({type: 'int', nullable:true})
    propHandLuggages: Number

    @Column({type: 'varchar', nullable:true})
    propTransmission: string

    @Column({type: 'varchar', nullable:true})
    propFuel: string  
                        
    @Column({ type: "double precision", scale: 2, default:0 })
	price: number
    
    @Column({type: 'simple-json', nullable: true})
    conditions: Object

    @Column({type: 'int', nullable:true})
    order: Number

    @Column({
		type: "enum",
		enum: CarCategoryStatus,
		default: CarCategoryStatus.INACTIVE
	})
	status: CarCategoryStatus
	statusText: String
	statusHelp: String
	statusClass: String


    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'datetime' })
    deletedAt: Date; 
    
    @BeforeUpdate()
    @BeforeInsert()
    parseSlug = async () => {
        this.slug = this.name.toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
    };
    
    @BeforeInsert()
    // @BeforeUpdate()
    assignOrder = async () => {
        // obtengo el order mayor y le sumo uno.
        const query = createQueryBuilder("CarCategory")
        query.select("MAX(CarCategory.order)", "max")
        const result:any = await query.getRawOne();
        (result && result.max > 0) ? this.order = result.max+1 : this.order = 1
        console.log(this.order)
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

export function getStatus(status: CarCategoryStatus) {
	if (status == CarCategoryStatus.ACTIVE) {
		return { text: "Activa", help: "Vehículo activo", class: "success" }
	}
	if (status == CarCategoryStatus.INACTIVE) {
		return { text: "Inactiva", help: "Vehículo inactivo", class: "warning" }
	}
	return false
}