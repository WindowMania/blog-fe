import Box, {CBox} from "@/stateless-container/base/Box"
import UserIntroCard from "@/stateless-container/advanced/UserIntroCard";
import BlogHeaderMenu from "@/statefull-container/BlogHeaderMenu";
import PostSummaryBody from "@/statefull-container/PostSummaryBody";
import {styled} from "@mui/material/styles";
import TagSimpleTextMenu from "@/statefull-container/TagSimpleTextMenu";
import ChipViewer from "@/stateless-container/advanced/chip/ChipViewer";
import {TagStatistics} from "@/repository/post";


export interface Props {
    initPosts: PostModel []
    initCurPage: number
    initPerPage: number
    tags: TagStatistics[]
    pageMode?: "user-home" | "tag-mode"
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

function tagStaticsToItemDataList(tags: TagStatistics[]): ItemData[] {
    return tags.map(t => ({
        id: t.tag,
        viewValue: `${t.tag} (${t.count})`
    }))
}

function UserMode(props: Props) {
    if (props.pageMode !== 'user-home') {
        return null
    }
    return (
        <UserIntroCard
            userName={"kimhan"}
            positionName={"CTO"}
            introScript={"더 좋은 세상을 만들기 위해 고민합니다."}
            profilePictureSrc={"/images/kim.png"}
        />
    )
}

function TagMode(props: Props) {
    if (props.pageMode !== 'tag-mode') {
        return null
    }
    return (
        <ChipViewer chips={["test1", "test12"]} blackList={["All"]}/>
    )
}


export default function Home(props: Props) {

    const tagItems = tagStaticsToItemDataList(props.tags)

    return (
        <Root>
            <Box>
                <BlogHeaderMenu/>
            </Box>

            <Body>
                <Middle>
                    <Box>
                        <UserMode {...props} />
                        <TagMode {...props}/>
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
                    <TagSimpleTextMenu tagItems={tagItems}/>
                </Right>
            </Body>
        </Root>
    );
}
