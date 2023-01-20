import Box, {CBox} from "@/stateless-container/base/Box"
import UserIntroCard from "@/stateless-container/advanced/UserIntroCard";
import BlogHeaderMenu from "@/statefull-container/BlogHeaderMenu";
import PostSummaryBody from "@/statefull-container/PostSummaryBody";
import Home from '@/statefull-container/templates/home'

import {GetServerSideProps} from "next";
import PostRepository from "@/repository/post";


interface Props {
    posts: PostModel []
    curPage: number
    perPage: number
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const perPage = 10
    const curPage = 1
    const posts = await PostRepository.getPosts(curPage, perPage)
    return {
        props: {
            posts,
            curPage,
            perPage
        }
    }
}

export default function HomePage(props: Props) {
    return (
        <Home initPosts={props.posts} initCurPage={props.curPage} initPerPage={props.perPage}/>
    );
}
