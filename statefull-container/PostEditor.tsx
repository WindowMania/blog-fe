import {useSnackbar} from "notistack";

import PostEditMolecule from "@/stateless-container/advanced/post-editor"
import useLogin from "@/hooks/useLogin";
import {useCallback, useState} from "react";
import env from "@/libs/env";
import restApi from "@/libs/RestApi";

import {restResponseToSnackbar, FAIL_TOP_MIDDLE_OPTION} from "@/libs/snackbar";
import useRedirect from "@/hooks/useRedirect";
import PostRepository from "@/repository/post";

export interface Props {
    post: PostModel
}


export default function PostEditor(props: Props) {
    const [post, setPost] = useState<PostModel>(props.post)
    const {accessKey} = useLogin()
    const {enqueueSnackbar} = useSnackbar()
    const redirect = useRedirect()

    const onSubmit = useCallback(async (ctx: PostEditorModel): Promise<BasicRestResponse> => {
        if (!accessKey) {
            enqueueSnackbar("로그인 권한 필요 합니다.", FAIL_TOP_MIDDLE_OPTION)
            return {ok: false}
        }
        const res = await PostRepository.updatePost({
            postId: post.id,
            title: ctx.title,
            body: ctx.body,
            tags: ctx.tags
        }, accessKey)
        const {message, option} = restResponseToSnackbar(res, "업데이트 성공")
        enqueueSnackbar(message, option)
        res.ok && setPost({...post, ...res.data})
        return Promise.resolve(res)
    }, [accessKey, post])

    const onDelete = useCallback(async (toDeleted: boolean) => {
        if (!accessKey) {
            enqueueSnackbar("로그인 권한 필요 합니다.", FAIL_TOP_MIDDLE_OPTION)
            return {ok: false}
        }
        const res = await PostRepository.setDeletedPost({postId: post.id, toDeleted}, accessKey)
        const {message, option} = restResponseToSnackbar(res, toDeleted ? "삭제 성공" : "복원 성공")
        enqueueSnackbar(message, option)
        res.ok && toDeleted && await redirect()
        res.ok && setPost({...post, deleted: toDeleted})
        return Promise.resolve(res)
    }, [accessKey, post])


    async function addTag(tag: string): Promise<BasicRestResponse> {
        if (!accessKey) return {ok: false}
        if (tag && tag.length >= 2) {
            const res = await PostRepository.addTag(tag, accessKey)
            return res
        }
        enqueueSnackbar("태그는 최소 2글자 이상 입니다", FAIL_TOP_MIDDLE_OPTION)
        return {ok: false}
    }

    async function deleteTag(tag: string): Promise<BasicRestResponse> {
        if (!accessKey) return {ok: false}
        const res = await PostRepository.deleteTag(tag, accessKey)
        return Promise.resolve({"ok": true})
    }


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
                          onAddTag={addTag}
                          onDeleteTag={deleteTag}
        />
    )
}