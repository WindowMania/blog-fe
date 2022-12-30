import React, {useState, useCallback, useEffect} from "react";
import styled from '@emotion/styled'
import Box from '@/components/atom/Box'

export interface OAuthContext {
    get_url(): string

    get_platform(): string

    get_client_id(): string

}


export interface Props {
    oauth_context: OAuthContext
    children:any
}


const Root = styled(Box)`
  &:hover {
    cursor: pointer;
  }
`

export default function LoginOAuthIcon(props: Props) {
    const [popup, setPopup] = useState<Window | null>();

    const handleOpenPopup = useCallback(() => {
        const width = 500;
        const height = 650;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        const popup = window.open(
            props.oauth_context.get_url(),
            "로그인 중",
            `width=${width},height=${height},left=${left},top=${top}`
        );
        setPopup(popup);
    }, [])

    useEffect(() => {
        if (!popup) {
            return;
        }
        const githubOAuthCodeListener = (e: any) => {
            if (e.origin !== window.location.origin) {
                return;
            }
            const {code} = e.data;
            console.log(e.data)
            if (code) {
                // 코드 보는곳..
                console.log(`The popup URL has URL code param = ${code}`);
            }
            popup?.close();
            setPopup(null);
        };
        window.addEventListener("message", githubOAuthCodeListener, false);
        return () => {
            window.removeEventListener("message", githubOAuthCodeListener);
            popup?.close();
            setPopup(null);
        };
    }, [popup]);

    return (
        <Root onClick={handleOpenPopup}>
            {props.children}
        </Root>
    );
}