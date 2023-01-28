import SimpleTextMenu from "@/stateless-container/advanced/SimpleTextMenu";

export interface Props {
    tagItems: ItemData[]
}


export default function TagSimpleTextMenu(props: Props) {

    async function onClickItem(id: string) {
        console.log(id, " zz")
    }

    return (
        <SimpleTextMenu onClickItem={onClickItem} items={props.tagItems} title={"Tag 리스트"}/>
    )
}
