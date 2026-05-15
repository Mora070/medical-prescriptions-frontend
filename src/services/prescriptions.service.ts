import { api } from '@/lib/axios';

import {
  PaginatedPrescriptions,
  CreatePrescriptionDto,
  Prescription,
  Patient,
  
} from '@/types/prescription.types';


export async function getDoctorPrescriptions(
  accessToken: string,

  page = 1,

  limit = 10,

  status?: string,

  search?: string,
): Promise<PaginatedPrescriptions> {
  const response = await api.get(
    '/prescriptions',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },

      params: {
        page,
        limit,
        status,
        search,
      },
    },
  );

  return response.data;
}

export async function getDoctorPrescriptionById(
  accessToken: string,

  prescriptionId: string,
): Promise<Prescription> {
  const response = await api.get(
    `/prescriptions/${prescriptionId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
}

export async function createPrescription(
  accessToken: string,

  data: CreatePrescriptionDto,
): Promise<Prescription> {
  const response = await api.post(
    '/prescriptions',

    data,

    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
}

export async function getPatientPrescriptions(
  accessToken: string,

  search?: string,
): Promise<Prescription[]> {
  const response = await api.get(
    '/patients/me/prescriptions',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },

      params: {
        search,
      },
    },
  );

  return response.data;
}

export async function consumePrescription(
  accessToken: string,

  prescriptionId: string,
) {
  const response = await api.put(
    `/patients/prescriptions/${prescriptionId}/consume`,

    {
      consumed: true,
    },

    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
}


export async function downloadPrescriptionPdf(
  accessToken: string,

  prescriptionId: string,
) {
  const response = await api.get(
    `/patients/prescriptions/${prescriptionId}/pdf`,

    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },

      responseType: 'blob',
    },
  );

  return response.data;
}

export async function getPatients(
  accessToken: string,
): Promise<Patient[]> {
  const response = await api.get(
    '/patients',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
}