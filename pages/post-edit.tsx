import dynamic from "next/dynamic";
import {GetServerSideProps} from "next";

import LoadingPage from "@/organism/LoadingPage";
import env from "@/libs/env";
import restApi from "@/libs/RestApi";


export interface Props {
    post?: PostModel
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {id} = context.query
    const url = env.backUrl + "/post/" + id
    const res = await restApi.get(url)
    const props: Props = {}
    if (res.ok) {
        const resPost = res.data as PostModel
        props['post'] = resPost
    }
    return {
        props
    }
}


const NoSsrPostEditor = dynamic(() => import('@/organism/PostEditor'), {
    ssr: false,
});

export default function PostEdit(props: Props) {
    const loading = async (): Promise<LoadingState> => {
        if (props.post) {
            return Promise.resolve("success")
        }
        return Promise.resolve("fail")
    }
    const post = props.post as PostModel
    return (
        <LoadingPage getLoadingState={loading}>
            <NoSsrPostEditor post={post}/>
        </LoadingPage>
    )
}