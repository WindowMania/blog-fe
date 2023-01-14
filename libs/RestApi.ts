export interface RestResponse {
    success: boolean
    data: any
    detail?: string
}

export class RestApi {
    constructor() {
    }

    private getHeader(opt: any): HeadersInit {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        }
        if (opt && opt.accessKey) {
            headers['Authorization'] = 'Bearer ' + opt.accessKey
        }
        return headers
    }

    public async post(url: string, data: any, opt?: any): Promise<BasicRestResponse> {
        const res = await fetch(url, {
            method: "POST",
            headers: this.getHeader(opt),
            body: JSON.stringify(data),
        })
        const res_data = await res.json()
        const ret: BasicRestResponse = {
            ok: res.ok,
            data: res_data,
            message: res_data?.detail
        }
        return ret
    }

}


const defaultRestApi = new RestApi()

export default defaultRestApi