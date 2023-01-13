// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import {clickLoginBtn} from "./works/clickLoginBtn";
import {inputAccount} from "./works/inputAccount";
import {inputPassword} from "./works/inputPassword";
import {hideCover} from "./works/hideCover";
import {getAiMessage} from "./works/getAiMessage";
import {makeZipFile} from "./works/makeZipFile";

window.addEventListener('load', async () => {
    console.log(location.href)

    if (location.href.endsWith('/main_window')) {
        // 首页
    } else if (location.href.startsWith('https://chat.openai.com/auth/login')) {
        // 登录页
        await clickLoginBtn()
    } else if (location.href.startsWith('https://auth0.openai.com/u/login/identifier')) {
        // 输入账号
        await inputAccount()
    } else if (location.href.startsWith('https://auth0.openai.com/u/login/password')) {
        // 输入密码
        await inputPassword()
    } else if (location.href.startsWith('https://chat.openai.com/chat')) {
        // 会话页面
        // 隐藏遮罩
        await hideCover()
        // 获取ai输出并发送邮件
        await getAiMessage()
    }
})
