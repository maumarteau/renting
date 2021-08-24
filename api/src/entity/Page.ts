import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, BaseEntity, Unique, AfterLoad} from 'typeorm'
import { File } from './File'

@Entity()
@Unique(['slug'])
export class Page extends BaseEntity{

    @PrimaryGeneratedColumn("uuid") 
    id!: string

    @Column({type: 'varchar', length: 150})
    title: string
    
    @Column({type: 'text'})
    intro: string
    
    @Column({type: 'text', nullable:true})
    body: string
    
    hasBody:Boolean
    
    @Column({type: 'boolean', default:false})
    featured: Boolean

    @Column({type: 'varchar', length: 150, nullable:true})
    link: string

    @Column({type: 'varchar', length: 150})
    slug: string

    @ManyToOne(type => File)
    image: File

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'datetime' })
    deletedAt: Date;

    
    @AfterLoad()
	async afterLoad() {
        this.hasBody = (this.body) ? true : false 
	}


}