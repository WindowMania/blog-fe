import ChipList from "@/stateless-container/advanced/chip/ChipList";


export interface Props {
    chips: string []
    onClickChip?: (chip: string) => Promise<void>
}


export default function ChipViewer(props: Props) {

    return (
        <ChipList chips={props.chips}
                  onClickChip={props.onClickChip}
        />
    )
}