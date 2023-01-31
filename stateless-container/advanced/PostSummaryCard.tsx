import {styled} from "@mui/material/styles";

import Box, {CBox} from "@/stateless-container/base/Box";
import Text from '@/stateless-container/base/Text'
import Divider from "@/stateless-container/base/Divider";
import ChipViewer from "@/stateless-container/advanced/chip/ChipViewer";

export interface Props {
    post: PostModel
    onClickTitle: (postId: string) => Promise<void>
    onClickEdit?: (postId: string) => Promise<void>
}

const Root = styled(CBox)`
  width: 100%;
  min-width: 800px;
  padding: 16px;
`

const Item = styled(Box)`
  margin-top: 8px;
`

const Title = styled(Text)`
  font-size: 32px;
  font-weight: 600;
  
  &:hover {
    cursor: pointer;
  }
`

const Summary = styled(Text)`
  font-size: 16px;
  color: ${props => props.theme.fontColor.secondary.main};
`

const CreatedAt = styled(Text)`
  font-size: 14px;
  font-weight: 400;
  color: ${props => props.theme.fontColor.primary.summary};
`

const Edit = styled(Text)`
  font-size: 14px;
  font-weight: 400;
  margin-left: 8px;
  color: ${props => props.theme.fontColor.primary.summary};

  &:hover {
    cursor: pointer;
    color: ${props => props.theme.fontColor.primary.main};
  }
`

function getSummary(post: PostModel) {
    const target = post.body.split('.')[0]
    return target.replace(/<\/?[^>]+(>|$)/g, "");
}


export default function PostSummaryCard(props: Props) {

    async function handleClickTag(tag: string) {
        console.log(tag)
    }

    const post = props.post
    const title = post.title
    const createdAt = post.created_at.split('T')[0]
    const summary = getSummary(post)
    const tags = post.tags

    const onClickTitle = async (e: any) => {
        e.stopPropagation()
        await props.onClickTitle(props.post.id)
    }

    const onClickEdit = async () => {
        await props.onClickEdit?.(props.post.id)
    }

    return (
        <>
            <Divider/>
            <Root>
                <Item mb={0.5} onClick={onClickTitle}>
                    <Title>{title}</Title>
                </Item>

                <Item>
                    <CreatedAt>{createdAt} 작성</CreatedAt>
                    {props.onClickEdit !== undefined ? <Edit onClick={onClickEdit}>수정</Edit> : ""}
                </Item>

                <Item>
                    <Summary>{summary}</Summary>
                </Item>

                <Item mb={4}>
                    <ChipViewer chips={tags} blackList={['All']}/>
                </Item>
            </Root>
        </>
    )
}
