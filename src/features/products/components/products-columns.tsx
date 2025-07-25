'use client';
import type { ColumnDef, CellContext } from '@tanstack/react-table';

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

export const columns: ColumnDef<Product, any>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 50,
  },
  {
    accessorKey: 'thumbnail',
    header: 'Image',
    cell: (info: CellContext<Product, string>) => (
      <img
        src={info.getValue()}
        alt={info.row.original.title}
        style={{ width: 50, height: 50, objectFit: 'contain' }}
      />
    ),
    size: 60,
  },
  {
    accessorKey: 'title',
    header: 'Product Title',
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: (info: CellContext<Product, string>) => (
      <div className="max-w-[300px] truncate" title={info.getValue()}>
        {info.getValue()}
      </div>
    ),
  },
  {
    accessorKey: 'price',
    header: 'Price ($)',
    cell: (info: CellContext<Product, number>) => `$${info.getValue().toFixed(2)}`,
  },
  {
    accessorKey: 'discountPercentage',
    header: 'Discount (%)',
    cell: (info: CellContext<Product, number>) => `${info.getValue().toFixed(2)}%`,
  },
  {
    accessorKey: 'rating',
    header: 'Rating',
    cell: (info: CellContext<Product, number>) => (
      <div className="flex items-center gap-1">
        <span>{info.getValue().toFixed(1)}</span>
        <span className={`text-sm ${
          info.getValue() >= 4 ? 'text-green-500' : 
          info.getValue() >= 3 ? 'text-yellow-500' : 
          'text-red-500'
        }`}>★</span>
      </div>
    ),
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: (info: CellContext<Product, number>) => (
      <span className={`px-2 py-1 rounded-full text-sm ${
        info.getValue() > 50 ? 'bg-green-100 text-green-800' : 
        info.getValue() > 20 ? 'bg-yellow-100 text-yellow-800' : 
        'bg-red-100 text-red-800'
      }`}>
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    cell: (info: CellContext<Product, string[]>) => (
      <div className="flex gap-1 flex-wrap">
        {info.getValue()?.map((tag: string) => (
          <span key={tag} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-black">
            {tag}
          </span>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'brand',
    header: 'Brand',
  },
  {
    accessorKey: 'weight',
    header: 'Weight (g)',
  },
  {
    accessorKey: 'dimensions',
    header: 'Dimensions',
    cell: (info: CellContext<Product, Product['dimensions']>) => {
      const dim = info.getValue();
      return dim ? `${dim.width}×${dim.height}×${dim.depth} cm` : '-';
    },
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
  },
  {
    accessorKey: 'warrantyInformation',
    header: 'Warranty',
  },
  {
    accessorKey: 'shippingInformation',
    header: 'Shipping',
  },
  {
    accessorKey: 'availabilityStatus',
    header: 'Availability',
    cell: (info: CellContext<Product, string>) => (
      <span className={`px-2 py-1 rounded-full text-sm ${
        info.getValue() === 'In Stock' ? 'bg-green-100 text-green-800' : 
        'bg-red-100 text-red-800'
      }`}>
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorKey: 'returnPolicy',
    header: 'Return Policy',
  },
  {
    accessorKey: 'minimumOrderQuantity',
    header: 'Min Order Qty',
  },
  {
    accessorKey: 'meta.updatedAt',
    header: 'Last Updated',
    cell: (info: CellContext<Product, string>) => new Date(info.getValue()).toLocaleDateString(),
  },
]