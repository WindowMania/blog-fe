import {ChipStyled, ChipListItemStyled, ChipListStyled} from "@/stateless-container/advanced/chip/index";
import {useEffect, useState} from "react";


export interface Props {
    chips: ItemData []
    initSelectedIdList: string []
    onChangeSelectedList: (idList: string []) => Promise<void>
    blackIdList: string []
}


export default function ChipToggleList(props: Props) {
    const [selectedList, setSelected] = useState<string[]>(props.initSelectedIdList)
    const selectedDict = selectedList.reduce((acc: any, id) => {
        acc[id] = true
        return acc
    }, {})
    const blackIdDict = props.blackIdList.reduce((acc: any, id: string) => {
        acc[id] = true
        return acc
    }, {})

    useEffect(() => {
        props.onChangeSelectedList(selectedList).then()
    }, [selectedList])

    async function handleClickItem(id: string) {
        selectedDict[id] ?
            setSelected(selectedList.filter(sid => sid !== id)) :
            setSelected([...selectedList, id])
    }

    return (
        <ChipListStyled>
            {props.chips
                .filter(chip => !blackIdDict[chip.id])
                .map(chip =>
                <ChipListItemStyled key={chip.id}
                                    onClick={(e) => e.stopPropagation()}>
                    <ChipStyled
                        onClick={() => handleClickItem(chip.id)}
                        selected={selectedDict[chip.id]} label={chip.viewValue}/>
                </ChipListItemStyled>)
            }
        </ChipListStyled>
    )
}