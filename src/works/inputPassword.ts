import {chatConfig} from "../config/chatConfig";
import {wait} from "../utils/utils";

export async function inputPassword(): Promise<void> {
    const passwordInput = document.querySelector('input[id="password"]') as HTMLInputElement
    passwordInput.value = chatConfig.password
    await wait(1000)
    const submitBtn = document.querySelector('button[type="submit"]') as HTMLButtonElement
    submitBtn.click()
}
