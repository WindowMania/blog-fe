import SeriesStateless, {SeriesListItem} from "@/stateless-container/templates/series/SeriesList"
import {styled} from "@mui/material/styles";
import Box, {CBox} from "@/stateless-container/base/Box";
import BlogHeaderMenu from "@/statefull-container/advanced/BlogHeaderMenu";
import {useEffect, useState} from "react";
import Footer from "@/stateless-container/advanced/Footer";
import useLogin from "@/hooks/useLogin";
import PostRepository from "@/repository/post";

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
    const [seriesList, setSeriesList] = useState<SeriesListItem[]>([])
    const [page, setPage] = useState<number>(0)
    const [perPage, setPerPage] = useState<number>(10)

    async function loadSeries() {
        const ret = await PostRepository.getSeriesList({page: page + 1, perPage})
        if (ret.ok) {
            const seriesListRes: SeriesListItem[] = ret.data['seriesList'].map((series: any) => ({
                "id": series.id,
                "title": series.title,
                "updatedAt": series.updated_at,
                "postCount": series.series_post_list.length
            }))
            if (seriesListRes.length < perPage) {
                setIsEnd(true)
            }
            setPage(page + 1)
            setSeriesList([...seriesList, ...seriesListRes])
        }
    }

    useEffect(() => {
        loadSeries().then()
    }, [])


    async function onScrollEnd() {
        if (isEnd) return
        await loadSeries()
    }

    async function onDeleteSeries(id: string) {
        if (!accessKey) return
        await PostRepository.deleteSeries(id, accessKey)
        setSeriesList(seriesList.filter(s => s.id != id))
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