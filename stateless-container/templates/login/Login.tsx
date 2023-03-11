import Box, {CBox} from "../../base/Box";
import Text from "../../base/Text";
import styled from "@emotion/styled";
import TextInputBox from "../../base/TextInputBox";
import Button from "../../base/Button";
import LoginOAuthIcon, {OAuthContext, OAuthLoginResult} from "@/stateless-container/templates/login/LoginOAuthIcon";
import GoogleLoginLogo from "@/public/svg/google_icon.svg";
import GithubLoginLogo from "@/public/svg/github_icon.svg";
import {DividerText} from "../../base/Divider";
import React, {ChangeEvent, useState} from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {OptionsObject, useSnackbar} from 'notistack';


interface MyInputCtx {
    value: string
    error: boolean
    message?: string
}

export interface JoinUserDto {
    email?: string
    password?: string
    nickName?: string
}

const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
// 8~30글자 하나 이상의 문자와 하나 이상의 숫자
const passwordRed = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/


export interface Props {
    title?: string
    buttonName?: string

    onJoinSubmit: (dto: JoinUserDto) => Promise<BasicRestResponse>
    onLogin: (username: string, password: string) => Promise<BasicRestResponse>
    onOAuthLogin: (res: OAuthLoginResult) => Promise<boolean>
    googleOAuthCtx: OAuthContext
    githubOAuthCtx: OAuthContext
}

const Root = styled(CBox)`
  padding: 1rem;
  align-items: center;
  width: 100%;
  //border: black solid 1px;
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

const snackbar_error_default: OptionsObject = {
    variant: "error",
    anchorOrigin: {
        horizontal: "center",
        vertical: "top"
    }
}

interface JoinFormProps {
    onSubmit: (info: JoinUserDto) => Promise<BasicRestResponse>
}

function JoinFormDialogButton(props: JoinFormProps) {
    const [open, setOpen] = React.useState(false)
    const [nickNameCtx, setNickNameCtx] = React.useState<MyInputCtx | null>(null)
    const [emailCtx, setEmailCtx] = React.useState<MyInputCtx | null>(null)
    const [pwdOneCtx, setPwdOneCtx] = React.useState<MyInputCtx | null>(null)
    const [pwdTwoCtx, setPwdTwoCtx] = React.useState<MyInputCtx | null>(null)

    const {enqueueSnackbar} = useSnackbar();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const onChangeNickName = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        e.stopPropagation()
        const value = e.target.value
        let error = false
        let message = ''

        if (value.length < 2) {
            error = true
            message = "닉네임은 두 글자 이상이어야 합니다."
        }

        setNickNameCtx({value, error, message})
    }

    const onChangeEmail = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        e.stopPropagation()
        const value = e.target.value
        let error = false
        let message = ''
        if (!emailReg.test(value)) {
            error = true
            message = "이메일 형식이 맞지 않습니다."
        }
        setEmailCtx({
            value, error, message
        })
    }

    const onChangePwdOne = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        e.stopPropagation()
        const value = e.target.value
        let error = false
        let message = ''

        if (!passwordRed.test(value)) {
            error = true
            message = "8 ~ 30글자 최소 하나의 문자와 하나의 숫자 포함 해야 합니다."
        }

        setPwdOneCtx({
            value, error, message
        })
    }

    const onChangePwdTwo = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        e.stopPropagation()
        const value = e.target.value
        let error = false
        let message = ''

        if (!passwordRed.test(value)) {
            error = true
            message = "8 ~ 30글자 최소 하나의 문자와 하나의 숫자 포함 해야 합니다."
        } else if (!pwdOneCtx || value != pwdOneCtx.value) {
            error = true
            message = "비밀번호가 일치 하지 않습니다."
        }
        setPwdTwoCtx({
                value, error, message
            }
        )
    }


    const handleSubmit = () => {
        let is_empty = false
        if (!nickNameCtx) {
            setNickNameCtx({error: true, message: "반드시 값을 입력 해야 합니다.", value: ""})
            is_empty = true
        }
        if (!emailCtx) {
            setEmailCtx({error: true, message: "반드시 값을 입력 해야 합니다.", value: ""})
            is_empty = true
        }
        if (!pwdOneCtx) {
            setPwdOneCtx({error: true, message: "반드시 값을 입력 해야 합니다.", value: ""})
            is_empty = true
        }
        if (!pwdTwoCtx) {
            setPwdTwoCtx({error: true, message: "반드시 값을 입력 해야 합니다.", value: ""})
            is_empty = true
        }
        if (is_empty) {
            return
        }

        const ctxList = [nickNameCtx, emailCtx, pwdOneCtx, pwdTwoCtx]
        for (let i = 0; i < ctxList.length; i++) {
            const ctx = ctxList[i]
            if (ctx?.error) {
                enqueueSnackbar("회원 가입 양식을 다시 확인 부탁 드립니다.", snackbar_error_default)
                return
            }
        }

        props.onSubmit({
            email: emailCtx?.value,
            password: pwdOneCtx?.value,
            nickName: nickNameCtx?.value
        }).then((r) => {
            if (r.ok) {
                setOpen(false)
            } else {
                enqueueSnackbar(r.message, snackbar_error_default)
            }
        })
    }


    const handleClose = () => {
        setOpen(false)
    };

    return (
        <Box>
            <Button variant="text" onClick={handleClickOpen}>
                회원가입
            </Button>
            <Dialog maxWidth={"xs"} open={open} onClose={handleClose}>
                <DialogTitle>회원 가입</DialogTitle>
                <DialogContent style={{marginTop: "-16px"}}>

                    <TextInputBox
                        margin="normal"
                        required
                        fullWidth
                        name="닉네임"
                        label="닉네임"
                        type="text"
                        id="nickName"
                        onChange={onChangeNickName}
                        error={nickNameCtx?.error}
                        helperText={nickNameCtx?.message}
                    />

                    <TextInputBox
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="이메일"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={onChangeEmail}
                        error={emailCtx?.error}
                        helperText={emailCtx?.message}
                    />

                    <TextInputBox
                        margin="normal"
                        required
                        fullWidth
                        name="password_1"
                        label="비밀번호"
                        type="password"
                        id="password_1"
                        autoComplete="current-password"
                        onChange={onChangePwdOne}
                        error={pwdOneCtx?.error}
                        helperText={pwdOneCtx?.message}
                    />

                    <TextInputBox
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="비밀번호 확인"
                        type="password"
                        id="password_2"
                        autoComplete="current-password"
                        onChange={onChangePwdTwo}
                        error={pwdTwoCtx?.error}
                        helperText={pwdTwoCtx?.message}
                    />
                </DialogContent>
                <DialogActions>
                    <Box width={"100%"} padding={2} mt={-5}>
                        <SubmitBtn fullWidth type={"submit"} variant="contained" onClick={handleSubmit}>가입
                            요청</SubmitBtn>
                    </Box>
                </DialogActions>
            </Dialog>
        </Box>
    );
}


export default function Login(props: Props) {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {enqueueSnackbar} = useSnackbar();

    const onChangeEmail = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        e.stopPropagation()
        setEmail(e.target.value)
    }

    const onChangePassword = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        e.stopPropagation()
        setPassword(e.target.value)
    }

    const onLogin = async () => {
        if (!emailReg.test(email)) {
            enqueueSnackbar("잘못된 이메일 형식", snackbar_error_default)
            return
        }
        if (!passwordRed.test(password)) {
            enqueueSnackbar("비밀번호는 8글자 이상 30글자 이하, 최소 하나의 숫자와 문자 포함 해야 합니다.", snackbar_error_default)
            return
        }
        const res = await props.onLogin(email, password)
        if (!res.ok) {
            enqueueSnackbar(res.message, snackbar_error_default)
        }
    }

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
                        onChange={onChangeEmail}
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
                        onChange={onChangePassword}
                    />
                </BodyItem>

                {/*<BodyItem>*/}
                {/*    <Button variant={"text"}>비밀번호를 잊으셨나요?</Button>*/}
                {/*</BodyItem>*/}

                <BodyItem>
                    <SubmitBtn onClick={onLogin} fullWidth type={"submit"} variant="contained">
                        {props.buttonName ?? "로그인"}
                    </SubmitBtn>
                </BodyItem>

                <BodyItem>
                    <Box ml={1} mt={1.5}>
                        <Text fontSize={"8px"}> 계정이 없으신가요? </Text>
                    </Box>
                    <Box>
                        <JoinFormDialogButton onSubmit={props.onJoinSubmit}/>
                    </Box>
                </BodyItem>

                <BodyItem mt={1}>
                    <DividerText flexItem={true} text={"외부 서비스로 로그인"}/>
                </BodyItem>

                <BodyItem mt={2}>
                    <Box ml={'auto'} mr={1}>
                        <LoginOAuthIcon oauth_context={props.githubOAuthCtx}
                                        onOAuthLogin={props.onOAuthLogin}
                        >
                            <GithubLoginLogo/>
                        </LoginOAuthIcon>
                    </Box>

                    <Box mr={'auto'}>
                        <LoginOAuthIcon oauth_context={props.googleOAuthCtx}
                                        onOAuthLogin={props.onOAuthLogin}
                        >
                            <GoogleLoginLogo/>
                        </LoginOAuthIcon>
                    </Box>

                </BodyItem>
            </Body>
        </Root>
    )
}