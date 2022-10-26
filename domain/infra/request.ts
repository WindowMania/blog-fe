import fetch from 'isomorphic-unfetch'

import JWT from './jwt'


export interface Request {
    post<T, U>(url: string, data: T): Promise<U>
    get<T>(url: string, params: any): Promise<T>
}

export interface RequestHeader {
    build(): Request

    set_jwt(jwt: JWT): void
}


export default class RequestImp implements Request {
    constructor(private header: Headers) {}

    async get<T>(url: string, params: any): Promise<T> {
        const res = await fetch(url + "?" + new URLSearchParams(params), {
            headers: this.header,
            method: "GET",
        })
        if (!res.ok) {
            // 인프라 에러..
            throw new Error("Get Fail")
        }
        const ret = await res.json()
        return Promise.resolve(ret as T)
    }

    async post<T, U>(url: string, data: T): Promise<U> {
        const res = await fetch(url, {
            headers: this.header,
            method: "POST",
            body: JSON.stringify(data),
        })
        if (!res.ok) {
            // 인프라 에러..
            throw new Error("Post Fail")
        }
        const ret = await res.json()
        return Promise.resolve(ret as U)
    }

}

class RequestJsonHeaderImp implements RequestHeader {
    private readonly header: Headers
    constructor() {
        this.header = new Headers()
    }

    set_jwt(jwt: JWT): void {
        if (jwt) {
            this.header.set("Authorization", `Bearer ${jwt.get_token()}`)
        }
    }

    build(): Request {
        return new RequestImp(this.header);
    }

}



