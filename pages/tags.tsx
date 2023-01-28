import Home from '@/statefull-container/templates/home'

import {GetServerSideProps} from "next";
import PostRepository, {TagStatistics} from "@/repository/post";


interface Props {
    posts: PostModel []
    curPage: number
    perPage: number
    tags: TagStatistics[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const perPage = 10
    const curPage = 1
    const posts = await PostRepository.getPosts(curPage, perPage)
    const tags = await PostRepository.getTagStatistics()
    return {
        props: {
            posts,
            curPage,
            perPage,
            tags
        }
    }
}

export default function HomePage(props: Props) {
    return (
        <Home pageMode={"tag-mode"}
              initPosts={props.posts}
              initCurPage={props.curPage}
              initPerPage={props.perPage}
              tags={props.tags}
        />
    )
}
