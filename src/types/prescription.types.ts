export interface PrescriptionItem {
  id: string;

  name: string;

  dosage?: string;

  quantity?: number;

  instructions?: string;
}

export interface Patient {
  id: string;

  name: string;

  email: string;
}

export interface Prescription {
  id: string;

  code: string;

  status: 'pending' | 'consumed';

  notes?: string;

  createdAt: string;

  consumedAt?: string;

  patient?: {
    user?: {
      name: string;
    };
  };

  items: PrescriptionItem[];
}

export interface PaginatedPrescriptions {
  data: Prescription[];

  meta: {
    total: number;

    page: number;

    limit: number;

    totalPages: number;
  };
}

export interface CreatePrescriptionItemDto {
  name: string;

  dosage?: string;

  quantity?: number;

  instructions?: string;
}

export interface CreatePrescriptionDto {
  patientId: string;

  notes?: string;

  items: CreatePrescriptionItemDto[];
}