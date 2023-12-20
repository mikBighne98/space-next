'use client';

import { addTodoNRedirect } from '@/actions';
import { useRef } from 'react';
import { useFormStatus } from 'react-dom';

export default function RedirectForm() {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form ref={ref} action={addTodoNRedirect} className="flex flex-col gap-2">
      <input
        type="text"
        name="todo"
        placeholder="Enter a todo..."
        required
        autoFocus
        autoComplete="off"
        className="outline-none border-2 rounded-md h-9 border-neutral-100 focus:border-neutral-200 transition-colors px-2"
      />
      <SubmitButton />
    </form>
  );
}

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`bg-neutral-100 shadow-sm border px-4 h-9 rounded-md hover:bg-neutral-200/70 active:bg-neutral-200 transition-colors ${
        pending ? 'opacity-60' : ''
      }`}
      disabled={pending}
    >
      {pending ? 'Adding todo...' : 'Add todo'}
    </button>
  );
}
