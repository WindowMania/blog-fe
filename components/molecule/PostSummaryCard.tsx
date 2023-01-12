import Box, {CBox} from "@/components/atom/Box";
import {styled} from "@mui/material/styles";
import Text from '@/components/atom/Text'
import Divider from "@/components/atom/Divider";

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
  background-color:white;
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


const TagBox = styled(Box)`
  border-radius: 14px;
  border: 1px solid ${props => props.theme.border.primary.main};
  margin-right: 8px;
  padding: 6px;
  
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.bg.secondary.main};
  }
`

const TagText = styled(Text)`
  font-size: 12px;
`


export default function PostSummaryCard(props: Props) {

    async function handleClickTag(tag: string) {

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

            <Divider />
        </Root>
    )
}


function Tag(props: {
    tag: string,
    onClick: (tag: string) => Promise<void>
}) {
    function handleOnClick(e: any) {
        e?.stopPropagation()
        props.onClick(props.tag).then(r => r)
    }

    return (
        <TagBox onClick={handleOnClick}>
            <TagText>#{props.tag}</TagText>
        </TagBox>
    )
}