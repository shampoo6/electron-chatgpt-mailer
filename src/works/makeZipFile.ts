import {chatConfig} from "../config/chatConfig";
import {makeMessage} from "./getAiMessage";
import {ipcRenderer} from "electron";
import {wait} from "../utils/utils";

const requires = [
    '邮件内容是一份记录技术知识点的笔记',
    '笔记的内容和 uni-app 有关',
    // '笔记的内容和这些有关: web技术，jquery，canvas，微信小程序，uni-app，node.js，mongodb，mysql，express，animate.css，react，bootstrap，vue',
    // '请随机选择上述技术中的一种进行书写',
    '请多换行，好让笔记清晰易读',
    '笔记内容不能多于4段',
    '标题请更具体一点',
    '笔记的字数在400字以内'
]

export async function makeZipFile(): Promise<void> {
    // 构造prompts
    let prompts = [...chatConfig.requires, ...requires].map((require, i) => `${i + 1}. ${require};`).join('\n')
    prompts = `请帮我编辑邮件，要求如下:
${prompts}
模板如下:
<!DOCTYPE html>
<html>
<head></head>
<body>
<pre>
标题: #(ai) ;

#(ai)
</pre>
</body>
</html>
`
    ipcRenderer.send('clearDir')
    await wait(1000)
    await makeOneFile(prompts)
    await wait(2000)
    await makeOneFile(prompts)
    await wait(2000)
    await makeOneFile(prompts)
    await wait(2000)
    // 压缩文件
    ipcRenderer.send('zipFile')
}

async function makeOneFile(prompts: string): Promise<void>{
    let message = await makeMessage(prompts)
    message = message.split('。').join('。\n')
    const div = document.createElement('div')
    console.log(message)
    div.innerHTML = message
    message = div.querySelector('pre').textContent
    console.log(message)
    ipcRenderer.send('makeFile', message)
}
