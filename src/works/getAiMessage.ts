import {wait} from "../utils/utils";
import {ipcRenderer, IpcRendererEvent, clipboard} from "electron";

export async function getAiMessage(): Promise<void> {
    // 获取要填入输入框的问题
    ipcRenderer.once('getQuestion', getQuestionCallback)
    ipcRenderer.send('getQuestion')
}

// 结束标志
async function checkLoop(): Promise<string> {
    // 查询AI的回复
    const conversations = document.querySelectorAll('.w-full.border-b')
    const aiConversation = conversations[conversations.length - 1]
    // 包含文本信息的dom
    const aiContent = aiConversation.querySelector('.markdown.prose.w-full.break-words')

    // 获取 Copy Code 按钮
    const btn = aiContent.querySelector('button.flex.ml-auto.gap-2')

    let latest = ''
    // 每次匹配都匹配到相同内容 但又不是结束文本的时候
    // 此时需要判断重试次数 超过重试次数后就异常退出
    let count = 0
    let loop = true
    let text: string
    do {
        console.log('check over')
        await wait(1000)

        // 按钮存在就点击按钮，查询粘贴板中的文本
        if (btn) {
            (btn as HTMLButtonElement).click()
            text = clipboard.readText()
        } else {
            text = aiContent.textContent
        }

        // 判断是否以结束标识结尾
        loop = !new RegExp(`</html>$`).test(text)
        if (loop) {
            // 判断上一次和本次内容是否相同
            if (latest === text) {
                count++
                if (count >= 20) throw new Error('等待AI回复超时')
            } else {
                count = 0
                latest = text
            }
        }
    } while (loop)

    return text
}

async function getQuestionCallback(event: IpcRendererEvent, question: string) {
    console.log(question)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    await wait(1000)
    textarea.value = question
    const btn = document.querySelector('.absolute.p-1.rounded-md') as HTMLButtonElement
    btn.click()

    await wait(3000)

    try {
        // 获取最后一行文本作为结束符号
        let content = await checkLoop()
        console.log('over')
        // 处理换行符
        content = content.replace(/(?<=>)\n/g, '')
        // 截取body的内容
        content = content.match(/(?<=<body>)[\s\S]*(?=<\/body>)/)[0]
        console.log(content)
        ipcRenderer.send('sendMail', content)
    } catch (e) {
        console.error(e)
    }
}
