import React from 'react'
import {
    Draggable, DragDropContext, OnDragEndResponder, Droppable
} from 'react-beautiful-dnd';
import {ListItem, ListItemText, List, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from "@/stateless-container/base/Divider";


export interface ItemProps {
    item: ItemData
    index: number
    onDelete: (itemId: string) => void

}

export interface ListProps {
    items: ItemData[]
    onDragEnd: OnDragEndResponder;
    onDelete: (itemId: string) => void
}

export function DraggableListItem(props: ItemProps) {
    const item = props.item
    return (
        <Draggable draggableId={item.id} index={props.index}>
            {(provided, snapshot) => (
                <>
                    <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}

                        secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => props.onDelete(item.id)}>
                                <DeleteIcon/>
                            </IconButton>
                        }
                    >
                        <ListItemText primary={item.viewValue}/>
                    </ListItem>
                    <Divider/>
                </>
            )}
        </Draggable>
    );
}

export default function DraggableList(props: ListProps) {
    return (
        <DragDropContext onDragEnd={props.onDragEnd}>
            <Droppable droppableId="droppable-list">
                {provided => (
                    <div style={{width: "100%"}} ref={provided.innerRef} {...provided.droppableProps}>
                        {props.items.map((item, index) => (
                            <DraggableListItem
                                onDelete={props.onDelete}
                                item={item} index={index} key={item.id}/>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}