import Navbar from "@/components/navbar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {ProductsTable} from '@/features/products/components/products-table'
//import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function HomePage() {
  

  return (
    <main className="min-h-screen overflow-auto">
      <Navbar />
      <ScrollArea className="h-[200px] w-full rounded-md border p-4">
        <ProductsTable/>
      </ScrollArea>
      
      
    </main>
  );
}