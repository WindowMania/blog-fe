import SeriesCreatorStateless, {SeriesEditorModel} from "@/stateless-container/templates/series/SeriesEditor"
import {useState} from "react";
import useLogin from "@/hooks/useLogin";
import {useSnackbar} from "notistack";
import PostRepository from "@/repository/post";


export interface Props {
}


// async function async_call(keyword: string) {
//     function sleep(ms: number) {
//         return new Promise((r) => setTimeout(r, ms));
//     }
//
//     const items = [
//         {id: "1", viewValue: "zz"}, {id: "2", viewValue: "zz2"},
//         {id: "3", viewValue: "안녕하세요.."}
//     ]
//     await sleep(3000)
//     return items
// }

export default function SeriesCreator(props: Props) {
    const {accessKey} = useLogin()
    const {enqueueSnackbar} = useSnackbar()

    const [model, setModel] = useState<SeriesEditorModel>({
        title: '',
        body: '',
        items: []
    })

    async function searchTitle(title: string) {
        const ret = await PostRepository.getPosts({perPage: 10, curPage: 1, title})
        return ret.map(m => ({
            id: m.id,
            viewValue: m.title
        }))
    }

    return (
        <SeriesCreatorStateless model={model}
                                loadItems={searchTitle}
                                onChangeModel={(m) => setModel(m)}
        />
    )
}