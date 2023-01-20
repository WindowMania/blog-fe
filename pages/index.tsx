import Box, {CBox} from "@/stateless-container/base/Box"
import UserIntroCard from "@/stateless-container/advanced/UserIntroCard";
import BlogHeaderMenu from "@/statefull-container/BlogHeaderMenu";
import PostSummaryBody from "@/statefull-container/PostSummaryBody";

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

export default function Home(props: Props) {
    return (
        <CBox width={"100%"}>
            <Box>
                <BlogHeaderMenu/>
            </Box>

            <Box>
                <UserIntroCard
                    userName={"kimhan"}
                    positionName={"CTO"}
                    introScript={"더 좋은 세상을 만들기 위해 고민합니다."}
                    profilePictureSrc={"/images/kim.png"}
                />
            </Box>
            <Box>
                <PostSummaryBody {...props}/>
            </Box>
        </CBox>
    );
}
