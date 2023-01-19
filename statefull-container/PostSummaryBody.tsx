import PostSummaryCardMolecule from "@/stateless-container/advanced/PostSummaryCard";
import {CBox} from "@/stateless-container/base/Box";
import {useCallback, useLayoutEffect, useState} from "react";
import env from '@/libs/env'
import restApi from "@/libs/RestApi";


export interface Props {
    curPage?: number
    perPage?: number
}

export default function PostSummaryBody(props: Props) {
    const [curPage, setCurPage] = useState<number>(props.curPage || 1)
    const [perPage, setPerPage] = useState<number>(props.perPage || 10)
    const [posts, setPosts] = useState<PostModel []>([])

    const loadPostList = useCallback(async (): Promise<PostModel []> => {
        const url = env.backUrl + `/post/list?page=${curPage}&perPage=${perPage}`
        const res = await restApi.get(url)
        if (res.ok) {
            return res.data['posts'] as PostModel []
        }
        return []
    }, [curPage, perPage])

    useLayoutEffect(() => {
        loadPostList().then((loadedPosts) => {
            setPosts(loadedPosts)
        })
    }, [])


    return (
        <CBox>
            {
                posts.map((post) => {
                    return <PostSummaryCardMolecule
                        key={post.id}
                        post={post}
                    />
                })
            }
        </CBox>

    )
}