import PostEditMolecule from "@/stateless-container/templates/post/PostEditor"
import {useCallback} from "react";
import useLogin from "@/hooks/useLogin";
import {FAIL_TOP_MIDDLE_OPTION, restResponseToSnackbar} from "@/libs/snackbar";
import {useSnackbar} from "notistack";
import useRedirect from "@/hooks/useRedirect";
import PostRepository from "@/repository/post";
import {ImageBlobHookResponse} from "@/stateless-container/advanced/toast/ToastEditor";
import LoadingPage from "@/stateless-container/templates/LoadingPage";

export interface Props {
}


export default function PostCreator(props: Props) {
    const {accessKey} = useLogin()
    const {enqueueSnackbar} = useSnackbar()
    const redirect = useRedirect()
    console.log(accessKey)

    const submit = useCallback(async (ctx: PostEditorModel) => {
        if (!accessKey) return {ok: false}
        const res = await PostRepository.createPost(ctx, accessKey)
        const {message, option} = restResponseToSnackbar(res, "글이 작성 되었습니다.")
        enqueueSnackbar(message, option)
        res.ok && await redirect("post-viewer?id=" + res.data['id'])
        return Promise.resolve(res)
    }, [accessKey])


    async function addTag(tag: string): Promise<BasicRestResponse> {
        if (!accessKey) return {ok: false}
        if (tag && tag.length >= 2) {
            const res = await PostRepository.addTag(tag, accessKey)
            return res
        }
        enqueueSnackbar("태그는 최소 2글자 이상 입니다", FAIL_TOP_MIDDLE_OPTION)
        return {ok: false}
    }

    async function onUploadFile(f: File | Blob): Promise<ImageBlobHookResponse> {
        if (!accessKey) return {ok: false}
        const res = await PostRepository.uploadFile(f, accessKey)
        return Promise.resolve({
            ok: true,
            url: res?.uploaded_url
        })
    }


    async function deleteTag(tag: string): Promise<BasicRestResponse> {
        if (!accessKey) return {ok: false}
        const res = await PostRepository.deleteTag(tag, accessKey)
        return Promise.resolve({"ok": true})
    }

    return (
        <LoadingPage getLoadingState={async () => accessKey !== undefined ? "success" : "pending"}>
            <PostEditMolecule mode={'create'}
                              onSubmit={submit}
                              onAddTag={addTag}
                              onDeleteTag={deleteTag}
                              onUploadFile={onUploadFile}
            />
        </LoadingPage>
    )
}