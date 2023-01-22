import {useState, useCallback, useEffect} from "react";


export default function useLogin() {

    const [accessKey, __setAccessKey] = useState<string>()
    const [isLogin, setIsLogin] = useState<boolean>()
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
        if (typeof window !== 'undefined') {
            let token = window.localStorage.getItem("accessKey")
            let setupLogin = true
            if (!token) {
                setupLogin = false
                token = ''
            }
            setIsLogin(setupLogin)
            setAccessKey(token)
        }
    }, [])

    return {isLogin, accessKey, setAccessKey, setLogout}
}