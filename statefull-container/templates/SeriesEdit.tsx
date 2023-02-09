import LoadingPage from "@/stateless-container/templates/LoadingPage";
import useLogin from "@/hooks/useLogin";
import {SeriesEditorModel} from "@/stateless-container/templates/series/SeriesEditor";
import {ImageBlobHookResponse} from "@/stateless-container/advanced/toast/ToastEditor";
import PostRepository, {SeriesWithPostModel} from "@/repository/post";
import {useState} from "react";
import {FAIL_TOP_MIDDLE_OPTION, SUCCESS_TOP_MIDDLE_OPTION} from "@/libs/snackbar";
import {useSnackbar} from "notistack";
import dynamic from "next/dynamic";

export interface Props {
    series: SeriesWithPostModel
}

const NoSsrSeriesEditor = dynamic(() => import('@/stateless-container/templates/series/SeriesEditor'), {
    ssr: false,
});


export default function SeriesEdit(props: Props) {
    const {accessKey} = useLogin()
    const {enqueueSnackbar} = useSnackbar()
    const mode = 'edit'
    const [model, setModel] = useState<SeriesEditorModel>({
        "id": props.series.id,
        "title": props.series.title,
        "body": props.series.body,
        "items": props.series.posts.map(sp => ({id: sp.id, viewValue: sp.title}))
    })

    async function onUploadFile(f: File | Blob): Promise<ImageBlobHookResponse> {
        if (!accessKey) return {ok: false}
        const res = await PostRepository.uploadFile(f, accessKey)
        return Promise.resolve({
            ok: true,
            url: res?.uploaded_url
        })
    }

    async function searchTitle(title: string) {
        const ret = await PostRepository.getPosts({perPage: 10, curPage: 1, title})
        return ret.map(m => ({
            id: m.id,
            viewValue: m.title
        }))
    }

    async function onSubmit(body:string) {
        if (!accessKey) {
            enqueueSnackbar("생성할 수 없는 로그인 계정", FAIL_TOP_MIDDLE_OPTION)
            return
        }
        const ret = await PostRepository.updateSeries({
            id: model.id as string,
            title: model.title,
            body,
            postIdList: model.items.map(item => item.id)
        }, accessKey)

        ret && enqueueSnackbar("업데이트 성공", SUCCESS_TOP_MIDDLE_OPTION)
    }

    return (
        <LoadingPage getLoadingState={async () => accessKey !== undefined ? "success" : "pending"}>
            <NoSsrSeriesEditor
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