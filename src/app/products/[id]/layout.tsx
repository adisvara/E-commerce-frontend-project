import { type Metadata } from 'next';
import { type Product } from '@/features/products/components/products-columns';

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await res.json();
  return data;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);
  return {
    title: `${product.title} - Products`,
  };
}


export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
