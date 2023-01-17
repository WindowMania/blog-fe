import {styled} from '@mui/material/styles'

import Box, {CBox} from "@/components/atom/Box";
import Text from "@/components/atom/Text";
import TuiViewer from "@/components/molecule/post-viewer/ToastViewer"
import Tag from "@/components/molecule/Tag"
import Divider from "@mui/material/Divider";

export interface Props {
    post: PostModel
}

const Root = styled(CBox)`
  min-width: 500px;
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

  &:hover {
    cursor: pointer;
  }
`

const CreatedAtBox = styled(Box)`
  font-size: 16px;
`

const ViewerItem = styled(Item)`
  //border: 1px solid black;
  height: 100vh;
  min-height: 100vh;
`

const TagItem = styled(Item)`
  margin-bottom: 24px;
`


function toStringByFormatting(source: string, delimiter = '-') {
    return source.split("T")[0]
}

export default function PostViewer(props: Props) {
    const title = props.post.title
    const content = props.post.body
    const username = props.post.username
    const createdAt = props.post.created_at
    const tags = props.post.tags

    async function handleClickTag(tag: string) {
    }


    return (
        <Root>
            <TitleItem>
                <Title variant={"h1"}>{title}</Title>
            </TitleItem>

            <PostInfoItem>
                <UserNameBox>{username}</UserNameBox>
                <CreatedAtBox>{toStringByFormatting(createdAt)}</CreatedAtBox>
            </PostInfoItem>

            <TagItem>
                {
                    tags.map((tag) =>
                        <Tag key={tag} tag={tag} onClick={handleClickTag}/>)
                }
            </TagItem>
            <Divider/>

            <ViewerItem>
                <TuiViewer content={content}/>
            </ViewerItem>
        </Root>
    )
}

