
import { getAccount } from "./security"

export async function createListQuery(entity: any, args: any, ctx: any) {
	let query = entity.createQueryBuilder("l")

	// por ahora no permito ningun softdelete porque en los eliminados, las relaciones igual los traen
	// issue https://github.com/typeorm/typeorm/issues/6265
	// if(ctx.request.logged && ctx.request.logged.userType== 'user'){
	// 	query.withDeleted()
	// }

	if (args.take) {
		query.take(args.take)
	}
	if (args.skip) {
		query.skip(args.skip)
	}

	return query
}

export async function findOne(entity: any, ctx: any, id?: string | number, options: any = {}) {
	let query: any = {}
	const { logged } = await getAccount(ctx)

	// por ahora no permito ningun softdelete porque en los eliminados, las relaciones igual los traen
	// issue https://github.com/typeorm/typeorm/issues/6265
	if (ctx.req && logged && logged.userType == "user") {
		options.withDeleted = true
	}
	if (id) {
		query = entity.findOne(id, options)
	} else {
		query = entity.findOne(options)
	}
	return query
}

export function formatTextDecorators(string:string){
	string = string.replace(/\*(.*?)\*/g , '<strong>$1</strong>')
	string = string.replace(/\_(.*?)\_/g , '<em>$1</em>')
	string = string.replace(/\~(.*?)\~/g , '<del>$1</del>')
	return string
}




class AuthError extends Error {
	constructor() {
		super("Not authorized")
	}
}
