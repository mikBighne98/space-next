import RevalidateForm from './form';
import Link from 'next/link';
import { removeTodo } from '@/actions';
import { getAllItems } from '@/db';

export default async function RevalidatePage() {
  const data = await getAllItems({ tags: ['todos'] });
  const sortedData = data.items.sort((a, b) => a.createdAt - b.createdAt);

  return (
    <div className="flex flex-col gap-4 mt-48">
      <RevalidateForm />
      <ul className="flex flex-col gap-2">
        {sortedData.map((item) => (
          <li
            key={item.key}
            className="flex justify-between items-center border-b pb-2 last:border-b-0 gap-1"
          >
            <Link
              href={`/${item.key}`}
              className="w-full hover:text-neutral-900 transition-colors rounded-md"
            >
              {item.todo}
            </Link>
            <form action={removeTodo.bind(null, item.key)}>
              <button
                type="submit"
                className="bg-neutral-100 shadow-sm border py-0.5 px-2 rounded-md"
              >
                x
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
