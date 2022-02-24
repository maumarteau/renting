const nodemailer = require("nodemailer")

// https://myaccount.google.com/lesssecureapps
// https://accounts.google.com/b/5/displayunlockcaptcha

export async function emailCheckConnection() {
	let connection: any = {
		host: process.env.EMAIL_HOST || "smtp.gmail.com",
		port: process.env.EMAIL_PORT || 465,
		secure: process.env.EMAIL_SECURE || true,
		auth: {
			user: process.env.EMAIL_USER || "webrentinglest@gmail.com",
			pass: process.env.EMAIL_PASS || "Lestido.2021."
		}
	}

	const transporter = await nodemailer.createTransport(connection)
	// console.log("emailCheckConnection", transporter)
	transporter.logger.trace()
	const verifiedConnection = await transporter.verify()
	transporter.close()
	return {
		connectionStatus: verifiedConnection ? "OK" : "ERROR"
	}
	// console.log("verifiedConnection", verifiedConnection)
	// await emailSend("mauricemarteau.web@gmail.com", "TEST", "MENSAJE DE PRUEBA")

	return verifiedConnection
}

export async function emailSend(to: string, subject: string, message: string): Promise<boolean> {
	let connection: any = {
		host: process.env.EMAIL_HOST || "smtp.gmail.com",
		port: process.env.EMAIL_PORT || 465,
		secure: process.env.EMAIL_SECURE || true,
		auth: {
			user: process.env.EMAIL_USER || "webrentinglest@gmail.com",
			pass: process.env.EMAIL_PASS || "Lestido.2021."
		}
	}
	const transporter = await nodemailer.createTransport(connection)
	let info = await transporter.sendMail({
		from: `"Renting" <${connection.auth.user}>`, // sender address
		to,
		bcc: "mauricemarteau.web@gmail.com",
		subject,
		html: message
	})
	console.log("Email sended to: %s", to)
	if (info.messageId) return true
	return false
}
