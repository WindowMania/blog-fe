import {styled} from "@mui/material/styles";
import Text from "@/components/atom/Text";
import Box from "@/components/atom/Box";


const TagText = styled(Text)`
  font-size: 12px;
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

export default function Tag(props:{
    tag: string,
    onClick: (tag: string) => Promise<void>
}){
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