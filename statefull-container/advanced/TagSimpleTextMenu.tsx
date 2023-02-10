import SimpleTextMenu from "@/stateless-container/advanced/SimpleTextMenu";
import useMyRouter from "@/hooks/useMyRouter";

export interface Props {
    tagItems: ItemData[]
}


export default function TagSimpleTextMenu(props: Props) {
    const {route} = useMyRouter()

    async function onClickItem(id: string) {
        id === 'All' && await route("TAG_HOME")
        id !== 'All' && await route("TAG_HOME", {ids: id})
    }

    return (
        <SimpleTextMenu onClickItem={onClickItem} items={props.tagItems} title={"Tag 리스트"}/>
    )
}
