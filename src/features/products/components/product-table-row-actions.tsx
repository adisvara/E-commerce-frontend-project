'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DataTableRowActions } from '@/components/table/data-table-row-actions';
import { deleteProduct } from '@/features/products/api';
import { useProductModal } from '@/store/useProductModel';
import type { Product } from './products-columns';
import { toast } from 'sonner';
import { usePaginationStore } from '@/store/pagination';

export function ProductTableRowActions({ product }: { product: Product }) {
  const queryClient = useQueryClient();
  const { open: openProductModal } = useProductModal();
  const { pagination } = usePaginationStore();
  const { pageIndex, pageSize } = pagination;

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (_, id) => {
      queryClient.setQueryData(['products', pageIndex, pageSize, []], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          products: old.products.filter((p: Product) => p.id !== id),
          total: old.total - 1,
        };
      });
      
      toast.success('Product deleted', {
        description: 'The product has been deleted successfully.',
      });
    },
    onError: (error) => {
      toast.error('Error deleting product', {
        description: error.message,
      });
    },
  });

  const handleEdit = () => {
    openProductModal(product);
  };

  const handleDelete = () => {
    deleteMutation.mutate(product.id);
  };

  const productWithLabel = { ...product, label: product.title };

  return (
    <DataTableRowActions
      row={productWithLabel}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
} 