import { unstable_noStore as noStore } from 'next/cache';

export type TodoType = {
  key: string;
  todo: string;
  createdAt: number;
};

function baseInit() {
  noStore();
  const PROJECT_KEY = process.env.DETA_PROJECT_KEY;

  if (!PROJECT_KEY) {
    throw new Error('Project key is undefined');
  }

  const PROJECT_ID = PROJECT_KEY.split('_')[0];
  const DB_URL = `https://database.deta.sh/v1/${PROJECT_ID}/todos`;
  const DB_HEADERS = {
    'X-API-Key': PROJECT_KEY,
    'Content-Type': 'application/json',
  };

  return { DB_URL, DB_HEADERS };
}

export async function addItems(items: TodoType[]) {
  const { DB_URL, DB_HEADERS } = baseInit();

  try {
    const res = await fetch(`${DB_URL}/items`, {
      method: 'PUT',
      headers: DB_HEADERS,
      body: JSON.stringify({ items: items }),
    });

    if (!res.ok) {
      throw new Error('Failed to add items');
    }
  } catch (error) {
    throw error;
  }
}

export async function getItem(key: string) {
  const { DB_URL, DB_HEADERS } = baseInit();

  try {
    const res = await fetch(`${DB_URL}/items/${key}`, {
      method: 'GET',
      headers: DB_HEADERS,
    });

    if (!res.ok) {
      throw new Error('Failed to get item');
    }

    const data = await res.json();

    return data as {
      item: TodoType;
    };
  } catch (error) {
    throw error;
  }
}

export async function getAllItems({ tags }: { tags?: string[] }) {
  const { DB_URL, DB_HEADERS } = baseInit();

  try {
    const res = await fetch(`${DB_URL}/query`, {
      method: 'POST',
      headers: DB_HEADERS,
      cache: 'no-store',
      ...(tags && { next: { tags } }),
    });

    if (!res.ok) {
      throw new Error('Failed to get all data');
    }

    const data = await res.json();

    return data as {
      paging?: { size: number; last?: string };
      items: TodoType[];
    };
  } catch (error) {
    throw error;
  }
}

export async function deleteItem(key: string) {
  const { DB_URL, DB_HEADERS } = baseInit();

  try {
    const res = await fetch(`${DB_URL}/items/${key}`, {
      method: 'DELETE',
      headers: DB_HEADERS,
    });

    if (!res.ok) {
      throw new Error('Failed to delete item');
    }
  } catch (error) {
    throw error;
  }
}
