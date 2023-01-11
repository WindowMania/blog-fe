import Box,{CBox} from "@/components/atom/Box";
import Login, {Props as LoginProps} from '@/components/molecule/login/Login'
import {styled} from '@mui/material/styles'


export interface Props extends LoginProps {


}

const Root = styled(CBox)`
  max-width: 100vw;
  min-width: 100vw;
  max-height: 100vh;
  min-height: 100vh;
  background-image: url("/images/login-bg.jpg");
`

const Container = styled(Box)`
    margin: auto;
    min-width: 450px;
    min-height: 450px;
    border: 1px solid ${props=>props.theme.border.primary.main};
    background: ${props=>props.theme.bg.primary.main};
    border-radius: 12px;
`

export default function LoginPage(props: Props) {

    return (
        <Root>
            <Container>
                <Login {...props}/>
            </Container>
        </Root>
    )
}