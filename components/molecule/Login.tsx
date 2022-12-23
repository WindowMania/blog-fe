import {CBox} from "@/components/atom/Box";
import Text from "@/components/atom/Text";
import styled from "@emotion/styled";
import TextInputBox from "@/components/atom/TextInputBox";
import Button from "@/components/atom/Button";
import {GoogleLogin} from '@react-oauth/google';

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

const SubmitBtn = styled(Button)`
  margin-top: 12px;
  margin-bottom: 8px;
  height: 3rem;
`

/*
* https://www.npmjs.com/package/@react-oauth/google 구글 로그인 문서
* */


export default function Login(props: Props) {

    return (
        <Root>
            <Header>
                <Text variant={"h5"}> {props.title ?? "Login"} </Text>
            </Header>
            <Body>
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
                <SubmitBtn fullWidth type={"submit"} variant="contained">
                    {props.buttonName ?? "Login"}
                </SubmitBtn>

                <GoogleLogin
                    type={"icon"}
                    onSuccess={credentialResponse => {
                        props.onGoogleLogin?.(true, credentialResponse.credential).then()
                    }}
                    onError={() => {
                        props.onGoogleLogin?.(false).then()
                    }}
                />
            </Body>
        </Root>
    )
}