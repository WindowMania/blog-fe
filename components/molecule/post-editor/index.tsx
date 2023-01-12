import React from 'react'
import {styled} from "@mui/material/styles";
import {OptionsObject, useSnackbar} from 'notistack';

import Box, {CBox} from '@/components/atom/Box'
import ToastEditor from '@/components/molecule/post-editor/ToastEditor'
import TextInputBox from "@/components/atom/TextInputBox";
import Button from "@/components/atom/Button";


export interface Props {
    context?: PostEditorContext
    onSubmit: (newContext: PostEditorContext) => Promise<BasicRestResponse>
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
  height: calc(100vh - 220px);
  min-height: 600px;
`

const snackbar_error_default: OptionsObject = {
    variant: "error",
    anchorOrigin: {
        horizontal: "center",
        vertical: "top"
    }
}

export default function PostEditor(props: Props) {
    const ref = React.useRef<any>(null);
    const ctx: PostEditorContext = props.context || {
        title: '',
        content: ''
    }
    const submitBtnText = ctx.postId ? "수정 하기" : "작성 하기"
    const content = ctx.content
    const [title, setTitle] = React.useState<string>(ctx.title)
    const {enqueueSnackbar} = useSnackbar();

    function handleTitle(e: any) {
        e.stopPropagation()
        setTitle(e.target.value)
    }

    async function handleSubmit(e: any) {
        e.stopPropagation()
        if (title === '') {
            enqueueSnackbar("제목을 입력 해주세요.", snackbar_error_default)
            return
        }
        const editorIns = ref?.current?.getInstance();
        const contentMark = editorIns.getHTML()
        if (contentMark?.length === 0) {
            enqueueSnackbar("내용을 입력 해주세요", snackbar_error_default)
            return
        }
        const newCtx: PostEditorContext = {
            title,
            content: contentMark
        }

        const res = await props.onSubmit(newCtx)
        if (!res.ok) {
            enqueueSnackbar(res.message, snackbar_error_default)
        }
    }

    return (
        <Root>
            <Item>
                <Button onClick={handleSubmit} variant={'outlined'}> {submitBtnText}</Button>
            </Item>

            <Item height={"64px"}>
                <TextInputBox
                    fullWidth
                    onChange={handleTitle}
                    defaultValue={title} label={"제목"}/>
            </Item>

            <EditorItem>
                <ToastEditor editorRef={ref} content={content}/>
            </EditorItem>

        </Root>
    )
}