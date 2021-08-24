import { CarCategory } from "../entity/CarCategory"
import { CarCategoryImage } from "../entity/CarCategoryImage"
import { File } from "../entity/File"



/****************************************************************************************/
/******************************************* CREATE *************************************/
/****************************************************************************************/

export async function carCategoryCreate(data: Partial<CarCategory>, ctx?: any): Promise<CarCategory> {
	console.log("carCategoryCreate")
	console.log("data.gallery", data.gallery)
	
	let gallery:any = []
	if (data.gallery) {
		for (const g of data.gallery) {
			const photo = await File.findOne(g)
			console.log('photo',photo)
			if(photo) gallery.push(photo)
		}
		data.gallery = gallery
	}
	console.log("data.gallery", data.gallery)

	const result: CarCategory = await CarCategory.create(data).save()
	return result
}

/****************************************************************************************/
/******************************************* UPDATE *************************************/
/****************************************************************************************/

export async function carCategoryUpdate(id: CarCategory["id"], data: Partial<CarCategory>, ctx?: any): Promise<CarCategory> {
	console.log("carCategoryUpdate")

	console.log('data', data.gallery)
	
	const item: CarCategory | undefined = await CarCategory.findOne(id,{ relations:['gallery']})
	if (!item) throw new Error("CarCategory not found")

	if (data.images) {
		item.images = []
		await CarCategoryImage.delete({ carCategory: item })
	}
	if (data.gallery) {
		item.gallery = []
		data.gallery.forEach( async (g)  => {
			const photo = await File.findOne(g)
			if(photo) item.gallery.push(photo)
		});
	}
	
	const result: CarCategory = await CarCategory.merge(item, data).save()
	return result
}


/****************************************************************************************/
/******************************************* DELETE *************************************/
/****************************************************************************************/

export async function carCategoryDelete(id: string, ctx?: any): Promise<CarCategory> {
	console.log('carCategoryDelete')
	let carCategory: CarCategory | undefined = await CarCategory.findOne(id)
	if (!carCategory) throw new Error("CarCategory not found")

	const result: CarCategory = carCategory
	await carCategory.remove().catch((err) => {
		console.log('err', err)
		throw new Error("CarCategory no se puede eliminar")
	})
	result.id = id
	return result
}

/****************************************************************************************/
/******************************************* SORT *************************************/
/****************************************************************************************/

export async function carCategorySort(list: [{id: CarCategory['id'], order:Number }], ctx?: any): Promise<Boolean> {
	console.log("carCategorySort", list)
	if(list && list.length>0){
		for(const item of list){
			await CarCategory.update(item.id, { order:item.order})
		}
	}

	return true
}