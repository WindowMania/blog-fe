import React, {useCallback, useState} from 'react'
import {styled} from "@mui/material/styles";
import {useSnackbar} from 'notistack';

import Box, {CBox} from '@/stateless-container/base/Box'
import ToastEditor, {ImageBlobHookResponse} from '@/stateless-container/advanced/toast/ToastEditor'
import TextInputBox from "@/stateless-container/base/TextInputBox";
import Button from "@/stateless-container/base/Button";
import {FAIL_TOP_MIDDLE_OPTION} from '@/libs/snackbar'
import ChipEditor from "@/stateless-container/advanced/chip/ChipEditor";

export type Mode = 'edit' | 'create'


export interface Props {
    mode: Mode
    post?: PostEditorModel
    onSubmit: (model: PostEditorModel) => Promise<BasicRestResponse>
    onDelete?: (toDelete: boolean) => Promise<BasicRestResponse>

    onAddTag: (tag: string) => Promise<BasicRestResponse>
    onDeleteTag: (tag: string) => Promise<BasicRestResponse>

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
  height: calc(100vh - 220px);
  min-height: 600px;
`


function EditorButtonList(props: {
    mode: Mode
    post?: PostEditorModel
    onSubmit: () => Promise<void>
    onDelete: (toDelete: boolean) => Promise<void>
}) {
    const submitBtnText = props.mode == 'edit' ? "수정 하기" : "작성 하기"
    const deleteText = props.post?.deleted ? "복원 하기" : "삭제 하기"

    async function onDelete(e: any): Promise<void> {
        e.stopPropagation()
        await props.onDelete(!props.post?.deleted)
    }

    async function onSubmit(e: any): Promise<void> {
        e.stopPropagation()
        await props.onSubmit()
    }

    return (
        <Box>
            <Box>
                <Button onClick={onSubmit} variant={'outlined'}> {submitBtnText}</Button>
            </Box>
            {props.mode === 'edit' &&
                <Box ml={1}>
                    <Button onClick={onDelete} variant={'outlined'}>
                        {deleteText}
                    </Button>
                </Box>
            }
        </Box>
    )
}


export default function PostEditor(props: Props) {
    const ref = React.useRef<any>(null);
    const [tags, setTags] = useState<string[]>(props.post ? props.post.tags : [])

    const ctx: PostEditorModel = props.post || {
        title: '',
        body: '',
        tags: []
    }
    const content = ctx.body
    const [title, setTitle] = React.useState<string>(ctx.title)
    const {enqueueSnackbar} = useSnackbar();

    function handleTitle(e: any) {
        e.stopPropagation()
        setTitle(e.target.value)
    }

    async function handleSubmit() {
        if (title === '') {
            enqueueSnackbar("제목을 입력 해주세요.", FAIL_TOP_MIDDLE_OPTION)
            return
        }

        const editorIns = ref?.current?.getInstance();
        const contentMark = editorIns.getMarkdown()
        if (contentMark?.length === 0) {
            enqueueSnackbar("내용을 입력 해주세요", FAIL_TOP_MIDDLE_OPTION)
            return
        }
        const newCtx: PostEditorModel = {
            title,
            body: contentMark,
            tags: [...tags, 'All']
        }
        await props.onSubmit(newCtx)
    }

    async function handleDelete(toDelete: boolean) {
        await props.onDelete?.(toDelete)
    }

    function onChangeTag(chips: ItemData[]) {
        setTags(chips.map(chip => chip.id))
    }


    return (
        <Root>
            <Item>
                <EditorButtonList
                    mode={props.mode}
                    post={props.post}
                    onSubmit={handleSubmit}
                    onDelete={handleDelete}
                />
            </Item>

            <Item>
                <ChipEditor chips={makeChipItems(tags)}
                            onAddChip={props.onAddTag}
                            onDeleteChip={props.onDeleteTag}
                            onChangeChips={onChangeTag}
                />
            </Item>

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
                    editorRef={ref} content={content}/>
            </EditorItem>

        </Root>
    )
}

function makeChipItems(tags: string[]): ItemData [] {
    return tags.map((tag) => ({"id": tag, "viewValue": tag}))
}