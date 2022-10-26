import LocalStorageImp, {BrowserStorage} from "./browser_storage"
import jwt_decode from "jwt-decode";

export interface Token<T> {

    get_token(): string | null

    is_valid(): boolean

    decode(): T | null

    invalidate(): void

}

export default class JWT implements Token<string> {
    private readonly localStorage: BrowserStorage

    constructor(private readonly key: string,
                private value: string
    ) {
        this.localStorage = new LocalStorageImp(this.key)
        this.localStorage.set(value)
    }

    decode(): string | null {
        const token = this.localStorage.get()
        if (token === null) {
            return null
        }
        return jwt_decode(token)
    }

    get_token(): string | null {
        return this.localStorage.get()
    }

    invalidate(): void {
        this.localStorage.remove()
    }

    is_valid(): boolean {
        const decode = this.decode()
        return !!decode;
    }
}