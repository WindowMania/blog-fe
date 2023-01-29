import Home from '@/statefull-container/templates/home'

import {GetServerSideProps} from "next";
import PostRepository, {TagStatistics} from "@/repository/post";
import {PostSearchCondition} from "@/statefull-container/PostSummaryBody";


interface Props {
    posts: PostModel []
    search: PostSearchCondition
    tags: TagStatistics[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const tagQuery = query['ids'] as string || ''


    const perPage = 10
    const curPage = 1
    const tagIds = tagQuery.split(',')
    const posts = await PostRepository.getPosts(curPage, perPage, tagIds)
    const tags = await PostRepository.getTagStatistics()

    const search: PostSearchCondition = {
        curPage,
        perPage,
        tags: tagIds
    }

    return {
        props: {
            posts,
            search,
            tags
        }
    }
}

export default function HomePage(props: Props) {
    return (
        <Home pageMode={"tag-mode"}
              initPosts={props.posts}
              search={props.search}
              tags={props.tags}
        />
    )
}
