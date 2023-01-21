import PostSummaryCardMolecule from "@/stateless-container/advanced/PostSummaryCard";
import {CBox} from "@/stateless-container/base/Box";
import {useLayoutEffect, useState} from "react";
import useScroll from "@/hooks/useScroll";
import PostRepository from "@/repository/post";
import useMyRouter from "@/hooks/useMyRouter";


export interface Props {
    posts: PostModel []
    curPage: number
    perPage: number
}


export default function PostSummaryBody(props: Props) {
    const [curPage, setCurPage] = useState<number>(props.curPage)
    const [perPage, setPerPage] = useState<number>(props.perPage)
    const [posts, setPosts] = useState<PostModel []>(props.posts)
    const {isReached} = useScroll()
    const {route} = useMyRouter()

    async function onClickTitle(postId: string) {
        await route("POST_READ", {"id": postId})
    }


    useLayoutEffect(() => {
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
                    />
                })
            }
        </CBox>

    )
}