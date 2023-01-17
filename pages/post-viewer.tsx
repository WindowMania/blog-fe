import {styled} from "@mui/material/styles";
import dynamic from 'next/dynamic';
import {GetServerSideProps} from 'next'

import Box, {CBox} from "@/stateless-container/base/Box";
import BlogHeaderMenu from "@/statefull-container/BlogHeaderMenu";
import restApi from "@/libs/RestApi";
import env from '@/libs/env'
import LoadingPage from "@/statefull-container/LoadingPage";

export interface Props {
    post?: PostModel
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {id} = context.query
    const url = env.backUrl + "/post/" + id
    const res = await restApi.get(url)
    const props: Props = {}
    if (res.ok) {
        props['post'] = res.data as PostModel
    }
    return {
        props
    }
}


const NoSsrPostViewer = dynamic(() => import('@/statefull-container/PostViewer'), {
    ssr: false,
});

const Root = styled(CBox)`
  width: 100vw;
  min-width: 100vw;
`
const Item = styled(Box)`
  margin-bottom: 16px;
`

const ViewerItem = styled(Item)`
  width: 100%;
  max-width: 960px;
  min-width: 800px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 32px;
`

export default function PostViewer(props: Props) {
    const loading = async (): Promise<LoadingState> => {
        if (props.post) {
            return Promise.resolve("success")
        }
        return Promise.resolve("fail")
    }
    const post = props.post as PostModel
    return (
        <LoadingPage getLoadingState={loading}>
            <Root>
                <Item>
                    <BlogHeaderMenu/>
                </Item>
                <ViewerItem>
                    <NoSsrPostViewer post={post}/>
                </ViewerItem>
            </Root>
        </LoadingPage>
    );
};

