import useLogin from "@/hooks/useLogin";
import {useRouter} from "next/router";
import {useMemo} from "react";


export default function UseLoginRedirect(href: string) {
    const {isLogin} = useLogin()
    const router = useRouter()
    useMemo(() => {
        if (isLogin === false) {
            router.push(href).then()
        }
    }, [isLogin])
}