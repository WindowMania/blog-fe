import {useRouter} from "next/router";
import {useCallback} from "react";


export type RouterURL = "HOME" | "POST_READ" | "POST_EDIT" | "TAG_HOME" | "SERIES_HOME"

export default function useMyRouter() {
    const router = useRouter()

    function __switching_url(url: RouterURL) {
        switch (url) {
            case "POST_READ":
                return '/post-viewer'
            case "POST_EDIT":
                return '/post-edit'
            case "TAG_HOME":
                return '/tags'
            case "SERIES_HOME":
                return '/series'
            case "HOME":
            default:
                return ''
        }
    }

    function __makeUrl(url: RouterURL, param?: any): string {
        let goto = __switching_url(url)
        if (param) {
            goto = goto + "?" + new URLSearchParams(param).toString()
        }
        return goto
    }

    const route = useCallback(async (url: RouterURL, param?: any) => {
        await router.push(__makeUrl(url, param))
    }, [router])

    const routeReplace = useCallback(async (url: RouterURL, param?: any) => {
        await router.replace(__makeUrl(url, param))
    }, [router])

    return {route, routeReplace}
}