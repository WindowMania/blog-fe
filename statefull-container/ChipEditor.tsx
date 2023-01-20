import ChipEditorStateless from "@/stateless-container/advanced/ChipEditor";

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


export default function ChipEditor(props: Props) {
    const chipss = ["리액트",
        "파이썬", "데이터베이스", "음악", "리뷰",
        "FastAPI", "Docker", "proxmox", "공부", "일상", "휴식", "감상", "영화"]

    function onChangeChips(chips: string[]) {
        console.log("변경 되었어요..", chips)
    }

    return (
        <ChipEditorStateless
            chips={chipss}
            onAddChip={onAddChip}
            onDeleteChip={onDeleteChip}
            onChangeChips={onChangeChips}
        />
    )
}