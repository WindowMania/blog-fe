import Box, {CBox} from "@/stateless-container/base/Box";
import {styled} from "@mui/material/styles";
import Text from '@/stateless-container/base/Text'
import Divider from "@/stateless-container/base/Divider";
import Tag from "@/stateless-container/advanced/Tag"
import {useState} from "react";

export interface Props {
    post: PostModel
    onClickTitle: (postId: string) => Promise<void>
}

const Root = styled(CBox)`
  width: 100%;
  min-width: 720px;
  background-color: white;
  padding: 16px;
`

const Item = styled(Box)`
  margin-top: 8px;
`

const Title = styled(Text)`
  font-size: 32px;
  font-weight: 600;
  color: ${props => props.theme.fontColor.primary.main};

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

const Tags = styled(Item)`
  padding: 4px;
`

function getSummary(post: PostModel) {
    const target = post.body.split('.')[0]
    const cleanText = target.replace(/<\/?[^>]+(>|$)/g, "");
    return cleanText
}


export default function PostSummaryCard(props: Props) {

    async function handleClickTag(tag: string) {
        console.log(tag)
    }

    const [title, setTitle] = useState<string>(props.post.title)
    const [createdAt, setCreatedAt] = useState<string>(props.post.created_at.split('T')[0])
    const [summary, setSummary] = useState<string>(getSummary(props.post))
    const [tags, setTags] = useState<string[]>(props.post.tags)


    const onClickTitle = async (e: any) => {
        e.stopPropagation()
        await props.onClickTitle(props.post.id)
    }

    return (
        <Root>
            <Item mb={0.5} onClick={onClickTitle}>
                <Title>{title}</Title>
            </Item>

            <Item>
                <CreatedAt>{createdAt} 작성</CreatedAt>
            </Item>

            <Item>
                <Summary>{summary}</Summary>
            </Item>

            <Tags mb={4}>
                {
                    tags.map((tag) =>
                        <Tag key={tag} tag={tag} onClick={handleClickTag}/>)
                }
            </Tags>

            <Divider/>
        </Root>
    )
}
