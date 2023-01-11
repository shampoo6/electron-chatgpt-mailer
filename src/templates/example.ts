import {MailTemplate} from "../types/MailTemplate";

const template: MailTemplate = {
    mail: {
        to: "xxx@xxx.com",
        copy: "xxx@xxx.com, xxx@xxx.com",
        subject: "AI测试邮件 <%=date%>",
    },
    params: {
        myParam: '这是一个ejs参数'
    },
    requires: [
        '每段 #(ai) 的内容在 50 字以内',
        '邮件内容是一封情书',
        '是写给小红的',
        '编辑的内容包含 化妆品 小动物 星座'
    ],
    template: `<!DOCTYPE html>
<html>
<head></head>
<body>
<p>小红你好: </p>
<p>这里我想要插入一个参数: <%=myParam%></p>
<p>我每天想你想三遍:</p>
<p>#(ai)</p>
<p>#(ai)</p>
<p>#(ai)</p>
</body>
</html>`
}

export default template
