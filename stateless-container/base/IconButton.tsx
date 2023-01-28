import MuiIconButton from "@mui/material/IconButton";
import React from "react";

export interface Props {
    onClick?: () => void
    children: React.ReactElement
}

export default function IconButton(props: Props) {
    const onClick =() => {
        props.onClick?.()
    }

    return (
        <MuiIconButton
            onClick={onClick}>
            {props.children}
        </MuiIconButton>
    )
}