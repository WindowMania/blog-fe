import {SeriesWithPostModel} from '@/stateless-container/templates/series/SeriesViewerBody'
import {styled} from "@mui/material/styles";
import Box, {CBox} from "@/stateless-container/base/Box";
import BlogHeaderMenu from "@/statefull-container/advanced/BlogHeaderMenu";
import Footer from "@/stateless-container/advanced/Footer";
import {useState} from "react";
import dynamic from 'next/dynamic';

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

const NoSsrSeriesViewer = dynamic(() => import("@/stateless-container/templates/series/SeriesViewerBody"), {
    ssr: false
})

export default function SeriesViewer(props: Props) {

    const series: SeriesWithPostModel = {
        id: "1",
        title: "test",
        body:
            "![Untitled.png](https://blog.kyb.pe.kr/api/v1/file/static/07ef122f692b4437b59a44f7eb01f021)\n" +
            "어쩌고 저쩌고 관련되었다..\n"
        ,
        updatedAt: "2022-02-03 21:32:12",
        posts: [
            {
                id: "11",
                title: "테라폼 어쩌고 저쩌고",
                body: "안녕하세요..",
                tags: ["All", "테라폼"],
                created_at: "2022-02-03 21:55:12",
                username: "hi",
                deleted: false,
                updated_at: "2022-02-03 21:55:12"
            }
        ]
    }

    return (
        <Root>
            <Head>
                <BlogHeaderMenu/>
            </Head>
            <Body>
                <NoSsrSeriesViewer series={series}/>
            </Body>

            <Footer/>
        </Root>

    )
}