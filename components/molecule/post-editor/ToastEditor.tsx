import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { Editor as TuiEditor } from '@toast-ui/react-editor';
import React from 'react'
import {styled} from "@mui/material/styles";

interface Props {
    content?: string;
    editorRef: React.MutableRefObject<any>;
}


const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'],
    ['code'],
    ['scrollSync'],
];


export default function ToastEditor(props:Props){
    const content = props.content || ''
    const editorRef = props.editorRef

    return (
        <div style={{width:'100%',height:'100%'}}>
            {editorRef && (
                <TuiEditor
                    ref={editorRef}
                    initialValue={content || ' '} // 글 수정 시 사용
                    initialEditType="wysiwyg" // wysiwyg & markdown
                    previewStyle={window.innerWidth > 800 ? 'vertical' : 'tab'} // tab, vertical
                    hideModeSwitch={true}
                    height={"100%"}
                    // theme={''} // '' & 'dark'
                    usageStatistics={false}
                    toolbarItems={toolbarItems}
                    useCommandShortcut={true}
                    plugins={[colorSyntax]}
                />
            )}
        </div>
    );
}
