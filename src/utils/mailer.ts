import {createTransport} from 'nodemailer'
import {Mail} from "../types/Mail";

export async function sendMail(mail: Mail) {
    // 暂时只支持 smtp 协议
    const poolConfig = `smtps://${mail.from}:${mail.pwd}@${mail.smtp}/?pool=false`;
    const transporter = createTransport(poolConfig);

    // send mail with defined transport object
    return await transporter.sendMail({
        from: `"${mail.sender}" <${mail.from}>`,
        to: mail.to,
        cc: mail.copy,
        subject: mail.subject,
        html: `<p>${mail.content}</p>${mail.sign}`
    });
}
