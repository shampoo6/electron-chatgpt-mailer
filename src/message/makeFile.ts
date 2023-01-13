import {ipcMain} from "electron";
import path from 'path'
import fsp from 'fs/promises'
import cp from "child_process";

const dirPath = path.join(process.resourcesPath, '资料')

ipcMain.on('clearDir', async ev => {
    // 清空 《资料》 文件夹内所有文件

    try {
        await fsp.stat(dirPath)
    } catch (e) {
        // 创建文件夹
        await fsp.mkdir(dirPath)
    }

    // 删除压缩文件
    try {
        await fsp.rm(path.join(process.resourcesPath, '资料.zip'))
    } catch (e) {
        console.error(e)
    }

    // 遍历文件夹下所有文件
    const fileNames = await fsp.readdir(dirPath)
    fileNames.forEach(filename => {
        const filePath = path.join(dirPath, filename)
        fsp.rm(filePath)
    })
})

ipcMain.on('makeFile', async (ev, content) => {
    // 查找标题
    const filename = content.match(/(?<=标题:)[\s\S]*(?=;)/)[0].trim()
    console.log(filename)

    // 写入文件
    const filePath = path.join(dirPath, `${filename}.txt`)
    await fsp.writeFile(filePath, content)
})

ipcMain.on('zipFile', ev => {
    // D:\projects\electron-projects\electron-chatgpt-mailer\node_modules\electron\dist\resources>7z a 资料.zip 资料
    // 创建进程
    const p = cp.spawn('7z',
        ['a', '资料.zip', '资料'],
        {cwd: 'D:\\projects\\electron-projects\\electron-chatgpt-mailer\\node_modules\\electron\\dist\\resources'}
    )
    p.on('close', (code) => {
        console.log(`child process ${p.pid} exited with code ${code}`)
        console.log(text)
    })
    p.on('error', (err) => {
        console.error(err)
    })
    let text = ''
    p.stdout.on('data', (data) => {
        text += data.toString()
    })
})
