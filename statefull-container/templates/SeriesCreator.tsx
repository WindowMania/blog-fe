import SeriesCreatorStateless, {SeriesEditorModel} from "@/stateless-container/templates/series/SeriesEditor"
import {useState} from "react";
import useLogin from "@/hooks/useLogin";
import {useSnackbar} from "notistack";
import PostRepository from "@/repository/post";
import {FAIL_TOP_MIDDLE_OPTION} from "@/libs/snackbar";


export interface Props {
}


export default function SeriesCreator(props: Props) {
    const {accessKey} = useLogin()
    const {enqueueSnackbar} = useSnackbar()
    const mode: EditorMode = 'create'

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

    async function onSubmit() {
        if (!accessKey) {
            enqueueSnackbar("생성할 수 없는 로그인 계정", FAIL_TOP_MIDDLE_OPTION)
            return
        }
        const ret = await PostRepository.createSeries({
            title: model.title,
            body: model.body,
            postIdList: model.items.map(i => i.id)
        }, accessKey)
        console.log(ret)
    }

    async function onDelete() {
    }

    return (
        <SeriesCreatorStateless
            mode={mode}
            model={model}
            loadItems={searchTitle}
            onChangeModel={(m) => setModel(m)}
            onSubmit={onSubmit}
            onDelete={onDelete}
        />
    )
}