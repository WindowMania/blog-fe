import dynamic from "next/dynamic";
import {GetServerSideProps} from "next";

import LoadingPage from "@/stateless-container/templates/LoadingPage";
import PostRepository from "@/repository/post";

export interface Props {
    post?: PostModel
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {id} = context.query
    const post = await PostRepository.getPost(id as string)
    return {
        props: {
            post
        }
    }
}


const NoSsrPostEditor = dynamic(() => import('@/statefull-container/PostEditor'), {
    ssr: false,
});

export default function PostEdit(props: Props) {
    console.log(props.post)
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