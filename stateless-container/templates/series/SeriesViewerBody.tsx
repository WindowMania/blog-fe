import Box, {CBox} from "@/stateless-container/base/Box";
import Text from "@/stateless-container/base/Text";
import TuiViewer from '@/stateless-container/advanced/toast/ToastViewer'

import {styled} from "@mui/material/styles";
import PostSummaryBody from "@/statefull-container/advanced/PostSummaryBody";

export type SeriesWithPostModel = {
    id: string
    title: string,
    body: string,
    updatedAt: string,
    posts: PostModel[]
}


export interface Props {
    series: SeriesWithPostModel
}

const Root = styled(CBox)`
    max-width: 640px;
`

const TextBgBox = styled(Box)`
  background-color:${props => props.theme.fontColor.primary.main};
  color:  ${props => props.theme.bg.primary.main};
  text-align: center;
  padding: 4px;
  font-weight: 600;
  border-radius: 3px;
`



export default function SeriesViewerBody(props: Props) {

    async function onScrollEnd(){}

    return (
        <Root>
            <TextBgBox width={"64px"}>
                SERIES
            </TextBgBox>
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
                <TextBgBox width={"84px"} mb={4}>
                    POST 목록
                </TextBgBox>

                <PostSummaryBody
                    posts={props.series.posts}
                     onScrollEnd={onScrollEnd}
                />
            </CBox>
        </Root>
    )
}