import PostViewerMolecule from "@/stateless-container/templates/post/PostViewer";

export interface Props {
    post: PostModel
}


export default function PostViewer(props: Props) {
    return (
        <PostViewerMolecule post={props.post}/>
    )
}