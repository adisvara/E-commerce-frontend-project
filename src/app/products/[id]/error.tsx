'use client';

import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Something went wrong!</h2>
      <p className="mb-4">{error.message}</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
