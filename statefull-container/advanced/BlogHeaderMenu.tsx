import React from 'react'

import BlogHeaderMenuMolecule from "@/stateless-container/advanced/BlogHeader";
import {useMenu} from "@/hooks/useMenu";
import useMyRouter from "@/hooks/useMyRouter";


export default function BlogHeaderMenu() {
    const {menuItems, onClickMenu} = useMenu()
    const {route} = useMyRouter()
    return (
        <BlogHeaderMenuMolecule
            onClickMenu={onClickMenu}
            menuItems={menuItems}
            onClickTagIcon={async () => await route("TAG_HOME")}
            onClickSeriesIcon={async () => await route("SERIES_HOME")}
        />
    )
}