'use client';

import { useQuery } from '@tanstack/react-query';
import type { SortingState } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';

import { DataTable } from '@/components/table/data-table';
import { usePaginationStore } from '@/store/pagination';
import { columns } from '@/features/products/components/products-columns';

async function getProducts(skip: number, limit: number) {
  const response = await fetch(
    `https://dummyjson.com/products?skip=${skip}&limit=${limit}`,
  );
  const data = await response.json();
  return data;
}

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
    <DataTable
      columns={columns}
      data={data?.products || []}
    />
  );
}
