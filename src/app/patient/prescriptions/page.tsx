'use client';

import {
  useEffect,
  useState,
} from 'react';

import {
  Download,
  FileText,
} from 'lucide-react';

import { toast } from 'sonner';

import { DashboardLayout } from '@/components/layout/dashboard-layout';

import { useProtectedRoute } from '@/hooks/useProtectedRoute';

import {
  Card,
  CardContent,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  LoadingTable,
} from '@/components/ui/loading-table';

import {
  EmptyState,
} from '@/components/ui/empty-state';

import { useAuthStore } from '@/store/auth.store';

import {
  Prescription,
} from '@/types/prescription.types';

import {
  consumePrescription,
  downloadPrescriptionPdf,
  getPatientPrescriptions,
} from '@/services/prescriptions.service';

import { PrescriptionStatusBadge } from '@/components/prescription-status-badge';

export default function PatientPrescriptionsPage() {
  const { accessToken } =
    useAuthStore();

  useProtectedRoute(['patient']);

  const [
    prescriptions,
    setPrescriptions,
  ] = useState<Prescription[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState('');

  async function loadData() {
    try {
      if (!accessToken) return;

      setLoading(true);

      const data =
        await getPatientPrescriptions(
          accessToken,

          search.length >= 2
            ? search
            : undefined,
        );

      setPrescriptions(data);
    }

    finally {
      setLoading(false);
    }
  }

  async function handleConsume(
    prescriptionId: string,
  ) {
    try {
      if (!accessToken) return;

      await consumePrescription(
        accessToken,
        prescriptionId,
      );

      toast.success(
        'Prescripción consumida',
      );

      loadData();
    }

    catch {
      toast.error(
        'Error al consumir',
      );
    }
  }

  async function handleDownloadPdf(
    prescriptionId: string,
  ) {
    try {
      if (!accessToken) return;

      const blob =
        await downloadPrescriptionPdf(
          accessToken,
          prescriptionId,
        );

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement('a');

      link.href = url;

      link.download =
        'prescription.pdf';

      link.click();

      window.URL.revokeObjectURL(
        url,
      );
    }

    catch {
      toast.error(
        'Error al descargar PDF',
      );
    }
  }

  useEffect(() => {
    loadData();
  }, [search]);

  return (
    <DashboardLayout title="Patient Dashboard">

      {/* HEADER */}

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
            <FileText className="h-7 w-7 text-emerald-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Mis Prescripciones
            </h2>

            <p className="text-sm text-slate-500">
              Consulta tus recetas médicas
            </p>
          </div>
        </div>
      </div>

      {/* SEARCH */}

      <div className="mb-4">
        <Input
          placeholder="Buscar por código, medicamento o nota..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="max-w-md"
        />
      </div>

      {/* TABLE */}

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    Código
                  </TableHead>

                  <TableHead>
                    Estado
                  </TableHead>

                  <TableHead>
                    Fecha
                  </TableHead>

                  <TableHead className="text-right">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <LoadingTable />
                    </TableCell>
                  </TableRow>
                ) : prescriptions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <EmptyState
                        title="Sin prescripciones"
                        description="No tienes prescripciones disponibles."
                      />
                    </TableCell>
                  </TableRow>
                ) : (
                  prescriptions.map(
                    (
                      prescription,
                    ) => (
                      <TableRow
                        key={
                          prescription.id
                        }
                      >
                        <TableCell className="font-medium">
                          {
                            prescription.code
                          }
                        </TableCell>

                        <TableCell>
                          <PrescriptionStatusBadge
                            status={
                              prescription.status
                            }
                          />
                        </TableCell>

                        <TableCell>
                          {new Date(
                            prescription.createdAt,
                          ).toLocaleDateString()}
                        </TableCell>

                        <TableCell className="text-right">
                          <div className="flex flex-wrap justify-end gap-2">
                            {prescription.status ===
                              'pending' && (
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    handleConsume(
                                      prescription.id,
                                    )
                                  }
                                  className="bg-emerald-600 hover:bg-emerald-700"
                                >
                                  Consumir
                                </Button>
                              )}

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleDownloadPdf(
                                  prescription.id,
                                )
                              }
                            >
                              <Download className="mr-2 h-4 w-4" />

                              PDF
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ),
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

    </DashboardLayout>
  );
}