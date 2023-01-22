export class FormApi {
    constructor() {
    }

    private getHeader(opt: any): HeadersInit {
        const headers: HeadersInit = {}
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

    public async post(url: string, data: Blob | File, opt?: any): Promise<BasicRestResponse> {
        let body = new FormData()
        body.append('file', data)

        const res = await fetch(url, {
            method: "POST",
            headers: this.getHeader(opt),
            body,
        })
        return this.makeResponse(res)
    }
}


const defaultFormApi = new FormApi()

export default defaultFormApi