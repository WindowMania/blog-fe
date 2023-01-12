import PostEditMolecule from "@/components/molecule/post-editor"

export interface Props {
}

async function submit(ctx: PostEditorContext) {
    const ret: BasicRestResponse = {
        ok: true
    }
    console.log("ctx 봅시다..", ctx)
    return Promise.resolve(ret)
}

export default function PostEditor(props: Props) {
    return (
        <PostEditMolecule onSubmit={submit}/>
    )
}