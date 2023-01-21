import ChipEditorStateless from "@/stateless-container/advanced/chip/ChipEditor";

export interface Props {
    initChips: string []
    onChangeChips: (chips: string[]) => void
}

async function onAddChip(chip: string): Promise<BasicRestResponse> {
    return Promise.resolve({ok: true})
}

async function onDeleteChip(chip: string) {
    return Promise.resolve({ok: true})
}


function stringToItem(list: string[]): Item[] {
    return list.map((it) => ({
        "id": it,
        "viewValue": it
    }))
}

function itemToString(items: Item[]): string [] {
    return items.map(i => i.id)
}


export default function ChipEditor(props: Props) {

    function onChangeChips(chips: Item[]) {
        props.onChangeChips(itemToString(chips))
    }

    return (
        <ChipEditorStateless
            chips={stringToItem(props.initChips)}
            onAddChip={onAddChip}
            onDeleteChip={onDeleteChip}
            onChangeChips={onChangeChips}
        />
    )
}