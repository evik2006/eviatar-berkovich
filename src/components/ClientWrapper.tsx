'use client';

import dynamic from 'next/dynamic';

const RubiksCube = dynamic(() => import('@/components/RubiksCube'), { ssr: false });

export default function ClientWrapper() {
  return <RubiksCube />;
}
