// 窗口管理器
import {BrowserWindow} from "electron";
import {WindowNo} from "./WindowNo";

export class WindowManager {
    private static _instance: WindowManager

    private map: Map<WindowNo, BrowserWindow>

    private constructor() {
        if (WindowManager._instance) throw new Error('singleton error')
        this.map = new Map<WindowNo, BrowserWindow>()
        WindowManager._instance = this
    }

    public static get instance() {
        return WindowManager._instance ?? (WindowManager._instance = new WindowManager())
    }

    public put(key: WindowNo, window: BrowserWindow) {
        this.map.set(key, window)
    }

    public get(key: WindowNo): BrowserWindow {
        return this.map.get(key)
    }
}
