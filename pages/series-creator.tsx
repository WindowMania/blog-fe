import dynamic from "next/dynamic";

const NoSsrSeriesEditor = dynamic(() => import("@/statefull-container/templates/SeriesCreator"), {
    ssr: false
})

export default function SeriesCreatorPage() {
    return (
        <NoSsrSeriesEditor/>
    )
}