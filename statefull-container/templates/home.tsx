import Box, {CBox} from "@/stateless-container/base/Box"
import UserIntroCard from "@/stateless-container/advanced/UserIntroCard";
import BlogHeaderMenu from "@/statefull-container/advanced/BlogHeaderMenu";
import PostSummaryBody, {PostSearchCondition} from "@/statefull-container/advanced/PostSummaryBody";
import {styled} from "@mui/material/styles";
import TagSimpleTextMenu from "@/statefull-container/advanced/TagSimpleTextMenu";
import PostRepository, {TagStatistics} from "@/repository/post";
import ChipToggleList from "@/stateless-container/advanced/chip/ChipToggleList";
import {useState} from "react";
import Text from "@/stateless-container/base/Text";

import Footer from "@/stateless-container/advanced/Footer";
import useMyRouter from "@/hooks/useMyRouter";


type PageMode = "user-home" | "tag-mode"

export interface Props {
    initPosts: PostModel []
    search: PostSearchCondition
    tags: TagStatistics[]
    pageMode: PageMode
}


const Root = styled(CBox)`
  background-color: ${props => props.theme.bg.primary.main};
  color: ${props => props.theme.fontColor.primary.main};
`

const Body = styled(Box)`
  margin-bottom: 1rem;
`

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
            userName={"권영복"}
            positionName={"dev"}
            introScript={"기술을 배우고, 적용 하고, 정리 합니다."}
            profilePictureSrc={"/images/kim.png"}
        />
    )
}

function TagMode(props: {
    pageMode: PageMode,
    tags: ItemData [],
    initSelectedIdList: string [],
    onChangeSelectedTags: (idList: string[]) => Promise<void>
}) {
    if (props.pageMode !== 'tag-mode') {
        return null
    }

    async function onChangeSelected(idList: string[]) {
        await props.onChangeSelectedTags(idList)
    }

    return (
        <CBox width={"100%"} padding={"16px"}>
            <Box ml={1} mb={2}>
                <Text fontWeight={600} variant={"h6"}>Tag 리스트</Text>
            </Box>

            <Box mb={3}>
                <ChipToggleList
                    blackIdList={["All"]}
                    onChangeSelectedList={onChangeSelected}
                    initSelectedIdList={props.initSelectedIdList.filter(t => t.length >= 1)}
                    chips={props.tags}/>
            </Box>
        </CBox>
    )
}


export default function Home(props: Props) {

    const [posts, setPosts] = useState<PostModel []>(props.initPosts)
    const [search, setSearch] = useState<PostSearchCondition>(props.search)
    const [isEnd, setIsEnd] = useState<boolean>(false)
    const {shallowReplace} = useMyRouter()
    const tagItems = tagStaticsToItemDataList(props.tags)


    async function handleTags(idList: string[]) {
        const defaultPage = 1
        const defaultPerPage = 10
        const loadedPosts = await PostRepository.getPosts({
            curPage: defaultPage,
            perPage: defaultPerPage,
            tags: idList
        })

        setPosts([...loadedPosts])
        setSearch({curPage: defaultPage, perPage: defaultPerPage, tags: idList})
        setIsEnd(loadedPosts.length < defaultPerPage)
        await shallowReplace("TAG_HOME", {ids: idList})
    }

    async function onScrollEnd() {
        if (isEnd) return
        const nextPage = search.curPage + 1
        const loadedPosts = await PostRepository.getPosts({
            curPage: nextPage,
            perPage: search.perPage,
            tags: search.tags
        })
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
                            initSelectedIdList={search.tags}
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
                    {
                        props.pageMode === "user-home" &&
                        <TagSimpleTextMenu tagItems={tagItems}/>
                    }
                </Right>
            </Body>

            {isEnd && <Footer/>}
        </Root>
    );
}
