import React, {useEffect, useState} from "react";
import {styled} from "@mui/material";
import {useSnackbar} from "notistack";

import Box, {CBox} from "@/stateless-container/base/Box";
import {FAIL_TOP_MIDDLE_OPTION} from "@/libs/snackbar"
import TextInputBox from "@/stateless-container/base/TextInputBox";
import ChipList from "@/stateless-container/advanced/chip/ChipList";

export interface Props {
    chips: string []
    onAddChip: (chip: string) => Promise<BasicRestResponse>
    onDeleteChip: (chip: string) => Promise<BasicRestResponse>
    onChangeChips: (chips: string[]) => void
}

const Root = styled(CBox)``


export default function ChipEditor(props: Props) {
    const [chips, setChips] = useState<string []>(props.chips)
    const [inputChip, setInputChip] = useState<string>('');
    const {enqueueSnackbar} = useSnackbar()

    useEffect(() => {
        props.onChangeChips(chips)
    }, [chips])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputChip(event.target.value);
    };


    async function handleKeyup(event: React.KeyboardEvent) {
        if (event.key !== 'Enter') return
        if (inputChip.length < 2) return
        const ret = chips.find((chip) => chip === inputChip)
        if (ret) {
            setInputChip('')
            return
        }
        const res = await props.onAddChip(inputChip)
        res.ok && setChips([...chips, inputChip]) && setInputChip('')
        !res.ok && enqueueSnackbar(res.message, FAIL_TOP_MIDDLE_OPTION)
    }

    async function handleDeleteChip(chip: string) {
        const res = await props.onDeleteChip(chip)
        res.ok && setChips(chips.filter((c) => c !== chip))
        !res.ok && enqueueSnackbar(res.message, FAIL_TOP_MIDDLE_OPTION)
    }


    return (
        <Root>
            <ChipList chips={chips} onDeleteChip={handleDeleteChip}/>

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