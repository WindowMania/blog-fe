import Box from "@/components/atom/Box"
import {styled} from "@mui/material/styles"
import React, {useState} from "react";
import IconButton from "@/components/atom/IconButton";
import {Search, Home, MessageOutlined, GitHub, CreateOutlined, Brightness7, Brightness4} from "@mui/icons-material"
import Menu, {MenuItem} from "@/components/atom/Menu"
import Avatar from "@/components/atom/Avatar";

export interface Props {
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
    return (
        <Root>
            <LogoItem>
                <Box>
                    <img height={"48px"} src={"/images/pizza-48.png"}/>
                </Box>
                <Box ml={0.5}>
                    blog.kyb
                </Box>
            </LogoItem>

            <ThemeToggleItem>
                <ThemeToggleIcon onChangeType={(t) => console.log(t)} type="light"/>
            </ThemeToggleItem>

            <BlogMenuItem>
                <ProfileIcon menuItemNames={["login"]} onMenuItemClick={(opt: string) => console.log(opt)}/>
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

const AvatarMenuItem = styled(MenuItem)`
  font-size: 16px;
  width: ${props => props.theme.spacing(10)};
`


function ProfileIcon(props: {
    hrefImage?: string
    menuItemNames: string []
    onMenuItemClick: (opt: string) => void
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuItemNames = props.menuItemNames ?? ["Login"]

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
    };

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
                    menuItemNames.map((option) =>
                        <AvatarMenuItem key={option} onClick={() => handleChange(option)}>
                            {option}
                        </AvatarMenuItem>
                    )
                }
            </Menu>
        </>
    )

}



