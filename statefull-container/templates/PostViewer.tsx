import {styled} from '@mui/material/styles'
import {useRouter} from "next/router";

import Box, {CBox} from "@/stateless-container/base/Box";
import Text from "@/stateless-container/base/Text";
import TuiViewer from "@/stateless-container/advanced/toast/ToastViewer"
import Divider from "@/stateless-container/base/Divider";
import ChipViewer from "@/stateless-container/advanced/chip/ChipViewer";
import SeriesNavigation from "@/statefull-container/advanced/SeriesNavigation";
import {useEffect, useState} from "react";
import PostRepository from "@/repository/post";
import useMyRouter from "@/hooks/useMyRouter";


const Root = styled(CBox)`
  min-width: 800px;
  width: 100%;
`
const Item = styled(Box)`
  margin-bottom: 4px;
  padding-left: 16px;
  padding-right: 16px;
`

const TitleItem = styled(Item)`
  margin-bottom: 24px;
`

const PostInfoItem = styled(Item)``

const Title = styled(Text)`
  font-size: 48px;
  font-weight: 800;
`

const UserNameBox = styled(Box)`
  font-weight: 800;
  font-size: 16px;
  margin-right: 8px;
  padding-left: 8px;

  &:hover {
    cursor: pointer;
  }
`

const CreatedAtBox = styled(Box)`
  font-size: 16px;
`

const ViewerItem = styled(Item)`
  height: 100%;
  min-height: 100vh;
`

const TagItem = styled(Item)`
  margin-bottom: 24px;
`

const SeriesNavItem = styled(Item)`
  margin-top: 16px;
`


function toStringByFormatting(source: string) {
    return source.split("T")[0]
}


type SeriesNav = {
    title: string
    items: ItemData []
}

export default function PostViewer(props: {
    post: PostModel
}) {

    const [post, setPost] = useState<PostModel>(props.post)
    const {shallowReplace, route} = useMyRouter()
    const [seriesNavList, setSeriesNavList] = useState<SeriesNav []>([])

    useEffect(() => {
        PostRepository.getSeriesListByPostId(post.id).then((r) => {
            const loadedSeriesNavList = r.map(seriesDto => ({
                title: seriesDto.title,
                items: seriesDto.posts.map((post) => ({
                    id: post.id,
                    viewValue: post.title
                }))
            }))
            setSeriesNavList([...loadedSeriesNavList])
        })
    }, [post])

    async function handleClickTag(tag: string) {
        await route("TAG_HOME", {ids: [tag]})
    }

    async function onClickSeriesNav(postId: string) {
        const loadPost = await PostRepository.getPost(postId)
        loadPost && setPost({...loadPost})
        loadPost && await shallowReplace("POST_READ", {id: postId})
    }

    return (
        <Root>
            <TitleItem>
                <Title variant={"h1"}>{post.title}</Title>
            </TitleItem>

            <PostInfoItem>
                <UserNameBox>{post.username}</UserNameBox>
                <CreatedAtBox>{toStringByFormatting(post.created_at)}</CreatedAtBox>
            </PostInfoItem>

            <TagItem>
                <ChipViewer onClickChip={handleClickTag} chips={post.tags} blackList={['All']}/>
            </TagItem>
            <Divider/>
            {
                seriesNavList.map((seriesNav, idx) =>
                    <SeriesNavItem key={idx}>
                        <SeriesNavigation
                            currentPostId={post.id}
                            onClickItem={onClickSeriesNav}
                            seriesTitle={seriesNav.title} items={seriesNav.items}/>
                    </SeriesNavItem>
                )
            }
            <ViewerItem>
                <TuiViewer content={post.body}/>
            </ViewerItem>
        </Root>
    )
}

