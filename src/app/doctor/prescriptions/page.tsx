'use client';

import {
  useEffect,
  useState,
} from 'react';

import Link from 'next/link';

import {
  FileText,
  Plus,
} from 'lucide-react';

import { DashboardLayout } from '@/components/layout/dashboard-layout';

import {
  Card,
  CardContent,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import { useProtectedRoute } from '@/hooks/useProtectedRoute';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { LoadingTable } from '@/components/ui/loading-table';

import { EmptyState } from '@/components/ui/empty-state';

import {
  Prescription,
} from '@/types/prescription.types';

import { useAuthStore } from '@/store/auth.store';

import {
  getDoctorPrescriptions,
} from '@/services/prescriptions.service';

import { PrescriptionStatusBadge } from '@/components/prescription-status-badge';

export default function DoctorPrescriptionsPage() {
  const { accessToken } =
    useAuthStore();

  useProtectedRoute(['doctor']);

  const [
    prescriptions,
    setPrescriptions,
  ] = useState<Prescription[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [statusFilter, setStatusFilter] =
    useState<string>('all');

  const [search, setSearch] =
    useState('');

  async function loadData() {
    try {
      if (!accessToken) return;

      setLoading(true);

      const response =
        await getDoctorPrescriptions(
          accessToken,

          page,

          5,

          statusFilter === 'all'
            ? undefined
            : statusFilter,

          search.length >= 2
            ? search
            : undefined,
        );

      setPrescriptions(
        response.data,
      );

      setTotalPages(
        response.meta.totalPages,
      );
    }

    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [page, statusFilter, search]);

  return (
    <DashboardLayout title="Doctor Dashboard">

      {/* HEADER */}

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
            <FileText className="h-7 w-7 text-violet-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Prescripciones
            </h2>

            <p className="text-sm text-slate-500">
              Gestión de recetas médicas
            </p>
          </div>
        </div>

        <Link href="/doctor/prescriptions/new">
          <Button className="gap-2 bg-violet-600 hover:bg-violet-700">
            <Plus className="h-4 w-4" />

            Nueva Prescripción
          </Button>
        </Link>
      </div>

      {/* FILTERS */}

      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center">

        {/* SEARCH */}

        <Input
          placeholder="Buscar por código, medicamento o nota..."
          value={search}
          onChange={(e) => {
            setPage(1);

            setSearch(e.target.value);
          }}
          className="max-w-md"
        />

        {/* STATUS FILTER */}

        <Select
          value={statusFilter}
          onValueChange={(value) => {
            setPage(1);

            setStatusFilter(value);
          }}
        >
          <SelectTrigger className="w-full md:w-[220px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              Todos
            </SelectItem>

            <SelectItem value="pending">
              Pendientes
            </SelectItem>

            <SelectItem value="consumed">
              Consumidas
            </SelectItem>
          </SelectContent>
        </Select>
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

                  <TableHead>
                    Medicamentos
                  </TableHead>

                  <TableHead className="text-right">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <LoadingTable />
                    </TableCell>
                  </TableRow>
                ) : prescriptions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <EmptyState
                        title="Sin prescripciones"
                        description="No se encontraron resultados para la búsqueda actual."
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

                        <TableCell>
                          {
                            prescription.items
                              .length
                          }
                        </TableCell>

                        <TableCell className="text-right">
                          <Link
                            href={`/doctor/prescriptions/${prescription.id}`}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                            >
                              Ver detalle
                            </Button>
                          </Link>
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

      {/* PAGINATION */}

      <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-500">
          Página {page} de {totalPages}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() =>
              setPage(page - 1)
            }
          >
            Anterior
          </Button>

          {Array.from(
            {
              length: totalPages,
            },
            (_, i) => i + 1,
          ).map((p) => (
            <Button
              key={p}
              variant={
                p === page
                  ? 'default'
                  : 'outline'
              }
              size="sm"
              className={
                p === page
                  ? 'min-w-[36px] bg-violet-600 hover:bg-violet-700'
                  : 'min-w-[36px]'
              }
              onClick={() =>
                setPage(p)
              }
            >
              {p}
            </Button>
          ))}

          <Button
            variant="outline"
            disabled={
              page === totalPages
            }
            onClick={() =>
              setPage(page + 1)
            }
          >
            Siguiente
          </Button>
        </div>
      </div>

    </DashboardLayout>
  );
}