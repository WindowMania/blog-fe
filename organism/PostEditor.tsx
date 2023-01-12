import PostEditMolecule, {EditorContext} from "@/components/molecule/post-editor"

export interface Props {

}

async function submit(ctx: EditorContext) {
    const ret: BasicRestResponse = {
        ok: true
    }
    console.log("ctx 봅시다..", ctx)
    return Promise.resolve(ret)
}

export default function PostEditor(props: Props) {
    return (
        <PostEditMolecule context={{}} onSubmit={submit}/>
    )
}