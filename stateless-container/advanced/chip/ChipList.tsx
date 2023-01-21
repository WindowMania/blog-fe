import React, {useCallback} from "react";
import {styled} from "@mui/material";


import Chip from "@/stateless-container/base/Chip";


export interface Props {
    chips: Item []
    onDeleteChip?: (chipId: string) => Promise<void>
    onClickChip?: (chipId: string) => Promise<void>

}

export interface ChipItemProps {
    chip: Item
    onDelete?: (label: string) => Promise<void>
    onClick?: (label: string) => Promise<void>
}

const List = styled('ul')`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0px;
  margin: 0px;
`

const ListItem = styled('li')(({theme}) => ({
    margin: theme.spacing(0.5),
}));

function ChipItem(props: ChipItemProps) {
    async function onDelete() {
        await props.onDelete?.(props.chip.id)
    }

    async function onClick() {
        await props.onClick?.(props.chip.id)
    }

    return (
        <ListItem>
            <Chip label={props.chip.viewValue}
                  onClick={props.onClick ? onClick : undefined}
                  onDelete={props.onDelete ? onDelete : undefined}/>
        </ListItem>
    )
}


export default function ChipList(props: Props) {

    const handleDeleteChip = useCallback(async (chipId: string) => {
        await props.onDeleteChip?.(chipId)
    }, [props.chips])

    const handleOnClickChip = useCallback(async (chipId: string) => {
        await props.onClickChip?.(chipId)
    }, [props.chips])


    return (
        <List>
            {
                (props.chips).map((chip) => (
                    <ChipItem key={chip.id}
                              chip={chip}
                              onClick={props.onClickChip ? handleOnClickChip : undefined}
                              onDelete={props.onDeleteChip ? handleDeleteChip : undefined}/>
                ))}
        </List>
    )

}

