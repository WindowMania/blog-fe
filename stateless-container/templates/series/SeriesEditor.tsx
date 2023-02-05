import {styled} from "@mui/material/styles";
import Box, {CBox} from "@/stateless-container/base/Box";
import TextInputBox from "@/stateless-container/base/TextInputBox";
import React, {useState} from "react";
import ToastEditor, {ImageBlobHookResponse} from "@/stateless-container/advanced/toast/ToastEditor";
import Autocomplete from "@/stateless-container/base/Autocomplete";
import DraggableList from "@/stateless-container/base/draggable/List";
import {DropResult} from 'react-beautiful-dnd';

export type SeriesEditorModel = {
    title: string
    body: string
    items: ItemData []
}

export interface Props {
    model: SeriesEditorModel
    onChangeModel: (model: SeriesEditorModel) => void
    loadItems: (keyword: string) => Promise<ItemData[]>
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


export default function SeriesEditor(props: Props) {
    const ref = React.useRef<any>(null);

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

    return (
        <Root>
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