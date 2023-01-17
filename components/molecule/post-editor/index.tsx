import React from 'react'
import {styled} from "@mui/material/styles";
import {useSnackbar} from 'notistack';

import Box, {CBox} from '@/components/atom/Box'
import ToastEditor from '@/components/molecule/post-editor/ToastEditor'
import TextInputBox from "@/components/atom/TextInputBox";
import Button from "@/components/atom/Button";
import {FAIL_TOP_MIDDLE_OPTION} from '@/libs/snackbar'


export interface Props {
    mode: 'edit' | 'create'
    post?: PostEditorModel
    onSubmit: (model: PostEditorModel) => Promise<BasicRestResponse>
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


export default function PostEditor(props: Props) {
    const ref = React.useRef<any>(null);
    const ctx: PostEditorModel = props.post || {
        title: '',
        body: '',
        tags: ['All']
    }
    const submitBtnText = props.mode == 'edit' ? "수정 하기" : "작성 하기"
    const content = ctx.body
    const [title, setTitle] = React.useState<string>(ctx.title)
    const {enqueueSnackbar} = useSnackbar();

    function handleTitle(e: any) {
        e.stopPropagation()
        setTitle(e.target.value)
    }

    async function handleSubmit(e: any) {
        e.stopPropagation()
        if (title === '') {
            enqueueSnackbar("제목을 입력 해주세요.", FAIL_TOP_MIDDLE_OPTION)
            return
        }
        const editorIns = ref?.current?.getInstance();
        const contentMark = editorIns.getHTML()
        if (contentMark?.length === 0) {
            enqueueSnackbar("내용을 입력 해주세요", FAIL_TOP_MIDDLE_OPTION)
            return
        }
        const newCtx: PostEditorModel = {
            title,
            body: contentMark,
            tags: ["All"]
        }
        await props.onSubmit(newCtx)
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