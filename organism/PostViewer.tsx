import PostViewerMolecule from "@/components/molecule/post-viewer";

export interface Props {
    postId: string
}

const textCtx: PostModel = {
    tags: ["리액트", "파이썬", "데이터베이스"],
    created_at: new Date(),
    updated_at: new Date(),
    username: "kyb",
    post_id: 'string',
    title: "임시테스트..",
    body: "<h1><strong>sdfasdf</strong></h1><p><br></p><h6>sdad</h6><p><br></p><p><br></p><p>asd</p><p><br></p><p><br></p><ol><li><p>1</p></li><li><p>2</p></li><li><p>3</p></li><li><p>4</p></li><li><p>5</p></li><li><p>6</p></li><li><p>7</p></li><li><p><br></p></li></ol>"
}

export default function PostViewer(props: Props) {
    return (
        <PostViewerMolecule postContext={textCtx}/>
    )
}