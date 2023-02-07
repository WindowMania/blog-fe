import {styled} from "@mui/material/styles";
import Box, {CBox} from "@/stateless-container/base/Box";
import TextInputBox from "@/stateless-container/base/TextInputBox";
import React, {useState} from "react";
import ToastEditor, {ImageBlobHookResponse} from "@/stateless-container/advanced/toast/ToastEditor";
import Autocomplete from "@/stateless-container/base/Autocomplete";
import DraggableList from "@/stateless-container/base/draggable/List";
import {DropResult} from 'react-beautiful-dnd';
import Button from "@/stateless-container/base/Button";
import {useSnackbar} from "notistack";
import {FAIL_TOP_MIDDLE_OPTION} from "@/libs/snackbar";

export type SeriesEditorModel = {
    title: string
    body: string
    items: ItemData []
}

export interface Props {
    mode: EditorMode
    model: SeriesEditorModel
    loadItems: (keyword: string) => Promise<ItemData[]>
    onUploadFile?: (f: Blob | File) => Promise<ImageBlobHookResponse>
    onChangeModel: (model: SeriesEditorModel) => void
    onSubmit: () => Promise<void>
    onDelete: () => Promise<void>
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

function SeriesButtonList(props: {
    mode: EditorMode
    onSubmit: () => Promise<void>
    onDelete: () => Promise<void>
}) {

    async function onDelete(e: any): Promise<void> {
        e.stopPropagation()
        await props.onDelete()
    }

    async function onSubmit(e: any): Promise<void> {
        e.stopPropagation()
        await props.onSubmit()
    }

    const submitBtnText = props.mode == 'edit' ? "수정 하기" : "작성 하기"
    return (
        <Box>
            <Box>
                <Button onClick={onSubmit} variant={'outlined'}> {submitBtnText}</Button>
            </Box>
            {props.mode === 'edit' &&
                <Box ml={1}>
                    <Button onClick={onDelete} variant={'outlined'}>
                        삭제
                    </Button>
                </Box>
            }
        </Box>
    )

}


export default function SeriesEditor(props: Props) {
    const ref = React.useRef<any>(null);
    const {enqueueSnackbar} = useSnackbar();
    const model = props.model
    const itemIdDict = model.items.reduce((acc, item) => {
        acc[item.id] = true
        return acc
    }, {} as any)


    function onChangeModel(m: SeriesEditorModel) {
        props.onChangeModel(m)
    }

    function handleTitle(e: any) {
        e.stopPropagation()
        onChangeModel({...model, title: e.target.value})
    }

    function handAddItem(item: ItemData) {
        !itemIdDict[item.id] && onChangeModel({...props.model, items: [...model.items, item]})
    }

    function onDeleteMenuItem(itemId: string) {
        const newList = model.items.filter(m => m.id != itemId)
        onChangeModel({...model, items: newList})
    }

    const onDragEnd = ({destination, source}: DropResult) => {
        function reorder(list: any [],
                         startIndex: number,
                         endIndex: number): any [] {
            const result = Array.from(list);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);
            return result;
        }

        if (!destination) return;
        const newItems = reorder(model.items, source.index, destination.index);
        onChangeModel({...model, items: newItems})
    };

    async function checkSubmit() {
        const model = props.model
        if (!model.title || model.title === '') {
            enqueueSnackbar("제목을 입력 해주세요.", FAIL_TOP_MIDDLE_OPTION)
            return
        }
        await props.onSubmit()
    }

    async function checkDelete() {
        await props.onDelete
    }

    return (
        <Root>
            <Item>
                <SeriesButtonList
                    mode={props.mode}
                    onSubmit={checkSubmit}
                    onDelete={checkDelete}
                />
            </Item>


            <Item height={"64px"}>
                <TextInputBox
                    fullWidth
                    onChange={handleTitle}
                    defaultValue={model.title} label={"제목"}
                />
            </Item>

            <EditorItem>
                <ToastEditor
                    addImageBlobHook={props.onUploadFile}
                    editorRef={ref} content={model.body}/>
            </EditorItem>

            <Item>
                <Autocomplete load={props.loadItems} onSelect={handAddItem}/>
            </Item>

            <Item>
                <DraggableList
                    onDelete={onDeleteMenuItem}
                    items={model.items} onDragEnd={onDragEnd}/>
            </Item>
        </Root>
    )
}