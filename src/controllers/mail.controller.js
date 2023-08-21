import nodemailer from "nodemailer";
import { isValidPassword,createHash } from "../utils.js";
import __dirname from "../dirname.js";
import configMailSms from "../config/configmailsms.js";
import config from "../config.js";
import { userService } from "../dao/services/index.js";
import jwt from "jsonwebtoken";
const {
    nodemailerConfig: { service, port, user, password },

} = configMailSms;

const transport = nodemailer.createTransport({
    service: service,
    port: port,
    auth: {
        user: user,
        pass: password
    },
    tls: {
        rejectUnauthorized: false
    }
})

sendEmail = async ({ to, subject, html, attachments = [] }) => {
    try {
      const sentEmail = await this.transport.sendMail({
        from: `SuperHiperMegaMercado ${user}`,
        to: user,
        subject: "Test Mail",
        html,
        attachments
      })
      if (!sentEmail) throw new Error('Email send failure')

      return sentEmail
    } catch (error) {
      console.log(`Failed to send email with error: ${error}`)
    }
  }
export async function sendEmailtouser(email){

    let result = await transport.sendMail({
        from: user,
        to: email,
        subject: "Product deletion",
        html: `
      <p>The product was eliminated<p>
        `,
        
    })
    if (!result) {
        throw new Error('Email send failure')
    }
    return result

}
export async function sendEmailtousersdeletedforinactivity(email){

    let result = await transport.sendMail({
        from: `SuperHiperMegaMercado ${user}`,
        to: email,
        subject: "Notification",
        html: `
      <p>Your account has been deleted for inactivity<p>
        `,
 
    })
    if (!result) {
        throw new Error('Email send failure')
    }
    return result

}

export async function sendEmail(req, res) {
    const { email } = req.body

    const user = await userService.findbyuserid({ email: email })

    const token = jwt.sign({ email }, config.sessionSecret, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    const resetUrl = `http://localhost:8080/recoverypassword/${token}`;
    user.resetToken = token;
    user.tokenExpiration = Date.now() + 36000

    const userac = await userService.updatetheUser(user);

    let result = await transport.sendMail({
        from: user,
        to: email,
        subject: "Reset password",
        html: `
        <a href=${resetUrl}><button>Reset password</button></a>
        `,
        attachments: [{
            filename: 'yerba-amanda-500.png',
            path: `${__dirname}/public/images/yerba-amanda-500.png`,
   
        }]
    })
    if (!result) {
        return res.status(500).send({
            status: "error",
            error: "Failed to send the email",
        });
    }
    // res.send({ status: "success", result: "mail sent" })
    return res.send({ status: "success", result: userac })
}
export async function resetPassword(req, res) {
    const { newPassword } = req.body;
    const password=newPassword
    const token = req.cookies.token



    const decodedToken = jwt.verify(token, config.sessionSecret);
    const { email } = decodedToken;

    const user= await userService.findbyuserid({ email });

    if (!user || user.resetToken !== token || user.tokenExpiration < Date.now()) {
        
        return res.send({ status: "link no valido", result: "link expiro" });
    }

    if (!isValidPassword(user, password)) {

        user.password = createHash(password);
        user.resetToken = undefined;
        user.tokenExpiration = undefined;

        const userac = await userService.updatetheUser(user._id, user);

        return res.send({ status: "success", result: userac });
    }
    else {
        
        return res.send({ status: "error", result: "no puede guardar la misma password " });

    }
}