import Box, {CBox} from "@/stateless-container/base/Box"
import type {NextPage} from 'next';
import UserIntroCard from "@/stateless-container/advanced/UserIntroCard";
import BlogHeaderMenu from "@/statefull-container/BlogHeaderMenu";
import PostSummaryBody from "@/statefull-container/PostSummaryBody";
import useLogin from "@/hooks/useLogin";

const Home: NextPage = () => {
    const {isLogin, accessKey} = useLogin()
    console.log("보자,111111", isLogin, accessKey)

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
                <PostSummaryBody/>
            </Box>

        </CBox>
    );
};

export default Home;