import Box,{CBox} from "@/components/atom/Box"
import type {NextPage} from 'next';
import UserIntroCard from "@/components/molecule/UserIntroCard";
import BlogHeaderMenu from "@/components/molecule/BlogHeader";

const Home: NextPage = () => {
    return (
        <CBox width={"100%"}>
            <Box>
                <BlogHeaderMenu />
            </Box>

            <Box>
                <UserIntroCard
                    userName={"kimhan"}
                    positionName={"CTO"}
                    introScript={"더 좋은 세상을 만들기 위해 고민합니다."}
                    profilePictureSrc={"/images/kim.png"}
                />
            </Box>

        </CBox>
    );
};

export default Home;