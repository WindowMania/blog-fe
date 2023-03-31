import Box, {CBox} from "@/stateless-container/base/Box";
import Text from '@/stateless-container/base/Text'
import Avatar from "@/stateless-container/base/Avatar";
import {styled} from "@mui/material/styles"
import {GitHub, Mail} from "@mui/icons-material";


export interface Props {
    userName: string
    positionName: string
    profilePictureSrc: string
    introScript?: string
}

const UserIntroduceCardContainer = styled(CBox)`
  padding-top: 16px;
  padding-bottom: 16px;
  width: 100%;
`


const ProfileContainer = styled(Box)`
  margin-bottom: 48px;
`
const PictureContainer = styled(Box)``

const MiddleContainer = styled(CBox)`
  margin-top: auto;
  margin-left: 12px;
`

const IntroText = styled(Text)`
  font-family: 'Nanum Myeongjo', serif;
  font-weight: 600;
  margin-top: 2px;
  margin-bottom: 4px;
  font-size: 16px;
  white-space: pre-line;
`

const IconBox = styled(Box)`
  color: ${props => props.theme.fontColor.primary.main};
  margin-right: 8px;
  &:hover {
    cursor: pointer;
  }
`


function onClickGithub() {
    if (typeof window !== 'undefined') {
        window.open("https://github.com/yogru")
    }
}

function onClickMail() {
    if (typeof window !== 'undefined') {
        const mailtoDom = document.createElement('a');
        const mail = "kybdev@gmail.com"
        mailtoDom.setAttribute('href', `mailto:${mail}?subject=메일의 제목을 넣습니다`);
        mailtoDom.click();
    }
}


function UserIntroCard(props: Props) {
    return (
        <UserIntroduceCardContainer>
            <CBox>
                <ProfileContainer>
                    <PictureContainer>
                        <Avatar src={props.profilePictureSrc}
                                sx={{width: 128, height: 128}}
                        />
                    </PictureContainer>

                    <MiddleContainer>
                        <Text fontSize={"24px"} fontWeight={700}>
                            {props.userName}
                        </Text>

                        <IntroText>
                            {props.introScript}
                        </IntroText>

                        <Box>
                            <IconBox>
                                <GitHub onClick={onClickGithub}/>
                            </IconBox>
                            <IconBox>
                                <Mail onClick={onClickMail}/>
                            </IconBox>
                        </Box>
                    </MiddleContainer>
                </ProfileContainer>
            </CBox>
        </UserIntroduceCardContainer>
    )
}

export default UserIntroCard
