import {Chip as ChipMui} from "@mui/material";
import {ChipProps as MuiChipProps} from "@mui/material";

export interface ChipProps extends MuiChipProps {
    selected?: boolean
}

export default function Chip(props: ChipProps) {
    return <ChipMui {...props} />
}


