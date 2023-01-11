import Box,{CBox} from "@/components/atom/Box";
import Text from '@/components/atom/Text'
import Avatar from "@/components/atom/Avatar";
import {useTheme,styled} from "@mui/material/styles"

export interface Props {
    userName: string
    positionName: string
    profilePictureSrc:string
    introScript?: string
}

const UserIntroduceCardContainer = styled(CBox)`
  background-color: ${props => props.theme.bg.primary.main};
  padding-top: 32px;
  padding-bottom: 32px;
`


const ProfileContainer = styled(Box)``

function UserIntroCard(props: Props) {
    const theme = useTheme()

    return (
        <UserIntroduceCardContainer>
            <CBox ml={"auto"} mr={"auto"}>
                <ProfileContainer>
                    <Box>
                        <Avatar
                            src={props.profilePictureSrc}
                            sx={{width: 65, height: 65}}
                        />
                    </Box>
                    <CBox ml={1} mt={1.5}>
                        <Text fontSize={"16px"} fontWeight={700}>
                            {props.userName}
                        </Text>
                        <Text
                            color={theme.fontColor.primary.summary}
                            mt={0.2} fontSize={"8px"} fontWeight={400}>
                            {props.positionName}
                        </Text>
                    </CBox>
                </ProfileContainer>
                {
                    props.introScript &&
                    <Box mt={1.5}>
                        <Text fontSize={"10px"} whiteSpace={"pre-line"}>
                            {props.introScript}
                        </Text>
                    </Box>
                }
            </CBox>
        </UserIntroduceCardContainer>
    )
}

export default UserIntroCard
