import {BrowserStorage} from "../../domain/infra/browser_storage"

class BrowserTestStorage implements BrowserStorage {
    private readonly key: string
    private value: string | null

    constructor(key: string) {
        this.key = key
        this.value = "undefined"
    }

    get(): string | null {
        return this.value
    }

    getKey(): string {
        return this.key
    }

    remove(): void {
        this.value = "undefined"
    }

    set(data: string): void {
        this.value = data
    }
}


describe("init test", () => {

    it("z", () => {
        const b = new BrowserTestStorage("test")
        const value = "value"
        b.set(value)
        expect(b.get()).toBe(value)
    })

})