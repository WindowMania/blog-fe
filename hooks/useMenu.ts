import useLogin from "@/hooks/useLogin";
import React from "react";
import {useRouter} from "next/router";

export interface Props {
    writeHref?: string
    loginHref?: string
    homeHref?: string
}


export function useMenu(props: Props) {
    const {isLogin, setLogout} = useLogin()
    const router = useRouter()

    const writeHref = props.writeHref || "/post-write"
    const loginHref = props.homeHref || "/login"
    const home = props.homeHref || "/"

    const handleClickMenu = React.useCallback(async (item: MenuItem) => {
        switch (item) {
            case "PostWrite":
                await router.push(writeHref)
                break
            case "Login":
                await router.push(loginHref)
                break
            case "Home":
                await router.push(home)
                break
            case "Logout":
                await router.push(loginHref)
                setLogout()
                break
        }
    }, [])

    let items = ["Login"]
    if (isLogin) {
        items = ["PostWrite", "Setting", "Logout"]
    }

    return {menuItems: items, onClickMenu: handleClickMenu}
}