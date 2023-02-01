# electron-chatgpt-emailer

该项目以用 `puppeteer` 技术重构，请参考仓库 [puppeteer-chatgpt-mailer](https://github.com/shampoo6/puppeteer-chatgpt-mailer)

通过 OpenAI 的 ChatGPT 帮助完成并发送邮件

## 特点

- 使用 html 模板构建邮件
- 邮件主题 内容 签名 部分，使用 ejs 模板可以填充参数
- 使用 nodemailer 发送邮件
- 自动生成附件

## ejs 固定参数

有些参数是固定的

- `date`: 日期的 `YYYY-MM-DD` 格式字符串
- `relative`: 邮件内容关联的内容描述，例如: 
  ```
  // 假设 relative 值为 TypeScript，那么 模板:
  // 今天学习的主题是 <%=relative%>
  // 将被渲染成:
  // 今天学习的主题是 TypeScript
  ```
