import {ipcMain} from "electron";
import {chatConfig} from "../config/chatConfig";
import ejs from "ejs";

ipcMain.on('getQuestion', async event => {
    // 获取邮件模板
    const {default: template} = await require(`../templates/${chatConfig.template}`)

    // 组装要求
    const requires = [...chatConfig.requires, ...template.requires]
        .map((require, i) => `${i + 1}. ${require};`).join('\n')
    const prompts = ejs.render(chatConfig.prompts, {requires})

    // 编译模板
    const temp = ejs.render(template.template, template.params)

    // 组装问题
    const question = `${prompts}${temp}`.trim()
    event.reply('getQuestion', question)
})
