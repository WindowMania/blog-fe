import {styled} from "@mui/material/styles";
import Box, {CBox} from "@/stateless-container/base/Box";
import BlogHeaderMenu from "@/statefull-container/advanced/BlogHeaderMenu";
import Footer from "@/stateless-container/advanced/Footer";

import dynamic from 'next/dynamic';
import {SeriesWithPostModel} from "@/repository/post";

export interface Props {
    series?: SeriesWithPostModel
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
    return (
        <Root>
            <Head>
                <BlogHeaderMenu/>
            </Head>
            {props.series &&
                <Body>
                    <NoSsrSeriesViewer series={props.series}/>
                </Body>
            }
            <Footer/>
        </Root>

    )
}