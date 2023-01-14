import React from 'react'
import {useRouter} from "next/router";

import BlogHeaderMenuMolecule from "@/components/molecule/BlogHeader";

export interface Props {
    writeHref?: string
    loginHref?: string
    homeHref?: string
}

export default function BlogHeaderMenu(props: Props) {
    const router = useRouter()
    const menuItems = ["Login", "PostWrite", "Setting"]
    const writeHref = props.writeHref || "/post-edit"
    const loginHref = props.homeHref || "/login"
    const home = props.homeHref || "/"

    const handleClickMenu = React.useCallback(async (item: MenuItem) => {
        switch (item) {
            case "PostWrite":
                await router.push(writeHref)
                break
        }
    }, [])

    return (
        <BlogHeaderMenuMolecule
            onClickMenu={handleClickMenu}
            menuItems={menuItems}/>
    )
}