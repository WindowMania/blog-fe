import {useSnackbar} from "notistack";

import PostEditMolecule from "@/stateless-container/advanced/post-editor"
import useLogin from "@/hooks/useLogin";
import {useCallback, useState} from "react";
import env from "@/libs/env";
import restApi from "@/libs/RestApi";

import {restResponseToSnackbar} from "@/libs/snackbar";
import useRedirect from "@/hooks/useRedirect";

export interface Props {
    post: PostModel
}


export default function PostEditor(props: Props) {
    const [post, setPost] = useState<PostModel>(props.post)
    const {accessKey} = useLogin()
    const {enqueueSnackbar} = useSnackbar()
    const redirect = useRedirect()

    const onSubmit = useCallback(async (ctx: PostEditorModel) => {
        const url = env.backUrl + "/post"
        const data = {
            id: post.id,
            title: ctx.title,
            body: ctx.body,
            tags: ctx.tags
        }
        const res = await restApi.put(url, data, {accessKey})
        const {message, option} = restResponseToSnackbar(res, "업데이트 성공")
        enqueueSnackbar(message, option)
        res.ok && setPost({...post, ...data})
        return Promise.resolve(res)
    }, [accessKey, post])

    const onDelete = useCallback(async (toDelete: boolean) => {
        const url = env.backUrl + "/post/set-delete"
        const res = await restApi.put(url, {id: post.id, deleted: toDelete}, {accessKey})
        const {message, option} = restResponseToSnackbar(res, toDelete ? "삭제 성공" : "복원 성공")
        enqueueSnackbar(message, option)
        res.ok && toDelete && await redirect()
        res.ok && setPost({...post, deleted: toDelete})
        return Promise.resolve(res)
    }, [accessKey, post])

    const postEditorModel: PostEditorModel = {
        title: post.title,
        body: post.body,
        tags: post.tags,
        deleted: post.deleted
    }

    return (
        <PostEditMolecule post={postEditorModel}
                          mode={'edit'}
                          onSubmit={onSubmit}
                          onDelete={onDelete}
        />
    )
}