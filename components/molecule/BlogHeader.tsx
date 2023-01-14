import React, {useState} from "react";
import {styled} from "@mui/material/styles"
import {Brightness7, Brightness4} from "@mui/icons-material"

import Box from "@/components/atom/Box"
import Menu, {MenuItemComponent} from "@/components/atom/Menu"
import Avatar from "@/components/atom/Avatar";


export interface Props {
    menuItems: MenuItem []
    onClickMenu: (item: MenuItem) => Promise<void>
    defaultTheme?: ThemeToggleType
    onClickThemeIcon?: (t: ThemeToggleType) => void
}

const Root = styled(Box)`
  background-color: ${props => props.theme.bg.primary.main};
  position: sticky;
  min-width: 100vw;
  max-width: 100vw;
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
  margin-right: 32px;
`

const BlogMenuItem = styled(Item)``

function BlogHeaderMenu(props: Props) {
    const menuItems = props.menuItems
    const [theme, setTheme] = React.useState<ThemeToggleType>(props.defaultTheme || 'light')

    const handleMenuClick = React.useCallback(async (item: MenuItem) => {
        await props.onClickMenu(item)
    }, [props.onClickMenu])

    const handleThemeClick = React.useCallback((t: ThemeToggleType) => {
        props.onClickThemeIcon?.(t)
    }, [props?.onClickThemeIcon])

    const handleHomeIconClick = React.useCallback(async (e: any) => {
        e.stopPropagation()
        await props.onClickMenu("Home")
    }, [props.onClickMenu])

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
                <ThemeToggleIcon onChangeType={handleThemeClick} type={theme}/>
            </ThemeToggleItem>

            <BlogMenuItem>
                <ProfileIcon menuItems={menuItems} onMenuItemClick={handleMenuClick}/>
            </BlogMenuItem>
        </Root>
    )
}

export default BlogHeaderMenu;

///////////////////////////////////////////////////////////////////////////////////////////////////////////

export type ThemeToggleType = "light" | "dark"

function ThemeToggleIcon(props: {
    onChangeType?: (type: ThemeToggleType) => void
    type?: ThemeToggleType
}) {
    const defaultType = props.type ?? "light"
    const [type, setType] = useState<ThemeToggleType>(defaultType)

    function onClickChange() {
        const nextType = type === "light" ? "dark" : "light"
        setType(nextType)
        props.onChangeType?.(nextType)
    }

    return (
        <Box onClick={onClickChange} fontSize={"32px"}>
            {type === "light" ? <Brightness7 fontSize={'large'}/> : <Brightness4 fontSize={'large'}/>}
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
  width: ${props => props.theme.spacing(10)};
`


function ProfileIcon(props: {
    hrefImage?: string
    menuItems: MenuItem []
    onMenuItemClick: (opt: string) => void
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const covertMenuItems = React.useCallback((i: MenuItem) => {
        switch (i) {
            case "Home":
                return "Home"
            case "Login":
                return "로그인"
            case "PostWrite":
                return "글 쓰기"
            case "Setting":
                return "설정"
            case "Logout":
                return "로그아웃"
            default:
                return i
        }
    }, [])

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
                            {covertMenuItems(option)}
                        </AvatarMenuItem>
                    )
                }
            </Menu>
        </>
    )

}



