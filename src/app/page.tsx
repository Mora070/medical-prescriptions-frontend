import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Shield, BarChart3, Download, Users, CheckCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden">

      {/* NAV */}
      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 py-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
            <FileText className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-slate-900">MedPrescriptions</span>
        </div>
        <Link href="/login">
          <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white">
            Iniciar sesión
          </Button>
        </Link>
      </nav>

      {/* HERO */}
      <section className="relative mx-auto max-w-6xl px-4 pt-14 pb-12 sm:px-6 lg:px-8 lg:pt-20 lg:pb-16">

        {/* fondo decorativo */}
        <div className="pointer-events-none absolute -top-10 right-0 h-[520px] w-[520px] rounded-full bg-violet-50 blur-3xl opacity-60" />
        <div className="pointer-events-none absolute top-40 -left-20 h-[300px] w-[300px] rounded-full bg-indigo-50 blur-2xl opacity-50" />

        <div className="relative flex flex-col items-start max-w-2xl">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
            Plataforma médica segura
          </span>

          <h1 className="text-3xl sm:text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-slate-900">
            Prescripciones médicas,{' '}
            <span className="text-violet-600">sin fricciones.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-500 max-w-xl">
            Gestiona recetas, verifica identidades y genera PDFs con firma digital.
            Diseñado para médicos, pacientes y administradores.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link href="/login">
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white px-8 h-12">
                Comenzar ahora
              </Button>
            </Link>
            <span className="text-sm text-slate-400 flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Sin tarjeta requerida
            </span>
          </div>
        </div>

        {/* DEMO CARD flotante */}
        <div className="relative mt-16 rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-100 overflow-hidden">
          {/* barra superior imitando browser */}
          <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-amber-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
            <div className="ml-4 flex-1 rounded-md bg-white border border-slate-200 px-3 py-1 text-xs text-slate-400">
              medprescriptions.app/doctor/prescriptions
            </div>
          </div>

          {/* mini tabla demo */}
          <div className="p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-base font-semibold text-slate-900">Prescripciones</div>
                <div className="text-xs text-slate-400">Gestión de recetas médicas</div>
              </div>
              <div className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-medium text-white">
                + Nueva Prescripción
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-100 text-sm">
              <div className="grid min-w-[600px] grid-cols-4 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500">
                <span>Código</span>
                <span>Estado</span>
                <span>Fecha</span>
                <span>Acciones</span>
              </div>
              {[
                { code: 'RX-DEMO-001', status: 'Pendiente', color: 'amber', date: '14/05/2026' },
                { code: 'RX-DEMO-002', status: 'Consumida', color: 'green', date: '13/05/2026' },
                { code: 'RX-DEMO-003', status: 'Consumida', color: 'green', date: '12/05/2026' },
              ].map((row, i) => (
                <div key={i} className="grid min-w-[600px] grid-cols-4 items-center px-4 py-3 border-t border-slate-100">
                  <span className="font-mono text-xs text-slate-700">{row.code}</span>
                  <span>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                      row.color === 'green'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${row.color === 'green' ? 'bg-green-500' : 'bg-amber-500'}`} />
                      {row.status}
                    </span>
                  </span>
                  <span className="text-xs text-slate-500">{row.date}</span>
                  <span className="text-xs text-violet-600 font-medium cursor-pointer hover:underline">Ver detalle →</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Todo lo que necesitas</h2>
          <p className="mt-3 text-slate-500">Una plataforma, tres roles, cero complicaciones.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: FileText,
              color: 'violet',
              title: 'Gestión de Prescripciones',
              desc: 'Los médicos crean, consultan y administran recetas con filtros, paginación y estados en tiempo real.',
            },
            {
              icon: Download,
              color: 'indigo',
              title: 'Portal de Pacientes',
              desc: 'Los pacientes consultan, consumen y descargan sus prescripciones como PDF con código QR y firma digital.',
            },
            {
              icon: BarChart3,
              color: 'violet',
              title: 'Dashboard Administrativo',
              desc: 'Métricas, charts y estadísticas del sistema para administradores con visión completa de la plataforma.',
            },
          ].map(({ icon: Icon, color, title, desc }, i) => (
            <div key={i} className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
              <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50`}>
                <Icon className="h-5 w-5 text-violet-600" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">{title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ROLES */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900">Tres roles, una plataforma</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                role: 'Admin',
                icon: Shield,
                items: ['Ver prescripciones', 'Ver métricas', 'Dashboard con charts'],
              },
              {
                role: 'Doctor',
                icon: Users,
                items: ['Crear prescripciones', 'Listar y filtrar', 'Paginación avanzada'],
              },
              {
                role: 'Paciente',
                icon: FileText,
                items: ['Ver prescripciones', 'Consumir receta', 'Descargar PDF'],
              },
            ].map(({ role, icon: Icon, items }, i) => (
              <div key={i} className="rounded-2xl bg-white border border-slate-200 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100">
                    <Icon className="h-4 w-4 text-violet-600" />
                  </div>
                  <span className="font-semibold text-slate-900">{role}</span>
                </div>
                <ul className="space-y-2">
                  {items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="h-4 w-4 text-violet-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-6xl px-8 py-24 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Listo para empezar?</h2>
        <p className="mt-4 text-slate-500 max-w-md mx-auto">
          Accede con tus credenciales y gestiona prescripciones desde cualquier dispositivo.
        </p>
        <div className="mt-8">
          <Link href="/login">
            <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white px-10 h-12">
              Iniciar sesión
            </Button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-100 px-8 py-6">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-violet-600">
              <FileText className="h-3 w-3 text-white" />
            </div>
            <span className="text-xs font-medium text-slate-600">MedPrescriptions</span>
          </div>
          <span className="text-xs text-slate-400">Prueba técnica · Next.js + TypeScript</span>
        </div>
      </footer>

    </main>
  );
}