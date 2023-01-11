export async function clickLoginBtn(): Promise<void> {
    const btn: HTMLButtonElement = document.querySelector('.btn:nth-child(1)') as HTMLButtonElement
    if (btn.textContent === 'Log in')
        btn.click()
}
