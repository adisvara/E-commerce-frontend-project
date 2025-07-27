import { create } from 'zustand';
import type { Product } from '@/features/products/types';

interface ProductModalState {
  isOpen: boolean;
  product: Product | null;
  open: (product: Product) => void;
  close: () => void;
}

export const useProductModal = create<ProductModalState>((set) => ({
  isOpen: false,
  product: null,
  open: (product) => set({ isOpen: true, product }),
  close: () => set({ isOpen: false, product: null }),
}));
