import {useRouter} from "next/router";
import {useCallback} from "react";


export type RouterURL =
    "HOME"
    | "POST_READ"
    | "POST_EDIT"
    | "TAG_HOME"
    | "SERIES_HOME"
    | "POST_WRITE"
    | "LOGIN"
    | "SERIES_WRITE"
    | "SERIES_READ"
    | "SERIES_EDIT"


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
            case "SERIES_WRITE":
                return "/series-creator"
            case "SERIES_EDIT":
                return "/series-edit"
            case "SERIES_HOME":
                return '/series'
            case "SERIES_READ":
                return "/series-viewer"
            case "POST_WRITE":
                return '/post-write'
            case "LOGIN":
                return "/login"
            case "HOME":
            default:
                return '/'
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