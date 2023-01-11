import {chatConfig} from "../config/chatConfig";

export async function inputAccount(): Promise<void> {
    const userNameInput = document.querySelector('input[id="username"]') as HTMLInputElement
    userNameInput.value = chatConfig.email
}
