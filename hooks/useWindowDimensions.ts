import {useState, useEffect} from 'react';


export default function useWindowDimensions() {
    const [width, setWidth] = useState<number | undefined>()
    const [height, setHeight] = useState<number | undefined>()
    useEffect(() => {
        function handleResize() {
            const innerWidth = window.innerWidth
            const innerHeight = window.innerHeight
            setHeight(innerHeight)
            setWidth(innerWidth)
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [typeof window !== 'undefined']);
    return {width, height}
}
