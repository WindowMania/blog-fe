import {useState, useEffect, useContext} from "react";
import {LoginReactContext} from '@/providers/LoginProvider'

export default function useLogin() {
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const loginCtx = useContext(LoginReactContext)
    useEffect(() => {
        if (loginCtx?.accessKey) {
            setIsLogin(true)
        }
    }, [loginCtx])

    return {isLogin, accessKey: loginCtx?.accessKey, setAccessKey: loginCtx?.setAccessKey}
}