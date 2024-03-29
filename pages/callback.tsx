import Box from "../stateless-container/base/Box"
import type {NextPage} from 'next';
import {useEffect} from "react";
import env from "@/libs/env";


const Callback: NextPage = () => {
    useEffect(() => {
        const currentUrl = window.location.href;
        const searchParams = new URL(currentUrl).searchParams;
        const code = searchParams.get("code");
        const platform = searchParams.get("platform");
        if (code && platform) {
            fetch(env.backUrl + "/user/oauth",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        platform,
                        code
                    }),
                }
            ).then((res) => {
                if (res.ok) {
                    res.json().then((data) => window.opener.postMessage({success: true, data}, window.location.origin))
                } else {
                    window.opener.postMessage({success: false, message: res.statusText}, window.location.origin)
                }
            })
        }
    }, []);
    return (
        <Box></Box>
    );
};

export default Callback;