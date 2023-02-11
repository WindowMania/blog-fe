import Box, {CBox} from "@/stateless-container/base/Box";
import Text from "@/stateless-container/base/Text";
import TuiViewer from '@/stateless-container/advanced/toast/ToastViewer'

import {styled} from "@mui/material/styles";
import PostSummaryBody from "@/statefull-container/advanced/PostSummaryBody";
import {SeriesWithPostModel} from "@/repository/post";
import SimpleLogo from "@/stateless-container/base/SimpleLogo";


export interface Props {
    series: SeriesWithPostModel
}

const Root = styled(CBox)`
  max-width: 640px;
`


export default function SeriesViewerBody(props: Props) {
    async function onScrollEnd() {
    }

    return (
        <Root>
            <SimpleLogo mb={1} size={14} text={"SERIES"}/>
            <Box>
                <Text variant={'h2'}>{props.series.title}</Text>
            </Box>
            <Box>
                <Box>
                    <Text>{props.series.posts.length} Posts</Text>
                </Box>
                <Box ml={1}>
                    <Text> 마지막 업데이트 일시 {props.series.updatedAt}</Text>
                </Box>
            </Box>
            <Box>
                <TuiViewer content={props.series.body}/>
            </Box>


            <CBox mt={6}>
                <SimpleLogo mb={4} size={14} text={"POST 목록"}/>
                <PostSummaryBody
                    posts={props.series.posts}
                    onScrollEnd={onScrollEnd}
                />
            </CBox>
        </Root>
    )
}