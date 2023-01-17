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
            'Accept': 'application/json'
        }
        if (opt && opt.accessKey) {
            headers['Authorization'] = 'Bearer ' + opt.accessKey
        }
        return headers
    }

    private async makeResponse(res: Response) {
        const res_data = await res.json()
        const ret: BasicRestResponse = {
            ok: res.ok,
            data: res_data,
            message: res_data?.detail
        }
        return ret
    }

    public async post(url: string, data: any, opt?: any): Promise<BasicRestResponse> {
        const res = await fetch(url, {
            method: "POST",
            headers: this.getHeader(opt),
            body: JSON.stringify(data),
        })
        return this.makeResponse(res)
    }

    public async get(url: string, opt?: any): Promise<BasicRestResponse> {
        const res = await fetch(url, {
            method: "GET",
            headers: this.getHeader(opt),
        })
        return this.makeResponse(res)
    }

    public async put(url: string, data: any, opt?: any): Promise<BasicRestResponse> {
        const res = await fetch(url, {
            method: "PUT",
            headers: this.getHeader(opt),
            body: JSON.stringify(data),
        })
        return this.makeResponse(res)
    }

    public async delete(url: string, opt?: any): Promise<BasicRestResponse> {
        const res = await fetch(url, {
            method: "DELETE",
            headers: this.getHeader(opt),
        })
        return this.makeResponse(res)
    }

}


const defaultRestApi = new RestApi()

export default defaultRestApi