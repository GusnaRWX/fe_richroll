import React from 'react';
import Head from 'next/head';

type MetaHeadType = {
  title: string,
}

export default function MetaHead({
  title
}: MetaHeadType) {
  return (

    <Head>
      <title>{title}</title>
    </Head>

  );
}