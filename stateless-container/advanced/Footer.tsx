import {styled} from "@mui/material/styles";

import Box from "@/stateless-container/base/Box";
import Text from "@/stateless-container/base/Text";

export interface Props {
    url?: string
}


const Root = styled(Box)`
  background-color: ${props => props.theme.bg.primary.main};
  width: 100%;
  border-top: 1px solid ${props => props.theme.border.primary.main};
  min-height: 80px;
  max-height: 80px;
  text-align: center;
`


const TextBox = styled(Box)`
  margin: auto;
  color: ${props => props.theme.fontColor.secondary.main};
`


const Link = styled("a")`
  text-decoration: underline;
  color: inherit;
  &:hover, &:focus, &:active {
    text-decoration: underline;
    color: inherit;
  }
`


export default function Footer(props: Props) {
    const url = props.url || "https://github.com/WindowMania"
    return (
        <Root>
            <TextBox margin={"auto"}>
                <Text>
                    © kyb.blog, Built with <Link href={url} target="_blank"> here </Link>
                </Text>

            </TextBox>
        </Root>
    )
}