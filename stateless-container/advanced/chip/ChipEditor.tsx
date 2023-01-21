import React, {useEffect, useState} from "react";
import {styled} from "@mui/material";
import {useSnackbar} from "notistack";

import Box, {CBox} from "@/stateless-container/base/Box";
import {FAIL_TOP_MIDDLE_OPTION} from "@/libs/snackbar"
import TextInputBox from "@/stateless-container/base/TextInputBox";
import ChipList from "@/stateless-container/advanced/chip/ChipList";


export interface Props {
    chips: ItemData []
    onAddChip: (itemId: string) => Promise<BasicRestResponse>
    onDeleteChip: (itemId: string) => Promise<BasicRestResponse>
    onChangeChips: (chips: ItemData[]) => void
}

const Root = styled(CBox)`
  width: 100%;
`


export default function ChipEditor(props: Props) {
    const [chips, setChips] = useState<ItemData []>(props.chips)
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
        if (inputChip.length < 2) {
            enqueueSnackbar("태그는 최소 2글자 이상만 가능합니다.", FAIL_TOP_MIDDLE_OPTION)
            return
        }
        if (inputChip === 'All') {
            enqueueSnackbar("추가할 수 없는 태그 이름 입니다.", FAIL_TOP_MIDDLE_OPTION)
            return
        }
        const ret = chips.find((chip) => chip.viewValue === inputChip)
        if (ret) {
            setInputChip('')
            return
        }
        const res = await props.onAddChip(inputChip)
        res.ok && setChips([...chips, {id: inputChip, viewValue: inputChip}]) && setInputChip('')
        !res.ok && enqueueSnackbar(res.message, FAIL_TOP_MIDDLE_OPTION)
    }

    async function handleDeleteChip(chipId: string) {
        const res = await props.onDeleteChip(chipId)
        res.ok && setChips(chips.filter((c) => c.id !== chipId))
        !res.ok && enqueueSnackbar(res.message, FAIL_TOP_MIDDLE_OPTION)
    }


    return (
        <Root>
            <ChipList chips={chips}
                      onDeleteChip={handleDeleteChip}
                      blackList={["All"]}
            />
            <Box>
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