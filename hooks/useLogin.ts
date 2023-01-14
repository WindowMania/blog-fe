import {useState, useEffect, useContext} from "react";


export default function useLogin() {
    const [accessKey, __setAccessKey] = useState<string>()
    const [isLogin, setIsLogin] = useState<boolean>(false)

    function setAccessKey(s: string) {
        __setAccessKey(s)
        window.localStorage.setItem("accessKey", s)
    }

    useEffect(() => {
        if (window && window.localStorage) {
            const token = window.localStorage.getItem("accessKey")
            if (token) {
                setIsLogin(true)
                setAccessKey(token)
            }
        }
    }, [])

    return {isLogin, accessKey, setAccessKey}
}