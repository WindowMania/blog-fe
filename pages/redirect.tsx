import Box from "@/components/atom/Box"
import {useEffect} from "react";
import {useRouter} from "next/router";

export default function Redirect() {
    const router = useRouter()
    useEffect(() => {
        const currentUrl = window.location.href;
        const searchParams = new URL(currentUrl).searchParams;
        const goto = searchParams.get("goto") as string;
        router.push("/" + goto).then()
    }, [])

    return (
        <Box>
            loading...
        </Box>
    )
}