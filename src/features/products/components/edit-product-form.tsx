'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import React, { useEffect, useState } from 'react';
import type { SortingState } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { updateProduct } from '@/features/products/api';
import { useProductModal } from '@/store/useProductModel';
import type { Product } from '@/features/products/components/products-columns';
import { usePaginationStore } from '@/store/pagination';
import { ScrollArea } from '@/components/ui/scroll-area';

const productSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  price: z.number().min(0, { message: 'Price is required' }),
  discountPercentage: z.number().min(0),
  rating: z.number().min(0),
  stock: z.number().min(0),
  tags: z.array(z.string()).optional(),
  brand: z.string().min(1, { message: 'Brand is required' }),
  sku: z.string().min(1, { message: 'SKU is required' }),
  weight: z.number().min(0),
  dimensions: z.object({
    width: z.number().min(0),
    height: z.number().min(0),
    depth: z.number().min(0),
  }),
  warrantyInformation: z.string().optional(),
  shippingInformation: z.string().optional(),
  availabilityStatus: z.string().optional(),
  returnPolicy: z.string().optional(),
  minimumOrderQuantity: z.number().min(0),
  meta: z.object({
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    barcode: z.string().optional(),
    qrCode: z.string().optional(),
  }).optional(),
  images: z.array(z.string()).optional(),
  thumbnail: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export function EditProductForm() {
  const queryClient = useQueryClient();
  const { isOpen, product, close } = useProductModal();
  const { pagination } = usePaginationStore();
  const { pageIndex, pageSize } = pagination;
  const [sorting] = useState<SortingState>([]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: product?.title || '',
      description: product?.description || '',
      price: product?.price || 0,
    },
  });


  useEffect(() => {
    if (product) {
      form.reset({
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        stock: product.stock,
        tags: product.tags || [],
        brand: product.brand,
        sku: product.sku,
        weight: product.weight,
        dimensions: product.dimensions,
        warrantyInformation: product.warrantyInformation || '',
        shippingInformation: product.shippingInformation || '',
        availabilityStatus: product.availabilityStatus || '',
        returnPolicy: product.returnPolicy || '',
        minimumOrderQuantity: product.minimumOrderQuantity,
        meta: product.meta || {},
        images: product.images || [],
        thumbnail: product.thumbnail || '',
      });
    }
  }, [product, form]);

  const mutation = useMutation({
    mutationFn: (values: ProductFormValues) => updateProduct(product!.id, values),
    onSuccess: (updatedFields) => {
      queryClient.setQueryData(['products', pageIndex, pageSize, sorting], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          products: old.products.map((p: Product) =>
            p.id === product!.id ? { ...p, ...updatedFields } : p
          ),
        };
      });
      
      toast.success('Product updated', {
        description: 'The product has been updated successfully.',
      });
      close();
    },
    onError: (error) => {
      toast.error('Error updating product', {
        description: error.message,
      });
    },
  });

  const onSubmit = (values: ProductFormValues) => {
    console.log('Submitting values:', values);
    if (product) {
      mutation.mutate(values);
    }
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="h-[32rem] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update the details of the product.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea  className="h-[24rem] max-h-[calc(32rem-8rem)] pr-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 space-y-4">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Product title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Product description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="price" render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Product price" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="discountPercentage" render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Percentage</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Discount %" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="rating" render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Rating" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="stock" render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Stock" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="tags" render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (comma separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="tag1,tag2,tag3" value={field.value?.join(',') || ''} onChange={e => field.onChange(e.target.value.split(',').map(tag => tag.trim()).filter(Boolean))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="brand" render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input placeholder="Brand" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="sku" render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input placeholder="SKU" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="weight" render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (g)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Weight" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormLabel>Dimensions (cm)</FormLabel>
              <div className="flex gap-2">
                <FormField control={form.control} name="dimensions.width" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Width</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Width" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="dimensions.height" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Height" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="dimensions.depth" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Depth</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Depth" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="warrantyInformation" render={({ field }) => (
                <FormItem>
                  <FormLabel>Warranty Information</FormLabel>
                  <FormControl>
                    <Input placeholder="Warranty Information" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="shippingInformation" render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Information</FormLabel>
                  <FormControl>
                    <Input placeholder="Shipping Information" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="availabilityStatus" render={({ field }) => (
                <FormItem>
                  <FormLabel>Availability Status</FormLabel>
                  <FormControl>
                    <Input placeholder="Availability Status" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="returnPolicy" render={({ field }) => (
                <FormItem>
                  <FormLabel>Return Policy</FormLabel>
                  <FormControl>
                    <Input placeholder="Return Policy" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="minimumOrderQuantity" render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Order Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Minimum Order Quantity" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormLabel>Meta</FormLabel>
              <div className="flex gap-2">
                <FormField control={form.control} name="meta.createdAt" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Created At</FormLabel>
                    <FormControl>
                      <Input placeholder="Created At" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="meta.updatedAt" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Updated At</FormLabel>
                    <FormControl>
                      <Input placeholder="Updated At" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="meta.barcode" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Barcode</FormLabel>
                    <FormControl>
                      <Input placeholder="Barcode" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="meta.qrCode" render={({ field }) => (
                  <FormItem>
                    <FormLabel>QR Code</FormLabel>
                    <FormControl>
                      <Input placeholder="QR Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="images" render={({ field }) => (
                <FormItem>
                  <FormLabel>Images (comma separated URLs)</FormLabel>
                  <FormControl>
                    <Input placeholder="url1,url2,url3" value={field.value?.join(',') || ''} onChange={e => field.onChange(e.target.value.split(',').map(url => url.trim()).filter(Boolean))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="thumbnail" render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Thumbnail URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            <DialogFooter className="shrink-0">
              <Button type="button" variant="outline" onClick={close}>
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Updating...' : 'Update Product'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
