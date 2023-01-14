import PostEditMolecule from "@/components/molecule/post-editor"
import {useCallback} from "react";

export interface Props {}


export default function PostCreator(props: Props) {

    const submit = useCallback(async (ctx:PostEditorModel) => {
        const ret:BasicRestResponse = {
            ok:true
        }
        return Promise.resolve(ret)
    }, [])

    return (
        <PostEditMolecule mode={'create'} onSubmit={submit}/>
    )
}