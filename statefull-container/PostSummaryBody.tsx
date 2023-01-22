import PostSummaryCardMolecule from "@/stateless-container/advanced/PostSummaryCard";
import {CBox} from "@/stateless-container/base/Box";
import {useEffect, useState} from "react";
import useScroll from "@/hooks/useScroll";
import PostRepository from "@/repository/post";
import useMyRouter from "@/hooks/useMyRouter";
import useLogin from "@/hooks/useLogin";


export interface Props {
    posts: PostModel []
    curPage: number
    perPage: number
}


export default function PostSummaryBody(props: Props) {
    const {isLogin} = useLogin()
    const [curPage, setCurPage] = useState<number>(props.curPage)
    const [perPage,] = useState<number>(props.perPage)
    const [posts, setPosts] = useState<PostModel []>(props.posts)
    const {isReached} = useScroll()
    const {route} = useMyRouter()

    async function onClickTitle(postId: string) {
        await route("POST_READ", {"id": postId})
    }

    async function onClickEdit(postId: string) {
        await route("POST_EDIT", {"id": postId})
    }


    useEffect(() => {
        if (isReached) {
            const nextPage = curPage + 1
            PostRepository.getPosts(nextPage, perPage).then((loadedPosts) => {
                if (loadedPosts.length) {
                    setPosts([...posts, ...loadedPosts])
                    setCurPage(nextPage)
                }
            })
        }
    }, [isReached])


    return (
        <CBox>
            {
                posts.map((post, key) => {
                    return <PostSummaryCardMolecule
                        key={key}
                        post={post}
                        onClickTitle={onClickTitle}
                        onClickEdit={isLogin === true ? onClickEdit : undefined}
                    />
                })
            }
        </CBox>

    )
}