import { Badge } from '@/components/ui/badge';

interface Props {
  status: 'pending' | 'consumed';
}

export function PrescriptionStatusBadge({
  status,
}: Props) {
  if (status === 'consumed') {
    return (
      <Badge className="border-0 bg-green-100 text-green-700 hover:bg-green-100">
        Consumida
      </Badge>
    );
  }

  return (
    <Badge className="border-0 bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
      Pendiente
    </Badge>
  );
}