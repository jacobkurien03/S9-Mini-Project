import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// configure the transporter for nodemailer to use gmail account to send mails
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		type: 'OAuth2',
		user: 'jacobkurien@mca.ajce.in',
		pass: 'Jacob007kurien03.',
		clientId: '429910501137-5uimv1gosdbpb5ekebhmt03gsrjl1v67.apps.googleusercontent.com',
		clientSecret: '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',
		refreshToken: "1//04br-FjPa3ZqsCgYIARAAGAQSNwF-L9IrqGaONpsefggUm-231aHDV29KK9sIta9rhAMnsQVSTzwtv4sQMTe_8vPZWN9nXTp99F4",
	},
	// service: 'gmail',
	// auth: {
	// 	type: 'OAuth2',
	// 	user: process.env.MAIL_USERNAME,
	// 	pass: process.env.MAIL_PASSWORD,
	// 	clientId: process.env.OAUTH_CLIENT_ID,
	// 	clientSecret: process.env.OAUTH_CLIENT_SECRET,
	// 	refreshToken: process.env.OAUTH_REFRESH_TOKEN,
	// },
});

export default transporter;
