// 邮件模板
export type MailTemplate = {
    // 给AI写作的要求
    // 请优先考虑以下要求:
    // 每一段 #(ai) 填充的字数限制
    // 什么样的邮件 例如: 邮件的内容是封情书、邮件的内容是份市场调研报告
    // 邮件是写给谁的
    // #(ai) 部分内容填充和什么相关的信息 例如: 要求AI: #(ai) 中编辑的内容和汽车相关
    requires: string[],
    // 邮件模板中的参数
    // key: 参数名
    // value: 参数值
    params: { [key: string]: string },
    // 提供给AI的邮件模板
    // 其中 #(ai) 用于给 AI 进行填充 例如: Assistant 你好，我的爱好有#(ai)，你呢？
    // template 采用 ejs 模板引擎 所以可以填充在 params 中定义过 key 的变量
    // 注意: 模板必须是一个完整的html模板
    template: string,
    mail: {
        // 主题
        subject: string,
        // 目标邮箱
        to: string,
        // 抄送邮箱
        copy: string,
    }
}
