import SeriesCreatorStateless, {SeriesEditorModel} from "@/stateless-container/templates/series/SeriesEditor"
import {useState} from "react";


export interface Props {
}


async function async_call(keyword: string) {
    function sleep(ms: number) {
        return new Promise((r) => setTimeout(r, ms));
    }

    const items = [
        {id: "1", viewValue: "zz"}, {id: "2", viewValue: "zz2"},
        {id: "3", viewValue: "안녕하세요.."}
    ]
    await sleep(3000)
    return items
}

export default function SeriesCreator(props: Props) {
    const [model, setModel] = useState<SeriesEditorModel>({
        title: '',
        body: '',
        items: []
    })

    return (
        <SeriesCreatorStateless model={model} loadItems={async_call}
                                onChangeModel={(m) => setModel(m)}
        />
    )
}