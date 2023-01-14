import {useState, useEffect, useCallback} from "react";


export default function useLogin() {
    const [accessKey, __setAccessKey] = useState<string>()
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const setAccessKey = useCallback((token: string) => {
        __setAccessKey(token)
        window.localStorage.setItem("accessKey", token)
    }, [])

    const setLogout = useCallback(() => {
        __setAccessKey('')
        window.localStorage.setItem("accessKey", '')
        setIsLogin(false)
    }, [])


    useEffect(() => {
        if (window && window.localStorage) {
            const token = window.localStorage.getItem("accessKey")
            if (token) {
                setIsLogin(true)
                setAccessKey(token)
            }
        }
    }, [])


    return {isLogin, accessKey, setAccessKey, setLogout}
}