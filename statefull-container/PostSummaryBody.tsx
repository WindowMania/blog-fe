import PostSummaryCardMolecule from "@/stateless-container/advanced/PostSummaryCard";
import {CBox} from "@/stateless-container/base/Box";
import {useCallback, useLayoutEffect, useRef, useState} from "react";
import env from '@/libs/env'
import restApi from "@/libs/RestApi";
import useScroll from "@/hooks/useScroll";
import PostRepository from "@/repository/post";


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


    useLayoutEffect(() => {

    }, [])

    useLayoutEffect(() => {
        console.log("리치..?", isReached)
        if (isReached) {
            const nextPage = curPage + 1
            PostRepository.getPosts(nextPage, perPage).then((loadedPosts) => {
                console.log("보자..", loadedPosts,nextPage)
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
                posts.map((post,key) => {
                    return <PostSummaryCardMolecule
                        key={key}
                        post={post}
                    />
                })
            }
        </CBox>

    )
}