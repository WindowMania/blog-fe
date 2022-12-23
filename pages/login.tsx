import Box from "@/components/atom/Box"
import Login from "@/organism/Login"

import type {NextPage} from 'next';

const Home: NextPage = () => {
    return (
        <Box>
            <Box width={"450px"}>
                <Login/>
            </Box>
        </Box>
    );
};

export default Home;