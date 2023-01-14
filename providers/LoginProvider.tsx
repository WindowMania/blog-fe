import React, {createContext, useState} from 'react'

export const LoginReactContext = createContext<LoginContext | null>(null)


export interface Props {
    children: React.ReactNode
}

export default function LoginProvider(props: Props) {
    const [accessKey, setAccessKey] = useState<string>()
    const [exp, setExp] = useState<Date>()

    return (
        <LoginReactContext.Provider value={{exp, accessKey, setAccessKey, setExp}}>
            {props.children}
        </LoginReactContext.Provider>
    )

}