import {styled} from "@mui/material/styles";
import Box, {CBox} from "@/stateless-container/base/Box";
import Text, {TextButton} from "@/stateless-container/base/Text";
import useScroll from "@/hooks/useScroll";
import {useEffect} from "react";
import Divider from "@/stateless-container/base/Divider";

export type SeriesListItem = {
    id: string
    title: string
    updatedAt: string
    postCount: number
}

export interface Props {
    seriesList: SeriesListItem []
    isLogin?: boolean
    onScrollEnd: () => Promise<void>
    onClickEdit: (id: string) => Promise<void>
    onClickDelete: (id: string) => Promise<void>
}

const SummaryRoot = styled(CBox)`
  margin-bottom: 3rem;
  min-width: 640px;
`

function SeriesSummary(props: {
    series: SeriesListItem
    isLogin: boolean
    onClickEdit: (id: string) => Promise<void>
    onClickDelete: (id: string) => Promise<void>
}) {

    async function onClickEdit(e: any) {
        e.stopPropagation()
        await props.onClickEdit(props.series.id)
    }

    async function onClickDelete(e: any) {
        e.stopPropagation()
        await props.onClickDelete(props.series.id)
    }

    return (
        <SummaryRoot>
            <Divider/>
            <Box mt={2}>
                <Text variant={'h3'}>{props.series.title}</Text>
            </Box>

            <Box mt={1}>
                <Text variant={'caption'}>Post({props.series.postCount}) 마지막 업데이트 {props.series.updatedAt}</Text>
                {props.isLogin && <TextButton onClick={onClickEdit} ml={1} variant={'caption'}> 수정 </TextButton>}
                {props.isLogin && <TextButton onClick={onClickDelete} ml={1} variant={'caption'}> 삭제 </TextButton>}
            </Box>
        </SummaryRoot>
    )
}

const Root = styled(CBox)``

export default function SeriesList(props: Props) {
    const {isReached} = useScroll()
    const isLogin = props.isLogin || false


    useEffect(() => {
        isReached && props.onScrollEnd().then()
    }, [isReached])


    return (
        <Root>
            <Box mb={4}>
                <Text variant={'h2'}> 시리즈 목록</Text>
            </Box>

            <CBox>
                {
                    props.seriesList
                        .map(s => <SeriesSummary
                            onClickDelete={props.onClickDelete}
                            onClickEdit={props.onClickEdit}
                            isLogin={isLogin}
                            key={s.id} series={s}/>)
                }
            </CBox>
        </Root>
    )
}