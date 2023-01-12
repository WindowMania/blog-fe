import type {NextPage} from 'next';

import dynamic from 'next/dynamic';


const NoSsrPostEditor = dynamic(() => import('@/organism/PostEditor'), {
    ssr: false,
});


const PostEditHome: NextPage = () => {
    return (
        <NoSsrPostEditor />
    );
};

export default PostEditHome;