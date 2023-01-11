// 邮件的通用配置
export type MailCommonConfig = {
    // 寄件邮箱
    from: string
    // 邮箱密码
    pwd: string
    // smtp 协议地址
    smtp: string
    // 寄件人
    sender: string
    // 签名
    sign: string
}
