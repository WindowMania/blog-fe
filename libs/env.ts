export class Env {
    public backUrl: string
    public frontUrl: string

    constructor() {
        this.backUrl = process.env.NEXT_PUBLIC_BACK_URL as string
        this.frontUrl = process.env.NEXT_PUBLIC_FRONT_URL as string
    }
}


export default new Env()