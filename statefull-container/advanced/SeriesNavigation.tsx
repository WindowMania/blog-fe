import {ListItemIcon, styled} from "@mui/material";
import Box, {CBox} from "@/stateless-container/base/Box";
import List from '@mui/material/List';
import ListItemMui from '@mui/material/ListItem';
import ListItemTextMui, {ListItemTextProps} from '@mui/material/ListItemText';
import Text from "@/stateless-container/base/Text";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import SimpleLogo from "@/stateless-container/base/SimpleLogo";

interface ListItemTextMuiProps extends ListItemTextProps {
    selected?: boolean
}

function ListItemText(props: ListItemTextMuiProps) {
    return <ListItemTextMui {...props} />
}


export interface Props {
    seriesTitle: string
    currentPostId: string
    items: ItemData []
    onClickItem: (id: string) => Promise<void>
}

const Root = styled(CBox)`
  width: 100%;
  border-radius: 4px;
  padding: 24px 16px 8px 16px;
  background-color: ${props => props.theme.bg.secondary.main};
`

const ListItemTextStyled = styled(ListItemText)`
  color: ${props => props.selected ? props.theme.fontColor.primary.main : props.theme.fontColor.primary.summary};
  margin-left: ${props => props.selected ? "0px" : "24px"};

  &:hover {
    color: ${props => props.theme.fontColor.primary.main};
    cursor: pointer;
    text-decoration: underline;
  }
`

const ListItemIconStyled = styled(ListItemIcon)`
  color: ${props => props.theme.fontColor.primary.main};
  min-width: 16px;
`

const Title = styled(Text)`
  font-weight: bold;
  font-size: 18px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`


function NavButton(props: {
    item: ItemData
    selected?: boolean
    onClick: (id: string) => Promise<void>
}) {


    return (
        <ListItemMui disablePadding>
            {
                props.selected && <ListItemIconStyled>
                    <ArrowRightIcon/>
                </ListItemIconStyled>
            }
            <ListItemTextStyled
                onClick={async () => await props.onClick(props.item.id)}
                selected={props.selected} primary={props.item.viewValue}/>
        </ListItemMui>
    )
}


export default function SeriesNavigation(props: Props) {
    return (
        <Root>
            <CBox mb={1}>
                <SimpleLogo mb={1} size={18} text={"SERIES"}/>
                <Title> {props.seriesTitle} </Title>
            </CBox>
            <Box mt={-1} width={"100%"}>
                <List>
                    {
                        props.items.map((item) =>
                            <NavButton
                                item={item}
                                onClick={props.onClickItem}
                                key={item.id}
                                selected={props.currentPostId === item.id}
                            />)
                    }
                </List>
            </Box>
        </Root>
    )
}
