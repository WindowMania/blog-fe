import SeriesStateless, {SeriesListItem} from "@/stateless-container/templates/series/SeriesList"
import {styled} from "@mui/material/styles";
import Box, {CBox} from "@/stateless-container/base/Box";
import BlogHeaderMenu from "@/statefull-container/advanced/BlogHeaderMenu";
import {useState} from "react";
import Footer from "@/stateless-container/advanced/Footer";
import useLogin from "@/hooks/useLogin";

export interface Props {

}

const Root = styled(CBox)`
  background-color: ${props => props.theme.bg.primary.main};
  color: ${props => props.theme.fontColor.primary.main};
`

const Item = styled(Box)``
const Head = styled(Item)``
const Body = styled(Item)`
  padding: 3rem 1rem 1rem 1rem;
  margin-left: auto;
  margin-right: auto;
  height: 100vh;
`

export default function Series(props: Props) {
    const {isLogin, accessKey} = useLogin()
    const [isEnd, setIsEnd] = useState<boolean>(false)

    const seriesList: SeriesListItem[] = [
        {"id": "1", title: "테스트1", updatedAt: "2022-02-09", postCount: 3},
        {"id": "2", title: "테스트2", updatedAt: "2022-02-09", postCount: 13},
        {"id": "3", title: "테스트3", updatedAt: "2022-02-09", postCount: 23},
        {"id": "4", title: "테스트4", updatedAt: "2022-02-09", postCount: 113},
        {"id": "5", title: "테스트5", updatedAt: "2022-02-09", postCount: 33},
    ]

    async function onScrollEnd() {
        if (isEnd) return

        // 개수가 0이라면..
        setIsEnd(true)
    }

    async function onDeleteSeries(id: string) {
        console.log("del,,", id)
    }

    async function onEditSeries(id: string) {
        console.log("edit..", id)
    }

    return (
        <Root>
            <Head>
                <BlogHeaderMenu/>
            </Head>

            <Body>
                <SeriesStateless
                    onClickEdit={onEditSeries}
                    onClickDelete={onDeleteSeries}
                    onScrollEnd={onScrollEnd}
                    seriesList={seriesList}
                    isLogin={isLogin}
                />
            </Body>


            {isEnd && <Footer/>}
        </Root>

    )
}