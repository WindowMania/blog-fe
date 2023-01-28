import SimpleTextMenu from "@/stateless-container/advanced/SimpleTextMenu";

export interface Props {

}


export default function TagSimpleTextMenu(props: Props) {
    const items: ItemData [] = [
        {id: "1", viewValue: "테스트1"},
        {id: "2", viewValue: "테스트2"},
        {id: "3", viewValue: "테스트3"},
        {id: "4", viewValue: "테스트4"},
    ]

    async function onClickItem(id:string){
        console.log(id," zz")
    }

    return (
        <SimpleTextMenu onClickItem={onClickItem} items={items} title={"Tag 리스트"}/>
    )
}
