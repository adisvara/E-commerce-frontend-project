'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { type Product } from '@/features/products/types';
import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import { ProductTableRowActions } from '@/features/products/components/product-table-row-actions';
import Link from 'next/link';
import Image from 'next/image';



export const columns: ColumnDef<Product, unknown>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    size: 50,
    enableSorting: false,
  },
  {
    accessorKey: 'thumbnail',
    header: 'Image',
    cell: (info) => (
      <Image
        src={info.getValue() as string}
        alt={info.row.original.title}
        width={50}
        height={50}
        style={{ objectFit: 'contain' }} 
      />
    ),
    size: 60,
    enableSorting: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Title" />
    ),
    cell: (info) => (
      <Link href={`/products/${info.row.original.id}`} className="hover:underline">
      {info.getValue() as string}
      </Link>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: (info) => (
      <div className="max-w-[300px] truncate" title={info.getValue() as string}>
        {info.getValue() as string}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: (info) => `${(info.getValue() as number).toFixed(2)}`,
  },
  {
    accessorKey: 'discountPercentage',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Discount" />
    ),
    cell: (info) => `${(info.getValue() as number).toFixed(2)}%`,
    enableSorting: false,
  },
  {
    accessorKey: 'rating',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rating" />
    ),
    cell: (info) => (
      <div className="flex items-center gap-1">
        <span>{(info.getValue() as number).toFixed(1)}</span>
        <span
          className={`text-sm ${
            (info.getValue() as number) >= 4
              ? 'text-green-500'
              : (info.getValue() as number) >= 3
                ? 'text-yellow-500'
                : 'text-red-500'
          }`}
        >
          ★
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'stock',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
    cell: (info) => (
      <span
        className={`px-2 py-1 rounded-full text-sm ${
          (info.getValue() as number) > 50
            ? 'bg-green-100 text-green-800'
            : (info.getValue() as number) > 20
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
        }`}
      >
        {info.getValue() as number}
      </span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    cell: (info) => {
      const tags = info.getValue() as string[] | undefined;
      if (!tags || !Array.isArray(tags)) {
        return <span className="text-gray-400">No tags</span>;
      }
      return (
        <div className="flex gap-1 flex-wrap">
          {tags.map((tag: string) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 rounded-full text-xs text-black"
            >
              {tag}
            </span>
          ))}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'brand',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Brand" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'weight',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Weight (g)" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'dimensions',
    header: 'Dimensions',
    cell: (info) => {
      const dim = info.getValue() as {
        width: number;
        height: number;
        depth: number;
      };
      return dim ? `${dim.width}×${dim.height}×${dim.depth} cm` : '-';
    },
    enableSorting: false,
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
    enableSorting: false,
  },
  {
    accessorKey: 'warrantyInformation',
    header: 'Warranty',
    enableSorting: false,
  },
  {
    accessorKey: 'shippingInformation',
    header: 'Shipping',
    enableSorting: false,
  },
  {
    accessorKey: 'availabilityStatus',
    header: 'Availability',
    cell: (info) => (
      <span
        className={`px-2 py-1 rounded-full text-sm ${
          info.getValue() === 'In Stock'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {info.getValue() as string}
      </span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'returnPolicy',
    header: 'Return Policy',
    enableSorting: false,
  },
  {
    accessorKey: 'minimumOrderQuantity',
    header: 'Min. Order',
    enableSorting: false,
  },
  {
    accessorKey: 'meta.updatedAt',
    header: 'Last Updated',
    cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => <ProductTableRowActions product={row.original} />,
  },
];
