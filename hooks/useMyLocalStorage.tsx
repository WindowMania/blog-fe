import {useEffect, useState} from "react";

export interface Props {
    key: string
    defaultValue?: string
}


export default function useMyLocalStorage(props: Props) {
    const [value, setValue] = useState<string>(props.defaultValue || '')
    useEffect(() => {
        setValue(window.localStorage.getItem(props.key) || props.defaultValue || '')
    }, [props.key])

    function setLocalItem(value: string) {
        setValue(value)
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(props.key, value)
        }
    }

    function clear() {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(props.key, '')
        }
    }
    return {value, setLocalItem, clear}
}