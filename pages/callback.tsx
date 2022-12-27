import Box from "@/components/atom/Box"
import type {NextPage} from 'next';
import {useEffect} from "react";

const Home: NextPage = () => {
    useEffect(() => {
        const currentUrl = window.location.href;
        const searchParams = new URL(currentUrl).searchParams;
        const code = searchParams.get("code");
        if (code) {
            window.opener.postMessage({ code }, window.location.origin);
        }
    }, []);
    return (
        <Box>
            callback
        </Box>
    );
};

export default Home;