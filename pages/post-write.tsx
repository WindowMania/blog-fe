import dynamic from 'next/dynamic';

import useLoginRoute from '@/hooks/useLoginRedirect'

const NoSsrPostCreator = dynamic(() => import('@/organism/PostCreator'), {
    ssr: false,
});


export default function PostWrite(){
    useLoginRoute("/")
    return (
        <NoSsrPostCreator/>
    );
}
