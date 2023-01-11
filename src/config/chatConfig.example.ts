import {ChatConfig} from "../types/ChatConfig";

export const chatConfig: ChatConfig = {
    email: 'xxx@xxx.com',
    password: 'xxx',
    requires: [
        '请写一封中文邮件给我，不要写邮件以外的东西',
        '我会提供你一个邮件模板，这个模板是个HTML模板，请返回我一个完整的HTML文件格式的内容',
        '你需要将模板中的 #(ai) 替换成你写的内容',
        '不要修改模板中 #(ai) 以外的内容，这非常重要',
    ],
    // 提供给AI的模板名称
    // 模板名是templates文件夹下的文件名
    template: 'example',
    prompts: `请帮我编辑邮件，要求如下:
<%=requires%>
模板如下:
`
}
