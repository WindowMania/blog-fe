import Box from "../stateless-container/base/Box"
import Login from "../statefull-container/templates/LoginPage"

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