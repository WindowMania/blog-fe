import Box, {CBox} from "../stateless-container/base/Box"
import type {NextPage} from 'next';
import styled from "@emotion/styled";

const Root = styled(CBox)`
  background: aqua;
  min-height: 100vh;
`

const Header = styled(Box)`
  background: black;
  height: 6rem;
`

const Body = styled(Box)`
  background: white;
`

const SideMenu = styled(Box)`
  background: blueviolet;
`

const Main = styled(Box)`
  background: blue;
`

const Home: NextPage = () => {
    return (
        <Root>
            <Header> header...</Header>
            <Body>
                <SideMenu>
                    11
                </SideMenu>
                <Main>
                    main..
                </Main>
            </Body>
            user...
        </Root>
    );
};

export default Home;