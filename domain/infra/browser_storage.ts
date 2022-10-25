export interface BrowserStorage {
    set(data: string): void

    get(): string | null

    getKey(): string

    remove(): void
}


export default class LocalStorageImp implements BrowserStorage {

    private readonly key: string

    constructor(key: string) {
        this.key = key
    }

    public get(): string | null {
        try {
            const val = window.localStorage.getItem(this.key)
            if (val === "undefined")
                return null
            return val
        } catch (e) {
            return null
        }
    }

    public remove() {
        this.set("undefined")
    }

    public set(data: string): void {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(this.key, data)
        }
    }

    public getKey(): string {
        return this.key
    }

}