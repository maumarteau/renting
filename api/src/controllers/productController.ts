import { Product } from "../entity/Product"
import { File } from "../entity/File"

/****************************************************************************************/
/******************************************* CREATE *************************************/
/****************************************************************************************/

export async function productCreate(data: Partial<Product>, ctx?: any): Promise<Product> {
	console.log("productCreate")
	console.log("data.gallery", data.gallery)
	console.log("data.image", data.image)
	
	let galleryFiles:any = []
	if (data.gallery) {
		for (const f of data.gallery) {
			const file = await File.findOne(f)
			console.log('file',file)
			if(file) galleryFiles.push(file)
		}
		data.gallery = galleryFiles
	}
	console.log("data.gallery", data.gallery)

	if (data.image) {
		const file = await File.findOne(data.image)
		console.log('image file',file)
		if (file) {
			data.image = file
		}
	}
	console.log("data.image", data.image)

	const result: Product = await Product.create(data).save()
	return result
}

/****************************************************************************************/
/******************************************* UPDATE *************************************/
/****************************************************************************************/

export async function productUpdate(id: Product["id"], data: Partial<Product>, ctx?: any): Promise<Product> {
	console.log("productUpdate")

	console.log('data', data.gallery)
	console.log('data.image', data.image)
	
	const item: Product | undefined = await Product.findOne(id,{ relations:['gallery', 'image']})
	if (!item) throw new Error("Product not found")

	if (data.gallery) {
		item.gallery = []
		data.gallery.forEach( async (f)  => {
			const file = await File.findOne(f)
			if(file) {
				item.gallery.push(file)
			}
		});
	}

	if (data.image) {
		const file = await File.findOne(data.image)
		console.log('image file',file)
		if (file) {
			item.image = file
		}
	}
	
	const result: Product = await Product.merge(item, data).save()
	return result
}

/****************************************************************************************/
/******************************************* DELETE *************************************/
/****************************************************************************************/

export async function productDelete(id: string, ctx?: any): Promise<Product> {
	console.log('productDelete')
	let product: Product | undefined = await Product.findOne(id)
	if (!product) throw new Error("Product not found")

	const result: Product = product
	await product.remove().catch((err) => {
		console.log('err', err)
		throw new Error("Product no se puede eliminar")
	})
	result.id = id
	return result
}

/****************************************************************************************/
/******************************************* SORT *************************************/
/****************************************************************************************/

export async function productSort(list: [{id: Product['id'], order:Number }], ctx?: any): Promise<Boolean> {
	console.log("productSort", list)
	if(list && list.length>0){
		for(const item of list){
			await Product.update(item.id, { order:item.order})
		}
	}

	return true
}
