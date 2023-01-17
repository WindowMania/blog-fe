import PostEditMolecule from "@/stateless-container/advanced/post-editor"
import {useCallback} from "react";
import restApi from "@/libs/RestApi";
import useLogin from "@/hooks/useLogin";
import env from "@/libs/env";
import {restResponseToSnackbar} from "@/libs/snackbar";
import {useSnackbar} from "notistack";
import useRedirect from "@/hooks/useRedirect";

export interface Props {
}


export default function PostCreator(props: Props) {
    const {accessKey} = useLogin()
    const {enqueueSnackbar} = useSnackbar()
    const redirect = useRedirect()

    const submit = useCallback(async (ctx: PostEditorModel) => {
        const url = env.backUrl + "/post"
        const res = await restApi.post(url, {...ctx}, {accessKey})
        const {message, option} = restResponseToSnackbar(res, "글이 작성 되었습니다.")
        enqueueSnackbar(message, option)
        res.ok && await redirect("post-viewer?id=" + res.data['id'])
        return Promise.resolve(res)
    }, [accessKey])

    return (
        <PostEditMolecule mode={'create'} onSubmit={submit}/>
    )
}