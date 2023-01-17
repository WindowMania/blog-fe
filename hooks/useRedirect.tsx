import {useRouter} from "next/router";
import {useEffect, useLayoutEffect, useMemo} from "react";

export interface Props {
    href: string
    callback: () => boolean
}

export default function useRedirect(props: Props) {
    const router = useRouter()
    useEffect(() => {
        if (props.callback()) {
            const redirect = "/redirect?goto="
            router.push(redirect + props.href).then()
        }
    }, [props.callback])
}