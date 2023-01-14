import type {NextPage} from 'next';
import dynamic from 'next/dynamic';

import useLoginRoute from '@/hooks/useLoginRedirect'

const NoSsrPostEditor = dynamic(() => import('@/organism/PostCreator'), {
    ssr: false,
});

const PostEditHome: NextPage = () => {
    useLoginRoute("/")

    return (
        <NoSsrPostEditor/>
    );
};

export default PostEditHome;