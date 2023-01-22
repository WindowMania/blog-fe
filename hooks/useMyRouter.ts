import {useRouter} from "next/router";
import {useCallback} from "react";


export type RouterURL = "HOME" | "POST_READ" | "POST_EDIT"

export default function useMyRouter() {
    const router = useRouter()

    function __switching_url(url: RouterURL) {
        switch (url) {
            case "POST_READ":
                return '/post-viewer'
            case "POST_EDIT":
                return '/post-edit'
            case "HOME":
            default:
                return ''
        }
    }

    const route = useCallback(async (url: RouterURL, param?: any) => {
        let goto = __switching_url(url)
        if (param) {
            goto = goto + "?" + new URLSearchParams(param).toString()
        }
        await router.push(goto)
    }, [router])
    return {route}
}