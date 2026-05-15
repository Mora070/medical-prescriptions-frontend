'use client';

import {
    useEffect,
    useState,
} from 'react';

import { useParams } from 'next/navigation';

import { DashboardLayout } from '@/components/layout/dashboard-layout';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import {
    Prescription,
} from '@/types/prescription.types';

import { useAuthStore } from '@/store/auth.store';

import {
    getDoctorPrescriptionById,
} from '@/services/prescriptions.service';

import { PrescriptionStatusBadge } from '@/components/prescription-status-badge';

import { useProtectedRoute } from '@/hooks/useProtectedRoute';

export default function PrescriptionDetailPage() {
    useProtectedRoute(['doctor']);

    const params = useParams();

    const { accessToken } =
        useAuthStore();

    const [
        prescription,

        setPrescription,
    ] = useState<Prescription | null>(
        null,
    );

    async function loadData() {
        if (!accessToken) return;

        const data =
            await getDoctorPrescriptionById(
                accessToken,

                params.id as string,
            );

        setPrescription(data);
    }

    useEffect(() => {
        loadData();
    }, []);

    if (!prescription) {
        return (
            <DashboardLayout title="Detalle Prescripción">
                <p>Cargando...</p>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Detalle Prescripción">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">
                        {prescription.code}
                    </h2>

                    <p className="text-slate-500">
                        Detalle de receta médica
                    </p>
                </div>

                <PrescriptionStatusBadge
                    status={prescription.status}
                />
            </div>

            <div className="grid gap-6">
                {/* INFO */}

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Información General
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm text-slate-500">
                                Fecha creación
                            </p>

                            <p>
                                {new Date(
                                    prescription.createdAt,
                                ).toLocaleString()}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Paciente
                            </p>

                            <p>
                                {prescription.patient?.user?.name ||
                                    '-'}
                            </p>
                        </div>

                        {prescription.notes && (
                            <div>
                                <p className="text-sm text-slate-500">
                                    Notas
                                </p>

                                <p>
                                    {prescription.notes}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* ITEMS */}

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Medicamentos
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>
                                        Medicamento
                                    </TableHead>

                                    <TableHead>
                                        Dosis
                                    </TableHead>

                                    <TableHead>
                                        Cantidad
                                    </TableHead>

                                    <TableHead>
                                        Indicaciones
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {prescription.items.map(
                                    (item) => (
                                        <TableRow
                                            key={item.id}
                                        >
                                            <TableCell>
                                                {item.name}
                                            </TableCell>

                                            <TableCell>
                                                {item.dosage ||
                                                    '-'}
                                            </TableCell>

                                            <TableCell>
                                                {item.quantity ||
                                                    '-'}
                                            </TableCell>

                                            <TableCell>
                                                {item.instructions ||
                                                    '-'}
                                            </TableCell>
                                        </TableRow>
                                    ),
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}