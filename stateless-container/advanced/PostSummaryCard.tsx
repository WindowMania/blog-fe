import Box, {CBox} from "@/stateless-container/base/Box";
import {styled} from "@mui/material/styles";
import Text from '@/stateless-container/base/Text'
import Divider from "@/stateless-container/base/Divider";
import Tag from "@/stateless-container/advanced/Tag"

export interface Props {
    tags: string []
    title: string
    summary: string
    createdAt: string
    updatedAt: string
}

const Root = styled(CBox)`
  width: 100%;
    // background-color: ${props => props.theme.bg.secondary.main};
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


export default function PostSummaryCard(props: Props) {

    async function handleClickTag(tag: string) {
        console.log(tag)
    }

    return (
        <Root>
            <Item mb={0.5}>
                <Title>
                    {props.title}
                </Title>
            </Item>

            <Item>
                <CreatedAt>
                    {props.createdAt} 작성
                </CreatedAt>
            </Item>

            <Item>
                <Summary>
                    {props.summary}
                </Summary>
            </Item>

            <Tags mb={4}>
                {
                    props.tags.map((tag) =>
                        <Tag key={tag} tag={tag} onClick={handleClickTag}/>)
                }
            </Tags>

            <Divider/>
        </Root>
    )
}
