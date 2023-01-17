import {useRouter} from "next/router";
import {useCallback} from "react";


export default function useRedirect(defaultHref?: string) {
    const router = useRouter()
    const href = defaultHref || ''

    const redirect = useCallback(async (_goto?: string) => {
        const dir = "/redirect?goto="
        const goto = _goto || href
        await router.push(dir + goto)
    }, [defaultHref])

    return redirect
}