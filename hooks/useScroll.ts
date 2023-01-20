import {useLayoutEffect, useState} from "react";

export default function useScroll() {
    const [width, setWidth] = useState<number | undefined>()
    const [height, setHeight] = useState<number | undefined>()
    const [isDown, setIsDown] = useState<boolean>(false)
    const [preHeight, setPreHeight] = useState<number>(0)
    const [isReached, setReached] = useState<boolean>(false)

    useLayoutEffect(() => {
        function onScrollWindow(e: any) {
            setWidth(window.scrollX)
            setHeight(window.scrollY)
        }

        window.addEventListener("scroll", onScrollWindow)
        return () => {
            window.removeEventListener('scroll', onScrollWindow)
        }
    }, [])


    useLayoutEffect(() => {
        if (height && typeof window !== 'undefined') {
            const windowInnerHeight = window.innerHeight
            const bodyOffsetHeight = document.body.offsetHeight

            console.log(windowInnerHeight, height, bodyOffsetHeight)
            let newReached = false
            // console.log(windowInnerHeight, height, bodyOffsetHeight)
            if (windowInnerHeight + height >= bodyOffsetHeight) {
                newReached = true
            }
            setReached(newReached)
        }
        if (height) {
            const newIsDown = height >= preHeight ? true : false
            setIsDown(newIsDown)
            setPreHeight(height)
        }
    }, [height])


    return {isDown, isReached}
}