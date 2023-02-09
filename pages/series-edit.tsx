import PostRepository, {SeriesWithPostModel} from "@/repository/post";
import {GetServerSideProps} from "next";
import SeriesEdit from "@/statefull-container/templates/SeriesEdit";

export interface Props {
    series: SeriesWithPostModel
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

export default function SeriesEditPage(props: Props) {
    return (
        <SeriesEdit series={props.series}/>
    )
}