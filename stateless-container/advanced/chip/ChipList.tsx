import React, {useCallback} from "react";
import {styled} from "@mui/material";


import Chip from "@/stateless-container/base/Chip";


export interface Props {
    chips: string []
    onDeleteChip?: (chip: string) => Promise<void>
    onClickChip?: (chip: string) => Promise<void>
}

export interface ChipItemProps {
    label: string
    onDelete?: (label: string) => Promise<void>
    onClick?: (label: string) => Promise<void>
}

const List = styled('ul')`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  min-width: 400px;
`

const ListItem = styled('li')(({theme}) => ({
    margin: theme.spacing(0.5),
}));

function ChipItem(props: ChipItemProps) {
    async function onDelete() {
        await props.onDelete?.(props.label)
    }

    async function onClick() {
        await props.onClick?.(props.label)
    }

    return (
        <ListItem key={props.label}>
            <Chip label={props.label}
                  onClick={props.onClick ? onClick : undefined}
                  onDelete={props.onDelete ? onDelete : undefined}/>
        </ListItem>
    )
}


export default function ChipList(props: Props) {

    const handleDeleteChip = useCallback(async (chip: string) => {
        await props.onDeleteChip?.(chip)
    }, [props.chips])

    const handleOnClickChip = useCallback(async (chip: string) => {
        await props.onClickChip?.(chip)
    }, [props.chips])


    return (
        <List>
            {
                (props.chips).map((chip) => (
                    <ChipItem key={chip} label={chip}
                              onClick={props.onClickChip ? handleOnClickChip : undefined}
                              onDelete={props.onDeleteChip ? handleDeleteChip : undefined}/>
                ))}
        </List>
    )

}

