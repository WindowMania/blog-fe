import React, {useState, useCallback, useEffect} from "react";
import styled from '@emotion/styled'
import Box from '@/components/atom/Box'
import {useSnackbar} from "notistack";

export interface OAuthContext {
    get_url(): string

    get_platform(): string

    get_client_id(): string

}

export interface OAuthLoginResult {
    success: boolean
    access_key: string
    exp: Date
}


export interface Props {
    oauth_context: OAuthContext
    children: any
    onOAuthLogin: (res: OAuthLoginResult) => Promise<boolean>
}


const Root = styled(Box)`
  &:hover {
    cursor: pointer;
  }
`

export default function LoginOAuthIcon(props: Props) {
    const [popup, setPopup] = useState<Window | null>();
    const {enqueueSnackbar} = useSnackbar();

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

        const oauthListener = (e: any) => {
            if (e.origin !== window.location.origin) {
                return;
            }
            const {success, data} = e.data;
            const {exp, access_key} = data
            props.onOAuthLogin({
                success, exp, access_key
            }).then((res) => {
                popup?.close();
                setPopup(null);
                if (!res) {
                    enqueueSnackbar("OAuth2.0 로그인 실패", {
                        variant: "error",
                        anchorOrigin: {
                            horizontal: "center",
                            vertical: "top"
                        }
                    })
                }
            })
        };
        window.addEventListener("message", oauthListener, false);
        return () => {
            window.removeEventListener("message", oauthListener);
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