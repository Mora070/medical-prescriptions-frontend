export interface AdminMetrics {
  totalPrescriptions: number;

  pendingPrescriptions: number;

  consumedPrescriptions: number;

  totalDoctors: number;

  totalPatients: number;
}

export interface AdminPrescription {
  id: string;

  code: string;

  status: 'pending' | 'consumed';

  notes?: string;

  createdAt: string;

  consumedAt?: string;

  patient: {
    id: string;

    name: string;

    email: string;
  };

  doctor: {
    id: string;

    name: string;

    email: string;

    specialty?: string;
  };

  items: {
    id: string;

    name: string;

    dosage?: string;

    quantity?: number;

    instructions?: string;
  }[];
}

export interface PaginatedAdminPrescriptions {
  data: AdminPrescription[];

  meta: {
    total: number;

    page: number;

    limit: number;

    totalPages: number;
  };
}