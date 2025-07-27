'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { type Product } from '@/features/products/types';
import Image from 'next/image';

async function getProduct(id: string): Promise<Product> {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await response.json() as Product;
  return data;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image src={product.thumbnail} alt={product.title} className="w-full rounded-lg" />
        </div>
        <div>
          <p className="text-lg mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-2">Price: ${product.price}</p>
          <p className="text-md mb-2">Brand: {product.brand}</p>
          <p className="text-md mb-2">Category: {product.category}</p>
          <p className="text-md mb-2">Rating: {product.rating}</p>
        </div>
      </div>
    </div>
  );
}
