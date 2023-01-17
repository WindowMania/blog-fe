import Box from "@/stateless-container/base/Box";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export interface Props {
    children: any
    getLoadingState: () => Promise<LoadingState>
    loadFailStrategy?: LoadFailStrategy
    redirectHref?: string
}


export default function LoadingPage(props: Props) {
    const router = useRouter()
    const [isLoading, setLoading] = useState<LoadingState>('pending')
    const loadFailStrategy = props.loadFailStrategy || 'redirect'
    const redirectHref = props.redirectHref || '/'

    useEffect(() => {
        props.getLoadingState().then(state => {
            setLoading(state)
        })
    }, [props.getLoadingState])

    switch (isLoading) {
        case "success":
            return (
                <>
                    {props.children}
                </>
            )
        case "fail":
            if (loadFailStrategy === 'redirect') {
                router.replace(redirectHref).then()
                setLoading('pending')
                return (
                    <Box>
                        loading...
                    </Box>
                )
            }
            return (
                <Box>
                    fail...
                </Box>
            )
        default:
            return (
                <Box>
                    loading...
                </Box>
            )
    }
}
