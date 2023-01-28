import Box, {CBox} from "@/stateless-container/base/Box"
import UserIntroCard from "@/stateless-container/advanced/UserIntroCard";
import BlogHeaderMenu from "@/statefull-container/BlogHeaderMenu";
import PostSummaryBody, {PostSearchCondition} from "@/statefull-container/PostSummaryBody";
import {styled} from "@mui/material/styles";
import TagSimpleTextMenu from "@/statefull-container/TagSimpleTextMenu";
import PostRepository, {TagStatistics} from "@/repository/post";
import ChipToggleList from "@/stateless-container/advanced/chip/ChipToggleList";
import {useState} from "react";


type PageMode = "user-home" | "tag-mode"

export interface Props {
    initPosts: PostModel []
    search: PostSearchCondition
    tags: TagStatistics[]
    pageMode: PageMode
}


const Root = styled(CBox)``

const Body = styled(Box)``

const Middle = styled(CBox)`
  margin-left: auto;
  margin-right: 0.5rem;
  margin-top: 48px;
  max-width: 800px;
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

function TagMode(props: {
    pageMode: PageMode,
    tags: ItemData []
    onChangeSelectedTags: (idList: string[]) => Promise<void>
}) {
    if (props.pageMode !== 'tag-mode') {
        return null
    }

    async function onChangeSelected(idList: string[]) {
        await props.onChangeSelectedTags(idList)
    }

    return (
        <Box width={"100%"}>
            <ChipToggleList
                blackIdList={["All"]}
                onChangeSelectedList={onChangeSelected}
                initSelectedIdList={[]}
                chips={props.tags}/>
        </Box>
    )
}


export default function Home(props: Props) {

    const [posts, setPosts] = useState<PostModel []>(props.initPosts)
    const [search, setSearch] = useState<PostSearchCondition>(props.search)
    const [isEnd, setIsEnd] = useState<boolean>(false)

    const tagItems = tagStaticsToItemDataList(props.tags)


    async function handleTags(idList: string[]) {
        const defaultPage = 1
        const defaultPerPage = 10
        const loadedPosts = await PostRepository.getPosts(defaultPage, defaultPerPage, idList)

        setPosts([...loadedPosts])
        setSearch({curPage: defaultPage, perPage: defaultPerPage, tags: idList})
        setIsEnd(loadedPosts.length < defaultPerPage ? true : false)
    }

    async function onScrollEnd() {
        if (isEnd) return

        const nextPage = search.curPage + 1
        const loadedPosts = await PostRepository.getPosts(nextPage, search.perPage, search.tags)
        if (loadedPosts.length >= 1) {
            setSearch({...search, curPage: nextPage})
            setPosts([...posts, ...loadedPosts])
            return
        }
        setIsEnd(true)
    }

    return (
        <Root>
            <Box>
                <BlogHeaderMenu/>
            </Box>

            <Body>
                <Middle>
                    <Box>
                        <UserMode {...props} />

                        <TagMode
                            pageMode={props.pageMode}
                            tags={tagItems}
                            onChangeSelectedTags={handleTags}
                        />
                    </Box>
                    <Box>
                        <PostSummaryBody
                            posts={posts}
                            onScrollEnd={onScrollEnd}
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
