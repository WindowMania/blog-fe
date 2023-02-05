import {styled} from "@mui/material/styles";
import dynamic from 'next/dynamic';
import {GetServerSideProps} from 'next'

import Box, {CBox} from "@/stateless-container/base/Box";
import BlogHeaderMenu from "@/statefull-container/advanced/BlogHeaderMenu";
import LoadingPage from "@/stateless-container/templates/LoadingPage";
import PostRepository from "@/repository/post";
import Footer from "@/stateless-container/advanced/Footer";

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


const NoSsrPostViewer = dynamic(() => import('@/statefull-container/templates/PostViewer'), {
    ssr: false,
});


const Root = styled(CBox)`
  background-color: ${props => props.theme.bg.primary.main};
  color: ${props => props.theme.fontColor.primary.main};
`

const Item = styled(Box)``

const ViewerItem = styled(Item)`
  width: 100%;
  max-width: 960px;
  min-width: 800px;
  margin: 32px auto;
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

                <Item>
                    <Footer/>
                </Item>
            </Root>
        </LoadingPage>
    );
};

