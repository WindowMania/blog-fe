import Box from "@/components/atom/Box"
import type {NextPage} from 'next';
import {useEffect, useState} from "react";
import restApi from "@/libs/RestApi";
import env from "@/libs/env";

const JoinVerifyEmail: NextPage = () => {
    const [msg, setMsg] = useState<string>("인증 중~")


    useEffect(() => {
        const currentUrl = window.location.href;
        const searchParams = new URL(currentUrl).searchParams;
        const user_account = searchParams.get("user_account");
        const code = searchParams.get("code");
        const url = env.backUrl + '/user/join/verify'
        restApi.post(url, {
            account: user_account,
            code
        }).then(r => {
            console.log(r)
            if (r.ok) {
                setMsg("인증 성공.")
                return
            }
            setMsg("인증 실패: " + r.message)
        })

    }, []);
    return (
        <Box> {msg} </Box>
    );
};

export default JoinVerifyEmail;