import axios from 'axios';
import type { Product, ProductsResponse } from '../types';

export async function getProducts(skip: number, limit: number): Promise<ProductsResponse> {
  const response = await axios.get<ProductsResponse>(`https://dummyjson.com/products`, {
    params: { skip, limit },
  });
  return response.data;
}

export async function addProduct(data: { title: string; description: string; price: number }): Promise<Product> {
  const response = await axios.post<Product>(`https://dummyjson.com/products/add`, data);
  return response.data;
}

export async function updateProduct(id: number, data: { title: string; description: string; price: number }): Promise<Product> {
  const response = await axios.put<Product>(`https://dummyjson.com/products/${id}`, data);
  return response.data;
}

export async function deleteProduct(id: number): Promise<Product> {
  const response = await axios.delete<Product>(`https://dummyjson.com/products/${id}`);
  return response.data;
}