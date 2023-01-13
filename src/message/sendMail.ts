import {app, ipcMain} from "electron";
import {Mail} from "../types/Mail";
import ejs from 'ejs'
import {mailCommonConfig} from "../config/mailCommonConfig";
import {chatConfig} from "../config/chatConfig";
import {sendMail} from "../utils/mailer";
import ejsParams from "../utils/ejsParams";
import path from "path";

ipcMain.on('sendMail', async (event, content) => {
    console.log('ready to send mail')
    console.log(content)

    const {default: template} = await require(`../templates/${chatConfig.template}`)

    // 构造 Mail
    const mail: Mail = {
        ...mailCommonConfig,
        ...template.mail,
        content,
    }

    // 判断是否需要附件
    if (template.attachments) {
        // 添加附件
        mail.attachments = [{filename: '资料.zip', content: path.join(process.resourcesPath, '资料.zip')}]
    }

    try {
        // 构造编译参数
        const templateParams = {
            ...template.params,
            date: ejsParams.date,
            sender: mail.sender
        }
        // 编译签名
        mail.sign = ejs.render(mail.sign, templateParams)
        // 编译主题
        mail.subject = ejs.render(mail.subject, templateParams)
        // 编译内容
        mail.content = ejs.render(mail.content, templateParams)
    } catch (e) {
        console.log(e)
    }

    const res = await sendMail(mail)
    console.log(res)
    if (res.accepted && res.accepted.length > 0) {
        app.quit()
    }
})
