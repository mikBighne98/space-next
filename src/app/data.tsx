export default async function Data() {
  const res = await fetch(
    'https://app-router-api.vercel.app/api/reviews?delay=10000',
    {
      cache: 'no-store',
    }
  );
  const data = await res.json();

  return (
    <>
      <p>
        If you are seeing this without any initial loading state then streaming
        is not working on Space micros!
      </p>
      <pre className="hidden">{JSON.stringify(data)}</pre>
    </>
  );
}
