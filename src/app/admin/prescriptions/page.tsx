'use client';

import {
  useEffect,
  useState,
} from 'react';

import { DashboardLayout } from '@/components/layout/dashboard-layout';

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  EmptyState,
} from '@/components/ui/empty-state';

import {
  LoadingTable,
} from '@/components/ui/loading-table';

import {
  PrescriptionStatusBadge,
} from '@/components/prescription-status-badge';

import {
  useProtectedRoute,
} from '@/hooks/useProtectedRoute';

import {
  useAuthStore,
} from '@/store/auth.store';

import {
  AdminPrescription,
} from '@/types/admin.types';

import {
  getAdminPrescriptions,
} from '@/services/admin.service';

export default function AdminPrescriptionsPage() {
  useProtectedRoute(['admin']);

  const { accessToken } =
    useAuthStore();

  const [
    prescriptions,

    setPrescriptions,
  ] = useState<
    AdminPrescription[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [statusFilter, setStatusFilter] =
    useState('all');

  const [search, setSearch] =
    useState('');

  const [startDate, setStartDate] =
    useState('');

  const [endDate, setEndDate] =
    useState('');

  async function loadData() {
    try {
      if (!accessToken) return;

      setLoading(true);

      const response =
        await getAdminPrescriptions(
          accessToken,

          page,

          10,

          statusFilter === 'all'
            ? undefined
            : statusFilter,

          search || undefined,

          startDate || undefined,

          endDate || undefined,
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
  }, [
    page,
    statusFilter,
    search,
    startDate,
    endDate,
  ]);

  return (
    <DashboardLayout title="Admin Prescriptions">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Todas las Prescripciones
        </h2>

        <p className="text-slate-500">
          Gestión administrativa de
          prescripciones
        </p>
      </div>

      {/* FILTERS */}

      <div className="mb-4 grid gap-4 md:grid-cols-4">
        {/* SEARCH */}

        <Input
          placeholder="Buscar..."
          value={search}
          onChange={(e) => {
            setPage(1);

            setSearch(e.target.value);
          }}
        />

        {/* STATUS */}

        <Select
          value={statusFilter}
          onValueChange={(value) => {
            setPage(1);

            setStatusFilter(value);
          }}
        >
          <SelectTrigger>
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

        {/* START DATE */}

        <Input
          type="date"
          value={startDate}
          onChange={(e) => {
            setPage(1);

            setStartDate(e.target.value);
          }}
        />

        {/* END DATE */}

        <Input
          type="date"
          value={endDate}
          onChange={(e) => {
            setPage(1);

            setEndDate(e.target.value);
          }}
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
                    Paciente
                  </TableHead>

                  <TableHead>
                    Doctor
                  </TableHead>

                  <TableHead>
                    Fecha
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                    >
                      <LoadingTable />
                    </TableCell>
                  </TableRow>
                ) : prescriptions.length ===
                  0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                    >
                      <EmptyState
                        title="Sin prescripciones"
                        description="No existen prescripciones registradas."
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
                        <TableCell>
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
                          <div>
                            <p className="font-medium">
                              {
                                prescription
                                  .patient
                                  .name
                              }
                            </p>

                            <p className="text-xs text-slate-500">
                              {
                                prescription
                                  .patient
                                  .email
                              }
                            </p>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div>
                            <p className="font-medium">
                              {
                                prescription
                                  .doctor
                                  .name
                              }
                            </p>

                            <p className="text-xs text-slate-500">
                              {
                                prescription
                                  .doctor
                                  .specialty
                              }
                            </p>
                          </div>
                        </TableCell>

                        <TableCell>
                          {new Date(
                            prescription.createdAt,
                          ).toLocaleDateString()}
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

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Página {page} de{' '}
          {totalPages}
        </p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() =>
              setPage(page - 1)
            }
          >
            Anterior
          </Button>

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