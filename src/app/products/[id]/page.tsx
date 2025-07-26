'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

async function getProduct(id: string) {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await response.json();
  return data;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={data.thumbnail} alt={data.title} className="w-full rounded-lg" />
        </div>
        <div>
          <p className="text-lg mb-4">{data.description}</p>
          <p className="text-xl font-semibold mb-2">Price: ${data.price}</p>
          <p className="text-md mb-2">Brand: {data.brand}</p>
          <p className="text-md mb-2">Category: {data.category}</p>
          <p className="text-md mb-2">Rating: {data.rating}</p>
        </div>
      </div>
    </div>
  );
}
