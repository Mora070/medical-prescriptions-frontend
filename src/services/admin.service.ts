import { api } from '@/lib/axios';

import {
  AdminMetrics,
  PaginatedAdminPrescriptions,
} from '@/types/admin.types';

export async function getAdminMetrics(
  accessToken: string,
): Promise<AdminMetrics> {
  const response = await api.get(
    '/admin/metrics',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
}

export async function getAdminPrescriptions(
  accessToken: string,

  page = 1,

  limit = 10,

  status?: string,

  search?: string,

  startDate?: string,

  endDate?: string,
): Promise<PaginatedAdminPrescriptions> {
  const response = await api.get(
    '/admin/prescriptions',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },

params: {
  page,
  limit,

  ...(status && { status }),

  ...(search && { search }),

  ...(startDate && {
    startDate,
  }),

  ...(endDate && {
    endDate,
  }),
},
    },
  );

  return response.data;
}