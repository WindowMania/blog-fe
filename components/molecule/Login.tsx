import Box, {CBox} from "@/components/atom/Box";
import Text from "@/components/atom/Text";
import styled from "@emotion/styled";
import TextInputBox from "@/components/atom/TextInputBox";
import Button from "@/components/atom/Button";
import LoginOAuthIcon, {OAuthContext} from "@/components/molecule/LoginOAuthIcon";
import GoogleLoginLogo from "@/public/svg/google_icon.svg";
import GithubLoginLogo from "@/public/svg/github_icon.svg";
import {DividerText} from "@/components/atom/Divider";


class GithubOAuthContext implements OAuthContext {
    get_client_id(): string {
        return "af25e309d8d0219d5e43";
    }

    get_platform(): string {
        return "github";
    }

    get_url(): string {
        return `https://github.com/login/oauth/authorize?client_id=${this.get_client_id()}`;
    }
}

class GoogleOAuthContext implements OAuthContext {
    get_client_id(): string {
        return "157841089521-n4qi1ohapk3qh9a2i9me3482v9909j8p.apps.googleusercontent.com";
    }

    get_platform(): string {
        return "google";
    }

    get_url(): string {
        const client_id = this.get_client_id()
        const redirect_uri = "http://localhost:3000/callback?platform=google"
        const scope = "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
        return `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirect_uri}&scope=${scope}&response_type=code&client_id=${client_id}`;
    }
}

const github_oauth_ctx = new GithubOAuthContext()
const google_oauth_ctx = new GoogleOAuthContext()

export interface Props {
    title?: string
    buttonName?: string
    onGoogleLogin?: (success: boolean, access_token?: string) => Promise<void>
}

const Root = styled(CBox)`
  padding: 1rem;
  align-items: center;
  width: 100%;
  border: black solid 1px;
`

const Header = styled(CBox)`
  align-items: center;
  width: 100%;
`

const Body = styled(CBox)`
  align-items: center;
  width: 100%;
`

const BodyItem = styled(Box)`
  width: 100%;
`

const SubmitBtn = styled(Button)`
  margin-top: 12px;
  margin-bottom: 8px;
  height: 3rem;
  font-size: 1rem;
`

/*
* https://www.npmjs.com/package/@react-oauth/google 구글 로그인 문서
* */


export default function Login(props: Props) {

    return (
        <Root>
            <Header>
                <Text variant={"h5"}> {props.title ?? "로그인"} </Text>
            </Header>
            <Body>
                <BodyItem>
                    <TextInputBox
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                </BodyItem>

                <BodyItem>
                    <TextInputBox
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                </BodyItem>

                <BodyItem>
                    <Button variant={"text"}>비밀번호를 잊으셨나요?</Button>
                </BodyItem>

                <BodyItem>
                    <SubmitBtn  fullWidth type={"submit"} variant="contained">
                        {props.buttonName ?? "로그인"}
                    </SubmitBtn>
                </BodyItem>

                <BodyItem>
                    <Box ml={1} mt={1.5}>
                        <Text fontSize={"8px"}> 계정이 없으신가요? </Text>
                    </Box>
                    <Box>
                        <Button variant={"text"}>회원가입</Button>
                    </Box>
                </BodyItem>
                <BodyItem mt={1}>
                    <DividerText flexItem={true} text={"외부 서비스로 로그인"}/>
                </BodyItem>

                <BodyItem mt={2}>
                    <Box ml={'auto'} mr={1}>
                        <LoginOAuthIcon oauth_context={github_oauth_ctx}>
                            <GithubLoginLogo/>
                        </LoginOAuthIcon>
                    </Box>
                    <Box mr={'auto'}>
                        <LoginOAuthIcon oauth_context={google_oauth_ctx}>
                            <GoogleLoginLogo/>
                        </LoginOAuthIcon>
                    </Box>
                </BodyItem>
            </Body>
        </Root>
    )
}