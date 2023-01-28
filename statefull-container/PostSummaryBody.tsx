import PostSummaryCardMolecule from "@/stateless-container/advanced/PostSummaryCard";
import {CBox} from "@/stateless-container/base/Box";
import {useEffect, useState} from "react";
import useScroll from "@/hooks/useScroll";
import PostRepository from "@/repository/post";
import useMyRouter from "@/hooks/useMyRouter";
import useLogin from "@/hooks/useLogin";

export interface PostSearchCondition {
    curPage: number
    perPage: number
    tags: string []
}


export interface Props {
    posts: PostModel []
    onScrollEnd: () => Promise<void>
}


export default function PostSummaryBody(props: Props) {
    const {isLogin} = useLogin()
    const {isReached} = useScroll()
    const {route} = useMyRouter()

    async function onClickTitle(postId: string) {
        await route("POST_READ", {"id": postId})
    }

    async function onClickEdit(postId: string) {
        await route("POST_EDIT", {"id": postId})
    }

    useEffect(() => {
        isReached && props.onScrollEnd().then()
    }, [isReached])

    return (
        <CBox>
            {
                props.posts.map((post, key) => {
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