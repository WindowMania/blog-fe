import React, {useCallback, useEffect, useState} from "react";
import {styled} from "@mui/material";
import {useSnackbar} from "notistack";

import Box, {CBox} from "@/stateless-container/base/Box";
import {FAIL_TOP_MIDDLE_OPTION} from "@/libs/snackbar"
import Chip from "@/stateless-container/base/Chip";
import TextInputBox from "@/stateless-container/base/TextInputBox";

export interface Props {
    chips: string []
    onAddChip: (chip: string) => Promise<BasicRestResponse>
    onDeleteChip: (chip: string) => Promise<BasicRestResponse>
    onChangeChips: (chips: string[]) => void
}

const Root = styled(CBox)``


const List = styled('ul')`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  min-width: 400px;
`

const ListItem = styled('li')(({theme}) => ({
    margin: theme.spacing(0.5),
}));


function setUniqueArray(a: string[]): string[] {
    const set = new Set()
    a.map(item => set.add(item));
    return Array.from(set) as string []
}


function ChipItem(props: {
    label: string
    onDelete: (label: string) => Promise<void>
}) {

    async function onDelete() {
        await props.onDelete(props.label)
    }

    return (
        <ListItem key={props.label}>
            <Chip label={props.label} onDelete={onDelete}/>
        </ListItem>
    )
}


export default function ChipEditor(props: Props) {
    const [chips, setChips] = useState<string []>(setUniqueArray(props.chips))
    const [inputChip, setInputChip] = useState<string>('');
    const {enqueueSnackbar} = useSnackbar()

    useEffect(() => {
        props.onChangeChips(chips)
    }, [chips])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputChip(event.target.value);
    };

    const handleKeyup = async (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            if (inputChip.length >= 2) {
                const ret = chips.find((chip) => chip === inputChip)
                if (ret) {
                    setInputChip('')
                    return
                }
                const res = await props.onAddChip(inputChip)
                if (res.ok) {
                    setChips([...chips, inputChip])
                    setInputChip('')
                } else {
                    enqueueSnackbar(res.message, FAIL_TOP_MIDDLE_OPTION)
                }
            }
        }
    }
    const handleDeleteChip = useCallback(async (chip: string) => {
        const res = await props.onDeleteChip(chip)
        if (res.ok) {
            const filtered = chips.filter((c) => c !== chip)
            setChips([...filtered])
        } else {
            enqueueSnackbar(res.message, FAIL_TOP_MIDDLE_OPTION)
        }
    }, [chips])


    return (
        <Root>
            <List>
                {
                    chips.map((chip) => (
                        <ChipItem key={chip} label={chip} onDelete={handleDeleteChip}/>
                    ))}
            </List>

            <Box pl={"40px"}>
                <TextInputBox
                    fullWidth
                    value={inputChip}
                    onChange={handleInputChange}
                    variant={'standard'}
                    onKeyUp={handleKeyup}
                />
            </Box>


        </Root>

    )
}