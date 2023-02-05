import dynamic from 'next/dynamic';

import useLoginRoute from '@/hooks/useLoginRedirect'

const NoSsrPostCreator = dynamic(() => import('@/statefull-container/templates/PostCreator'), {
    ssr: false,
});


export default function PostWrite(){
    useLoginRoute("/")
    return (
        <NoSsrPostCreator/>
    );
}
