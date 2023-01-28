import React, {useCallback} from "react";

import {
    ChipStyled,
    ChipListStyled,
    ChipListItemStyled
} from "@/stateless-container/advanced/chip/index";

export interface Props {
    chips: ItemData []
    onDeleteChip?: (chipId: string) => Promise<void>
    onClickChip?: (chipId: string) => Promise<void>

    blackList?: string[]
}

export interface ChipItemProps {
    chip: ItemData
    onDelete?: (label: string) => Promise<void>
    onClick?: (label: string) => Promise<void>
}


function ChipItem(props: ChipItemProps) {
    async function onDelete() {
        await props.onDelete?.(props.chip.id)
    }

    async function onClick() {
        await props.onClick?.(props.chip.id)
    }

    return (
        <ChipListItemStyled>
            <ChipStyled label={props.chip.viewValue}
                        onClick={props.onClick ? onClick : undefined}
                        onDelete={props.onDelete ? onDelete : undefined}/>
        </ChipListItemStyled>
    )
}

function filterBlackList(it: ItemData [], blackList: string[]) {
    const dict = blackList.reduce((acc: any, black) => {
        acc[black] = true
        return acc
    }, {} as any)

    return it.filter(item => {
        if (dict[item.id]) return false
        return true
    })
}

export default function ChipList(props: Props) {

    const handleDeleteChip = useCallback(async (chipId: string) => {
        await props.onDeleteChip?.(chipId)
    }, [props.chips])

    const handleOnClickChip = useCallback(async (chipId: string) => {
        await props.onClickChip?.(chipId)
    }, [props.chips])

    return (
        <ChipListStyled>
            {
                (filterBlackList(props.chips, props.blackList || []))
                    .map((chip) =>
                        (
                            <ChipItem key={chip.id}
                                      chip={chip}
                                      onClick={props.onClickChip ? handleOnClickChip : undefined}
                                      onDelete={props.onDeleteChip ? handleDeleteChip : undefined}/>
                        )
                    )
            }
        </ChipListStyled>
    )

}

