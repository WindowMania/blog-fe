import styled from "@emotion/styled";
import React, {useState, useEffect} from "react"
import Button from "@/components/atom/Button";

const CLIENT_ID = "af25e309d8d0219d5e43";
const GITHUB_AUTH_SERVER = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`;

// https://velog.io/@shyuuuuni/React-%ED%8C%9D%EC%97%85%EA%B3%BC-%EC%86%8C%ED%86%B5%ED%95%98%EA%B8%B0

export const GithubLoginButton = () => {
    const [popup, setPopup] = useState<Window | null>();

    const handleOpenPopup = () => {
        const width = 500;
        const height = 650;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        const popup = window.open(
            GITHUB_AUTH_SERVER,
            "로그인 중...",
            `width=${width},height=${height},left=${left},top=${top}`
        );
        setPopup(popup);
    }


    // 로그인 팝입이 열리면 로그인 로직을 처리합니다.
    useEffect(() => {
        if (!popup) {
            return;
        }
        const githubOAuthCodeListener = (e:any) => {
            if (e.origin !== window.location.origin) {
                return;
            }
            const {code} = e.data;
            if (code) {
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
        <div className="App">
            <button onClick={handleOpenPopup}>팝업 열기</button>
        </div>
    );
};

