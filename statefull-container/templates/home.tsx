import Box, {CBox} from "@/stateless-container/base/Box"
import UserIntroCard from "@/stateless-container/advanced/UserIntroCard";
import BlogHeaderMenu from "@/statefull-container/BlogHeaderMenu";
import PostSummaryBody from "@/statefull-container/PostSummaryBody";
import {styled} from "@mui/material/styles";
import TagSimpleTextMenu from "@/statefull-container/TagSimpleTextMenu";


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
  margin-top: 48px;
`

const Right = styled(CBox)`
  margin-left: 64px;
  margin-right: auto;
  height: 100vh;
  margin-top: 280px;
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
                    <TagSimpleTextMenu/>
                </Right>

            </Body>
        </Root>
    );
}
