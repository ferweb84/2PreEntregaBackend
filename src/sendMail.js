import nodeMailer from "nodemailer";
import { logger } from "./logger.js";
import config from "./config.js";

const { 
    email: { user, password }
} = config;

export const sendMail = async (to, subject, html) => {
    const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: user,
            pass: password
        }
    });

    const mailOptions = {
        from: user,
        to: to,
        subject: subject,
        html: html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        logger.info(`Email sended: ${info.messageId}`);
    } catch (error) {
        logger.error(`Email failed to send. Exception: ${error}`);
    }
}