import {wait} from "../utils/utils";

export async function hideCover(): Promise<void> {
    await wait(1000)
    const dom: HTMLElement = document.querySelector('#headlessui-portal-root')
    dom.style.display = 'none'
}
