import Box, {CBox} from "@/stateless-container/base/Box";
import Text from "@/stateless-container/base/Text"


import {styled} from "@mui/material";

export interface Props {
    title: string
    items: ItemData []
    onClickItem: (id: string) => Promise<void>
}

const Root = styled(CBox)``

const TitleBox = styled(Box)`
  margin-bottom: 16px;
`
const TitleText = styled(Text)`
  font-weight: 600;
  font-size: 18px;
`

const MenuItem = styled(Box)`
  margin-bottom: 8px;

`

const MenuText = styled(Text)`
  color: ${props => props.theme.fontColor.secondary.main};
  font-size: 14px;

  &:hover {
    cursor: pointer;
    color: ${props => props.theme.fontColor.primary.main};
  }
`


export default function SimpleTextMenu(props: Props) {

    async function handleOnClickItem(e: any, id: string) {
        e.stopPropagation()
        await props.onClickItem(id)
    }

    return (
        <Root>
            <TitleBox>
                <TitleText>
                    {props.title}
                </TitleText>
            </TitleBox>
            {
                props.items.map((item) =>
                    <MenuItem key={item.id} onClick={e => handleOnClickItem(e, item.id)}>
                        <MenuText>{item.viewValue}</MenuText>
                    </MenuItem>
                )
            }
        </Root>
    )
}