import Link from 'next/link';
import { Suspense } from 'react';
import Data from './data';

export default async function Home() {
  return (
    <div className="flex flex-col justify-center gap-8 mt-64">
      <Suspense
        fallback={
          <p className="text-center">
            If you are seeing this then streaming is working on Space micros!!!
          </p>
        }
      >
        <Data />
      </Suspense>
      <div className="flex gap-8 justify-center items-center w-full">
        <Link href="/reval" className="underline">
          Revalidate
        </Link>
        <Link href="/redir" className="underline">
          Revalidate & Redirect
        </Link>
      </div>
    </div>
  );
}
