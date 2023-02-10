import React, {useContext, useState} from "react";
import {styled} from "@mui/material/styles"
import {Brightness7, Brightness4, Bookmarks, AutoStories} from "@mui/icons-material"


import Box from "@/stateless-container/base/Box"
import Menu, {MenuItemComponent} from "@/stateless-container/base/Menu"
import Avatar from "@/stateless-container/base/Avatar";
import {ThemeMode} from "@/hooks/useMyTheme";
import {ThemeContext} from "@/provider/CustomThemeProvider";
import {useMenu} from "@/hooks/useMenu";

export interface Props {
    menuItems: MenuItem []
    onClickMenu: (item: MenuItem) => Promise<void>
    onClickThemeIcon?: (t: ThemeMode) => void
    onClickTagIcon?: () => Promise<void>
    onClickSeriesIcon?: () => Promise<void>
}

const Root = styled(Box)`
  background-color: ${props => props.theme.bg.secondary.main};
  position: sticky;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.border.primary.main};
  min-height: 80px;
  max-height: 80px;
`

const Item = styled(Box)`
  font-size: 32px;
  margin-top: auto;
  margin-bottom: auto;
  border-radius: 6px;

  &:hover {
    cursor: pointer;
  }

`

const LogoItem = styled(Item)`
  font-family: 'Nanum Myeongjo', serif;
  font-weight: 800;
`

const ThemeToggleItem = styled(Item)`
  margin-left: auto;
  margin-right: 16px;
`

const TagItem = styled(Item)`
  margin-right: 16px;
`
const SeriesItem = styled(Item)`
  margin-right: 16px;
`

const BlogMenuItem = styled(Item)``

function BlogHeaderMenu(props: Props) {
    const menuItems = props.menuItems
    const {mode, onChangeThemeMode} = useContext(ThemeContext)
    const [type, setType] = useState<ThemeMode>(mode)

    const handleMenuClick = React.useCallback(async (item: MenuItem) => {
        await props.onClickMenu(item)
    }, [props.onClickMenu])

    const handleHomeIconClick = React.useCallback(async (e: any) => {
        e.stopPropagation()
        await props.onClickMenu("Home")
    }, [props.onClickMenu])


    async function onClickTag() {
        await props.onClickTagIcon?.()
    }

    async function onClickSeries() {
        await props.onClickSeriesIcon?.()
    }


    function onClickTheme() {
        const nextType = type === "light" ? "dark" : "light"
        setType(nextType)
        onChangeThemeMode(nextType)
    }

    return (
        <Root>
            <LogoItem onClick={handleHomeIconClick}>
                <Box>
                    <img alt={"logo"} height={"48px"} src={"/images/pizza-48.png"}/>
                </Box>
                <Box ml={0.5}>
                    blog.kyb
                </Box>
            </LogoItem>


            <ThemeToggleItem>
                <ThemeToggleIcon type={mode}
                                 onClick={onClickTheme}
                />
            </ThemeToggleItem>

            <TagItem>
                <Bookmarks onClick={onClickTag}/>
            </TagItem>

            <SeriesItem>
                <AutoStories onClick={onClickSeries}/>
            </SeriesItem>

            <BlogMenuItem>
                <ProfileIcon menuItems={menuItems} onMenuItemClick={handleMenuClick}/>
            </BlogMenuItem>
        </Root>
    )
}

export default BlogHeaderMenu;

///////////////////////////////////////////////////////////////////////////////////////////////////////////

function ThemeToggleIcon(props: {
    type: ThemeMode
    onClick: () => void
}) {
    function onClick() {
        props.onClick()
    }

    return (
        <Box onClick={onClick} fontSize={"32px"}>
            {props.type === "light" ? <Brightness7 fontSize={'large'}/> : <Brightness4 fontSize={'large'}/>}
        </Box>
    )
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////


const ProfileAvatar = styled(Box)`
  color: ${props => props.theme.palette.secondary.main};

  &:hover {
    color: ${props => props.theme.palette.primary.main};
    cursor: pointer;
  }

  & > * {
    margin: ${props => props.theme.spacing(1)};
  }
`

const AvatarMenuItem = styled(MenuItemComponent)`
  font-size: 16px;
  width: ${props => props.theme.spacing(15)};
`


function ProfileIcon(props: {
    hrefImage?: string
    menuItems: MenuItem []
    onMenuItemClick: (opt: string) => void
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const {translateMenuItem} = useMenu()

    function handleClose() {
        setAnchorEl(null)
    }

    function handleChange(opt: string) {
        opt && props.onMenuItemClick(opt);
        handleClose()
    }

    function handleClick(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
        event.preventDefault()
    }

    return (
        <>
            <ProfileAvatar onClick={handleClick}>
                <Avatar src={props.hrefImage}/>
            </ProfileAvatar>

            <Menu
                id="long-menu"
                elevation={2}
                open={anchorEl !== null}
                anchorEl={anchorEl}
                onClose={() => handleClose()}
            >
                {
                    props.menuItems.map((option) =>
                        <AvatarMenuItem key={option} onClick={() => handleChange(option)}>
                            {translateMenuItem(option)}
                        </AvatarMenuItem>
                    )
                }
            </Menu>
        </>
    )
}



