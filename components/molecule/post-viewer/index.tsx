import {styled} from '@mui/material/styles'

import Box, {CBox} from "@/components/atom/Box";
import Text from "@/components/atom/Text";
import TuiViewer from "@/components/molecule/post-viewer/ToastViewer"
import Tag from "@/components/molecule/Tag"
import Divider from "@mui/material/Divider";

export interface Props {
    postContext: PostModel
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


function toStringByFormatting(source: Date, delimiter = '-') {
    function leftPad(value: number) {
        if (value >= 10) {
            return value;
        }
        return `0${value}`;
    }

    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());
    return [year, month, day].join(delimiter);
}

export default function PostViewer(props: Props) {
    const title = props.postContext.title
    const content = props.postContext.content
    const username = props.postContext.username
    const createdAt = props.postContext.createdAt
    const tags = props.postContext.tags

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

            <Divider />

            <ViewerItem>
                <TuiViewer content={content}/>
            </ViewerItem>
        </Root>
    )
}

