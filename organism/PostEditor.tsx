import {useSnackbar} from "notistack";

import PostEditMolecule from "@/components/molecule/post-editor"
import useLogin from "@/hooks/useLogin";
import {useCallback} from "react";
import env from "@/libs/env";
import restApi from "@/libs/RestApi";

import {restResponseToSnackbar} from "@/libs/snackbar";

export interface Props {
    post: PostModel
}


export default function PostEditor(props: Props) {
    const {accessKey} = useLogin()
    const {enqueueSnackbar} = useSnackbar()

    const submit = useCallback(async (ctx: PostEditorModel) => {
        const url = env.backUrl + "/post"
        const data = {
            id: props.post.id,
            title: ctx.title,
            body: ctx.body,
            tags: ctx.tags
        }
        const res = await restApi.put(url, data, {accessKey})
        const {message, option} = restResponseToSnackbar(res, "업데이트성공")
        enqueueSnackbar(message, option)
        return Promise.resolve(res)
    }, [accessKey])

    const post: PostEditorModel = {
        title: props.post.title,
        body: props.post.body,
        tags: props.post.tags
    }

    return (
        <PostEditMolecule post={post} mode={'edit'} onSubmit={submit}/>
    )
}