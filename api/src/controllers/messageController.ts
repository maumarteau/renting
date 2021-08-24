import { Message} from "../entity/Message"
import { findOne } from "../utils"

/****************************************************************************************/
/******************************************* CREATE *************************************/
/****************************************************************************************/

export async function messageCreate(data: Partial<Message>, ctx?: any): Promise<Message> {
	console.log("messageCreate", data)

	const item: Message = await Message.create(data).save()
	
	return item
}

export async function messageReaded(id: Message['id'], ctx?: any): Promise<Message> {
	
	const message: Message = await Message.findOneOrFail(id)
	if (!message) throw new Error("CarCategory not found")
	
	message.readed = true
	
	const result = await message.save()

	return result
}
