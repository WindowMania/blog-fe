import PostViewerMolecule from "@/components/molecule/post-viewer";

export interface Props {
    post: PostModel
}


export default function PostViewer(props: Props) {
    return (
        <PostViewerMolecule post={props.post}/>
    )
}