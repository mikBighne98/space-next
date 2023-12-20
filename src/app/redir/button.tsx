'use client';

import { redirect } from 'next/navigation';

export default function ClientSideRedirectButton({}) {
  return (
    <button
      onClick={() => {
        redirect(`/`);
      }}
    >
      Click on this to test client side redirects!
    </button>
  );
}
