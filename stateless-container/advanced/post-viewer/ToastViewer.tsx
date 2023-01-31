import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';


import {Viewer} from '@toast-ui/react-editor';
import {styled} from "@mui/material";
import {useContext} from "react";
import {ThemeContext} from "@/provider/CustomThemeProvider";

export interface Props {
    content: string;
}

const Root = styled("div")`
  margin-top: 10px;
`

function DarkViewer({content = ''}: Props) {

    return (
        <Root>
            <Viewer theme={'dark'} initialValue={content}/>
        </Root>
    )
}


const TuiEditor = ({content = ''}: Props) => {
    const {mode} = useContext(ThemeContext)
    if (mode == "dark") {
        return <DarkViewer content={content}/>
    }
    return (
        <Root>
            <Viewer initialValue={content}/>
        </Root>
    );
};

export default TuiEditor;