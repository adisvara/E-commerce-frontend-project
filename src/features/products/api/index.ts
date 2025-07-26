import axios from 'axios';

export async function getProducts(skip: number, limit: number) {
  const response = await axios.get(`https://dummyjson.com/products`, {
    params: { skip, limit },
  });
  return response.data;
}

export async function addProduct(data: { title: string; description: string; price: number }) {
  const response = await axios.post(`https://dummyjson.com/products/add`, data);
  return response.data;
}

export async function updateProduct(id: number, data: { title: string; description: string; price: number }) {
  const response = await axios.put(`https://dummyjson.com/products/${id}`, data);
  return response.data;
}

export async function deleteProduct(id: number) {
  const response = await axios.delete(`https://dummyjson.com/products/${id}`);
  return response.data;
}