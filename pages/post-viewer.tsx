import type {NextPage} from 'next';

import dynamic from 'next/dynamic';


const NoSsrPostViewer = dynamic(() => import('@/organism/PostViewer'), {
    ssr: false,
});


const PostEditHome: NextPage = () => {
    return (
        <NoSsrPostViewer postId={"111111"} />
    );
};

export default PostEditHome;