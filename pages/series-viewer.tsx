import SeriesViewer from "@/statefull-container/templates/SeriesViewer";
import {GetServerSideProps} from "next";
import PostRepository, {SeriesWithPostModel} from "@/repository/post";


export interface Props {
    series?: SeriesWithPostModel
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {seriesId} = context.query
    const series = await PostRepository.getSeriesWithPost(seriesId as string)
    return {
        props: {
            series
        }
    }
}


export default function SeriesViewerPage(props:Props) {
    return (
        <SeriesViewer series={props.series}/>
    )
}