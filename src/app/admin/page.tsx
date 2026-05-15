'use client';

import {
  useEffect,
  useState,
} from 'react';

import {
  Pie,
  PieChart,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useAuthStore } from '@/store/auth.store';

import {
  getAdminMetrics,
} from '@/services/admin.service';

import {
  AdminMetrics,
} from '@/types/admin.types';

export default function AdminPage() {
  const { accessToken } =

    useAuthStore();

  useProtectedRoute(['admin']);
  
  const [metrics, setMetrics] =
    useState<AdminMetrics | null>(
      null,
    );

  async function loadData() {
    if (!accessToken) return;

    const data =
      await getAdminMetrics(
        accessToken,
      );

    setMetrics(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  const chartData = [
    {
      name: 'Pendientes',
      value:
        metrics?.pendingPrescriptions ||
        0,
      fill: '#94a3b8',
    },

    {
      name: 'Consumidas',
      value:
        metrics?.consumedPrescriptions ||
        0,
      fill: '#0f172a',
    },
  ];

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Dashboard Administrativo
        </h2>

        <p className="text-slate-500">
          Métricas generales del
          sistema
        </p>
      </div>

      {/* METRICS */}

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>
              Prescripciones
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {
                metrics?.totalPrescriptions
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Pendientes
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {
                metrics?.pendingPrescriptions
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Médicos
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {metrics?.totalDoctors}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Pacientes
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {
                metrics?.totalPatients
              }
            </p>
          </CardContent>
        </Card>
      </div>

      {/* CHART */}

      <Card>
        <CardHeader>
          <CardTitle>
            Estado de Prescripciones
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center">
          <PieChart
            width={500}
            height={320}
          >
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={110}
              label={({
                percent,
              }) =>
                `${(
                  (percent ?? 0) * 100
                ).toFixed(0)}%`
              }
            >
              {chartData.map(
                (entry) => (
                  <Cell
                    key={entry.name}
                    fill={entry.fill}
                  />
                ),
              )}
            </Pie>

            <Tooltip />

            <Legend
              verticalAlign="bottom"
              height={36}
            />
          </PieChart>

          <div className="mt-4 flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-slate-400" />

              <span>
                Pendientes:{' '}
                {
                  metrics?.pendingPrescriptions
                }
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-slate-900" />

              <span>
                Consumidas:{' '}
                {
                  metrics?.consumedPrescriptions
                }
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}