import {styled} from "@mui/material/styles";
import Box, {BoxProps} from "@/stateless-container/base/Box";
import Text from "@/stateless-container/base/Text";

export interface TextBgBoxProps extends BoxProps {
    size: number
    text: string
    full?: boolean
}

function getByteLength(statement: string) {
    let ret = 0
    for (let i = 0; i < statement.length; i++) {
        ret += (statement.charCodeAt(i) > 128) ? 2 : 1
    }
    return ret

}

function BoxOverride(props: TextBgBoxProps) {
    return (
        <Box {...props}>
            &nbsp;{props.text}&nbsp;
        </Box>
    )
}

const SimpleLogo = styled(BoxOverride)`
  background-color: ${props => props.theme.fontColor.primary.main};
  color: ${props => props.theme.bg.primary.main};
  padding: 2px 0px 2px 0px;
  text-align: center;
  font-weight: 600;
  border-radius: 4px;
  font-size: ${props => props.size + "px"};
  width: ${props => {
    if (props.full) return '100%'
    let size = getByteLength(props.text) * (props.size / 2) + props.size
    return size + "px"
  }};
`


export default SimpleLogo
