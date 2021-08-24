import { BookingMaintenance} from "../entity/BookingMaintenance"

/****************************************************************************************/
/******************************************* CREATE *************************************/
/****************************************************************************************/

export async function bookingMaintenanceCreate(data: Partial<BookingMaintenance>, ctx?: any): Promise<BookingMaintenance> {
	console.log("bookingMaintenanceCreate", data)

	const item: BookingMaintenance = await BookingMaintenance.create(data).save()
	
	return item
}
