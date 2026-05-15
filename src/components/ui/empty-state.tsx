import {
  FileSearch,
} from 'lucide-react';

interface EmptyStateProps {
  title: string;

  description: string;
}

export function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 rounded-full bg-slate-100 p-4">
        <FileSearch className="h-8 w-8 text-slate-500" />
      </div>

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}