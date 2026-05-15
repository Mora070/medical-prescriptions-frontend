import {
  Skeleton,
} from '@/components/ui/skeleton';

export function LoadingTable() {
  return (
    <div className="space-y-3 p-4">
      {Array.from({
        length: 5,
      }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4"
        >
          <Skeleton className="h-4 w-32" />

          <Skeleton className="h-4 w-24" />

          <Skeleton className="h-4 w-24" />

          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  );
}