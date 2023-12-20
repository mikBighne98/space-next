'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { addItems, deleteItem } from './db';

export async function addTodo(formData: FormData) {
  const todo = formData.get('todo') as string;
  await addItems([{ key: crypto.randomUUID(), todo, createdAt: Date.now() }]);
  revalidateTag('todos');
}

export async function addTodoNRedirect(formData: FormData) {
  const todo = formData.get('todo') as string;
  const key = crypto.randomUUID();
  await addItems([{ key, todo, createdAt: Date.now() }]);
  revalidateTag('todos');
  redirect(`/${key}`);
}

export async function removeTodo(key: string) {
  await deleteItem(key);
  revalidateTag('todos');
}
