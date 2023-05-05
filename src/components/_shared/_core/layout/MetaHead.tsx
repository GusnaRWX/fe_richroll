import React from 'react';
import Head from 'next/head';

type MetaHeadType = {
  title: string,
}

/**
 * Meta Head 
 * 
 * Todo: Needed to be refactor, but for right now just make it beautifull the title on head
 * @param param0 
 * @returns 
 */

export default function MetaHead({
  title
}: MetaHeadType) {
  return (

    <Head>
      <title>{title}</title>
    </Head>

  );
}