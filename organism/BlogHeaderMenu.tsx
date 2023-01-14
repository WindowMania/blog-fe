import React from 'react'

import BlogHeaderMenuMolecule from "@/components/molecule/BlogHeader";
import {useMenu} from "@/hooks/useMenu";


export default function BlogHeaderMenu() {
    const {menuItems,onClickMenu} = useMenu({})
    return (
        <BlogHeaderMenuMolecule
            onClickMenu={onClickMenu}
            menuItems={menuItems}/>
    )
}