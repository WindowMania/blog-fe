import MuiIconButton from "@mui/material/IconButton";
import React, {MouseEvent} from "react";

export interface Props {
    onClick?: () => void
    children: React.ReactElement
}

export default function IconButton(props: Props) {
    const onClick = React.useCallback((evt?: MouseEvent) => {
        evt?.stopPropagation?.()
        evt?.preventDefault?.()
        props.onClick?.()
    }, [props.onClick])

    return (
        <MuiIconButton
            onClick={onClick}>
            {props.children}
        </MuiIconButton>
    )
}