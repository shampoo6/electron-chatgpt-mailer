import {MailCommonConfig} from "../types/MailCommonConfig";

export const mailCommonConfig: MailCommonConfig = {
    // 寄件邮箱
    from: 'xxx@xxx.com',
    // 邮箱密码
    pwd: 'xxx',
    // smtp 协议地址
    smtp: 'smtp.xxx.com',
    // 寄件人
    sender: '打工人',
    // 签名 签名中使用 <%=sender%> 自动替换寄件人名称
    sign: `<p>身体健康！</p>
    <p><br></p>
    <p><strong><%=sender%>&nbsp;&nbsp;|&nbsp;祝好</strong></p>
    <p><br></p>`
}
