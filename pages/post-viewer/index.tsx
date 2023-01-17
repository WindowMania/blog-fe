import {styled} from "@mui/material/styles";
import type {NextPage} from 'next';
import dynamic from 'next/dynamic';
import {GetServerSideProps} from 'next'

import Box, {CBox} from "@/components/atom/Box";
import BlogHeaderMenu from "@/organism/BlogHeaderMenu";
import restApi from "@/libs/RestApi";
import env from '@/libs/env'
import useRedirect from "../../hooks/useRedirect";

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


const NoSsrPostViewer = dynamic(() => import('@/organism/PostViewer'), {
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

const PostEditHome: NextPage = (props: Props) => {
    useRedirect({
        href: "",
        callback: () => {
            return props.post === undefined
        }
    })
    return (
        <Root>
            <Item>
                <BlogHeaderMenu/>
            </Item>
            {
                props.post && <ViewerItem>
                    <NoSsrPostViewer post={props.post}/>
                </ViewerItem>
            }
        </Root>

    );
};

export default PostEditHome;