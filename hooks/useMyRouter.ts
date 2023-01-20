import {useRouter} from "next/router";
import {useCallback} from "react";


export type RouterURL = "HOME" | "POST_READ"

export default function useMyRouter() {
    const router = useRouter()
    const route = useCallback(async (url: RouterURL, param?: any) => {
        let goto = ""
        switch (url) {
            case "POST_READ":
                goto = '/post-viewer'
                break
            case "HOME":
            default:
                goto = ''
        }
        if (param) {
            goto = goto + "?" + new URLSearchParams(param).toString()
        }
        await router.push(goto)
    }, [router])

    return {route}
}