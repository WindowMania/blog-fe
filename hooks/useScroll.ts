import {useEffect, useState} from "react";

export default function useScroll() {
    const [width, setWidth] = useState<number | undefined>()
    const [height, setHeight] = useState<number | undefined>()
    const [isDown, setIsDown] = useState<boolean>(false)
    const [preHeight, setPreHeight] = useState<number>(0)
    const [isReached, setReached] = useState<boolean>(false)

    useEffect(() => {
        function onScrollWindow(e: any) {
            e.stopPropagation()
            setWidth(window.scrollX)
            setHeight(window.scrollY)
        }

        window.addEventListener("scroll", onScrollWindow)
        return () => {
            window.removeEventListener('scroll', onScrollWindow)
        }
    }, [])


    useEffect(() => {
        if (height && typeof window !== 'undefined') {
            const windowInnerHeight = window.innerHeight
            const bodyOffsetHeight = document.body.offsetHeight
            let newReached = false
            // console.log(windowInnerHeight, height, bodyOffsetHeight)
            if (windowInnerHeight + height >= bodyOffsetHeight) {
                newReached = true
            }
            setReached(newReached)
        }
        if (height) {
            const newIsDown = height >= preHeight
            setIsDown(newIsDown)
            setPreHeight(height)
        }
    }, [height])


    return {isDown, isReached}
}