import { getItem } from '@/db';

export default async function Todo({ params }: { params: { key: string } }) {
  const data = await getItem(params.key);
  return <pre className="mt-16">{JSON.stringify(data, null, 2)}</pre>;
}
