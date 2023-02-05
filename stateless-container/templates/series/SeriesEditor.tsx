import {styled} from "@mui/material/styles";
import Box, {CBox} from "@/stateless-container/base/Box";
import TextInputBox from "@/stateless-container/base/TextInputBox";
import React from "react";
import ToastEditor, {ImageBlobHookResponse} from "@/stateless-container/advanced/toast/ToastEditor";
import Autocomplete from "@/stateless-container/base/Autocomplete";

export interface Props {
    model?: SeriesEditorModel

    onUploadFile?: (f: Blob | File) => Promise<ImageBlobHookResponse>
}

const Root = styled(CBox)`
  width: 100vw;
  padding-top: 64px;
  padding-right: 150px;
  padding-left: 150px;
`

const Item = styled(Box)`
  margin-bottom: 16px;
  width: 100%;
`

const EditorItem = styled(Item)`
  height: 450px;
`

async function async_call(keyword: string) {
    function sleep(ms: number) {
        return new Promise((r) => setTimeout(r, ms));
    }

    const items = [
        {id: "1", viewValue: "zz"}, {id: "2", viewValue: "zz2"},
        {id: "3", viewValue: "안녕하세요.."}
    ]
    await sleep(3000)
    return items
}


export default function SeriesEditor(props: Props) {
    const ref = React.useRef<any>(null);
    const model = props.model || {
        title: '',
        body: '',
        posts: []
    }
    const [title, setTitle] = React.useState<string>(model.title)

    function handleTitle(e: any) {
        e.stopPropagation()
        setTitle(e.target.value)
    }

    return (
        <Root>
            <Item height={"64px"}>
                <TextInputBox
                    fullWidth
                    onChange={handleTitle}
                    defaultValue={title} label={"제목"}
                />
            </Item>

            <EditorItem>
                <ToastEditor
                    addImageBlobHook={props.onUploadFile}
                    editorRef={ref} content={model.body}/>
            </EditorItem>

            <Item>
                <Autocomplete load={async_call}
                              onSelect={(k) => console.log("selecte..", k)}
                />

            </Item>
        </Root>
    )
}