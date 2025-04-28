import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { Image, Link } from 'lucide-react';
import { notFound } from 'next/navigation';
import React from 'react';
import { postcss } from 'tailwindcss';

export const experimental_ppr = true;

const page = async ({params}) => {
    const { id } = params; 

    const post = await client.fetch(STARTUP_BY_ID_QUERY, { id }); 

    if (!post) return notFound();

    return (
        <>
            <section className='pink_container !min-h-[230px]'>
                <p className='tag'>{formatDate(post._createdAt)}</p>
                <h1 className='heading '>{post.title}</h1>
                <p className='sub-heading !max'></p>
            </section>
        </>
    );
};

export default page;
