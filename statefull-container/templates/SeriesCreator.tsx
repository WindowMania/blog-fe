import SeriesCreatorStateless, {SeriesEditorModel} from "@/stateless-container/templates/series/SeriesEditor"
import {useState} from "react";
import useLogin from "@/hooks/useLogin";
import {useSnackbar} from "notistack";
import PostRepository from "@/repository/post";
import {FAIL_TOP_MIDDLE_OPTION, restResponseToSnackbar} from "@/libs/snackbar";
import {ImageBlobHookResponse} from "@/stateless-container/advanced/toast/ToastEditor";
import LoadingPage from "@/stateless-container/templates/LoadingPage";
import useMyRouter from "@/hooks/useMyRouter";


export interface Props {
}


export default function SeriesCreator(props: Props) {
    const {accessKey} = useLogin()
    const {enqueueSnackbar} = useSnackbar()
    const {routeReplace} = useMyRouter()
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

    async function onUploadFile(f: File | Blob): Promise<ImageBlobHookResponse> {
        if (!accessKey) return {ok: false}
        const res = await PostRepository.uploadFile(f, accessKey)
        return Promise.resolve({
            ok: true,
            url: res?.uploaded_url
        })
    }


    async function onSubmit(body: string) {
        if (!accessKey) {
            enqueueSnackbar("생성할 수 없는 로그인 계정", FAIL_TOP_MIDDLE_OPTION)
            return
        }
        const res = await PostRepository.createSeries({
            title: model.title,
            body,
            postIdList: model.items.map(i => i.id)
        }, accessKey)
        const {message, option} = restResponseToSnackbar(res, "글이 작성 되었습니다.")
        enqueueSnackbar(message, option)
        res.ok && await routeReplace("SERIES_READ", {"seriesId": res['data'].id})
    }

    return (
        <LoadingPage getLoadingState={async () => accessKey !== undefined ? "success" : "pending"}>
            <SeriesCreatorStateless
                mode={mode}
                model={model}
                loadItems={searchTitle}
                onChangeModel={(m) => setModel(m)}
                onSubmit={onSubmit}
                onUploadFile={onUploadFile}
            />
        </LoadingPage>
    )
}