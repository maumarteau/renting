const nodemailer = require("nodemailer")

export async function emailCheckConnection(){
    
    let connection:any = {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT, 
        secure: process.env.EMAIL_SECURE, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER, 
			pass: process.env.EMAIL_PASS,
		},
    }
    
    const transporter = await nodemailer.createTransport(connection)
    const verifiedConnection = await transporter.verify()
    transporter.close()
    console.log('verifiedConnection', verifiedConnection)
    return verifiedConnection
}


export async function emailSend(to:string, subject:string, message:string) : Promise<boolean> {
    let connection:any = {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT, 
        secure: process.env.EMAIL_SECURE, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER, 
			pass: process.env.EMAIL_PASS,
		},
    }
    const transporter = await nodemailer.createTransport(connection)
    let info = await transporter.sendMail({
		from: `"Renting" <${connection.auth.user}>`, // sender address
		to, 
        bcc: "mauricemarteau.web@gmail.com",
		subject,
		html: message,
    });
    console.log("Email sended to: %s", to);
	if(info.messageId) return true
	return false

}