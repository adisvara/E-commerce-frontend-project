'use client';

import { useQuery } from '@tanstack/react-query';
import type { SortingState } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { DataTable } from '@/components/table/data-table';
import { usePaginationStore } from '@/store/pagination';
import { columns } from '@/features/products/components/products-columns';
import { AddProductForm } from './add-product-form';
import { EditProductForm } from './edit-product-form';
import { getProducts } from '@/features/products/api';

export function ProductsTable() {
  const { pagination, setTotalCount } = usePaginationStore();
  const { pageIndex, pageSize } = pagination;
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data, isLoading,error } = useQuery({
    queryKey: ['products', pageIndex, pageSize, sorting],
    queryFn: () => getProducts(pageIndex * pageSize, pageSize),
  });

  useEffect(() => {
    if (data) {
      setTotalCount(data.total);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>
          Error: {(error as Error).message}
      </div>;
  }

  return (
    <div>
      <DataTable
        columns={columns}
        data={data?.products || []}
      />
      <EditProductForm />
      <div className="m-4">
        <h2 className="text-2xl font-bold m-2">Add New Product</h2>
        <AddProductForm />
      </div>
    </div>
  );
}
