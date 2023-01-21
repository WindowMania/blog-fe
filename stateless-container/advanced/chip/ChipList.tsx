import React, {useCallback} from "react";
import {styled} from "@mui/material";


import Chip from "@/stateless-container/base/Chip";


export interface Props {
    chips: string []
    onDeleteChip?: (chip: string) => Promise<void>
}

export interface ChipItemProps {
    label: string
    onDelete?: (label: string) => Promise<void>
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

    return (
        <ListItem key={props.label}>
            <Chip label={props.label} onDelete={props.onDelete ? onDelete : undefined}/>
        </ListItem>
    )
}


function setUniqueArray(a: string[]): string[] {
    const set = new Set()
    a.map(item => set.add(item));
    return Array.from(set) as string []
}

export default function ChipList(props: Props) {

    const handleDeleteChip = useCallback(async (chip: string) => {
        await props.onDeleteChip?.(chip)
    }, [props.chips])


    return (
        <List>
            {
                (props.chips).map((chip) => (
                    <ChipItem key={chip} label={chip} onDelete={props.onDeleteChip ? handleDeleteChip : undefined}/>
                ))}
        </List>
    )

}

