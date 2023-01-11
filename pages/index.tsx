import Box from "@/components/atom/Box"
import type {NextPage} from 'next';
import UserIntroCard from "@/components/molecule/UserIntroCard";

const Home: NextPage = () => {
    return (
        <Box width={"100%"}>
            <UserIntroCard
                userName={"kimhan"}
                positionName={"CTO"}
                introScript={"더 좋은 세상을 만들기 위해 고민합니다."}
            />
        </Box>
    );
};

export default Home;