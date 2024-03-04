import { Message } from "../entity/Message"
import { findOne } from "../utils"
import { emailSend } from "../utils/email"

/****************************************************************************************/
/******************************************* CREATE *************************************/
/****************************************************************************************/

export async function messageCreate(data: Partial<Message>, ctx?: any): Promise<Message> {
	console.log("messageCreate", data)

	const item: Message = await Message.create(data).save()

	const message = `
	Nombre: ${item.name} <br>
	Email: ${item.email}<br>
	Tel: ${item.phone}<br>
	${item.message}`

	if (item.subject == "Agenda mantenimiento") {
		emailSend("service@renting.com.uy", item.subject, message)
	} else {
		emailSend("mauricemarteau.web@gmail.com", item.subject, message)
		emailSend("consultas@renting.com.uy", item.subject, message)
	}

	return item
}

export async function messageReaded(id: Message["id"], ctx?: any): Promise<Message> {
	const message: Message = await Message.findOneOrFail(id)
	if (!message) throw new Error("CarCategory not found")

	message.readed = true

	const result = await message.save()

	return result
}
