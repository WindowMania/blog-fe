import {styled} from "@mui/material/styles";
import type {NextPage} from 'next';
import dynamic from 'next/dynamic';

import Box, {CBox} from "@/components/atom/Box";
import BlogHeaderMenu from "@/organism/BlogHeaderMenu";


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

const PostEditHome: NextPage = () => {
    return (
        <Root>
            <Item>
                <BlogHeaderMenu/>
            </Item>

            <ViewerItem>
                <NoSsrPostViewer postId={"111111"}/>
            </ViewerItem>
        </Root>

    );
};

export default PostEditHome;