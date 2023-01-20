import Box, {CBox} from "@/stateless-container/base/Box"
import UserIntroCard from "@/stateless-container/advanced/UserIntroCard";
import BlogHeaderMenu from "@/statefull-container/BlogHeaderMenu";
import PostSummaryBody from "@/statefull-container/PostSummaryBody";
import {styled} from "@mui/material/styles";


export interface Props {
    initPosts: PostModel []
    initCurPage: number
    initPerPage: number
}

const Root = styled(CBox)``

const Body = styled(Box)``
const Middle = styled(CBox)`
  margin-left: auto;
  margin-right: 0.5rem;
`

const Right = styled(CBox)`
  margin-left: 0.5rem;
  margin-right: auto;
  background-color: black;
  height: 100vh;
`


export default function Home(props: Props) {
    return (
        <Root>
            <Box>
                <BlogHeaderMenu/>
            </Box>

            <Body>

                <Middle>
                    <Box>
                        <UserIntroCard
                            userName={"kimhan"}
                            positionName={"CTO"}
                            introScript={"더 좋은 세상을 만들기 위해 고민합니다."}
                            profilePictureSrc={"/images/kim.png"}
                        />
                    </Box>
                    <Box>
                        <PostSummaryBody
                            perPage={props.initPerPage}
                            curPage={props.initCurPage}
                            posts={props.initPosts}
                        />
                    </Box>
                </Middle>

                <Right>
                    1111111111111111111111
                </Right>

            </Body>
        </Root>
    );
}
