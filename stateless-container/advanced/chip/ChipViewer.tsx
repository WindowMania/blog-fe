import ChipList from "@/stateless-container/advanced/chip/ChipList";


export interface Props {
    chips: ItemData [] | string []
    onClickChip?: (chipId: string) => Promise<void>
}


function toItems(it: ItemData [] | string []): ItemData[] {
    if (!it) return []
    if (typeof it[0] === 'string') {
        // @ts-ignore
        return it.map((i: string) => ({"id": i, "viewValue": i}))
    }
    return it as ItemData []
}


export default function ChipViewer(props: Props) {

    return (
        <ChipList chips={toItems(props.chips)}
                  onClickChip={props.onClickChip}
        />
    )
}