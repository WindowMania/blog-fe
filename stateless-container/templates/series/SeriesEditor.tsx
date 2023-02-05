import {styled} from "@mui/material/styles";
import Box, {CBox} from "@/stateless-container/base/Box";
import TextInputBox from "@/stateless-container/base/TextInputBox";
import React from "react";

export interface Props {
    model?: SeriesEditorModel
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
        </Root>
    )
}