import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';


import {Viewer} from '@toast-ui/react-editor';
import {styled} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {ThemeContext} from "@/provider/CustomThemeProvider";

export interface Props {
    content?: string;
}

const Root = styled("div")`
  margin-top: 10px;
`

export default function ToastViewer(props: Props) {
    const {mode} = useContext(ThemeContext)
    const content = props.content || ''
    const [count, setCount] = useState<number>(1)
    useEffect(() => {
        setCount(count + 1)
    }, [content])


    useEffect(() => {
        setCount(count + 1)
    }, [mode])

    return (
        <Root key={count}>
            <Viewer theme={mode} initialValue={content}/>
        </Root>
    )
}
