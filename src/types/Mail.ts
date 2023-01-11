export type Mail = {
    // 寄件邮箱
    from: string,
    // 目标邮箱 多个邮箱地址用逗号隔开
    to: string,
    // 抄送邮箱 多个邮箱地址用逗号隔开
    copy: string,
    // 邮箱密码
    pwd: string,
    // smtp 协议地址
    smtp: string,
    // 寄件人
    sender: string,
    // 邮件主题
    subject: string,
    // 内容
    content: string,
    // 签名
    sign: string,
}
