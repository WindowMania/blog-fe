import PostEditMolecule from "@/components/molecule/post-editor"
import {useCallback} from "react";
import restApi from "@/libs/RestApi";
import useLogin from "@/hooks/useLogin";

export interface Props {
}


export default function PostCreator(props: Props) {
    const {accessKey} = useLogin()

    const submit = useCallback(async (ctx: PostEditorModel) => {
        const url = "http://localhost:8000/api/v1/post"
        console.log("어세스키?", accessKey)
        const res = await restApi.post(url, {...ctx}, {accessKey})
        console.log("봅시다..", res)
        return Promise.resolve(res)
    }, [accessKey])

    return (
        <PostEditMolecule mode={'create'} onSubmit={submit}/>
    )
}