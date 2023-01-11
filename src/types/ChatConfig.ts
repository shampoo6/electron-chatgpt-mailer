// ChatGPT 相关配置
export type ChatConfig = {
    // 登录openai的邮箱
    email: string,
    // 密码
    password: string,
    // AI书写内容的基本要求
    requires: string[],
    // 提供给AI的模板名称
    // 模板名是templates文件夹下的文件名
    template: string,
    // 提供给 AI 的提示信息
    // prompts 内必须填写一个 <%=requires%> 符号用来填充内容要求
    prompts: string
}
