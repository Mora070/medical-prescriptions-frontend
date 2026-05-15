'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FileText, LayoutDashboard, Pill, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth.store';
import { logout } from '@/lib/auth';
import { Button } from '@/components/ui/button';

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface DashboardSidebarProps {
  role: 'admin' | 'doctor' | 'patient';
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuthStore();

  function handleLogout() {
    logout();
    router.push('/login');
  }

  let items: SidebarItem[] = [];

  if (role === 'admin') {
    items = [
      {
        label: 'Dashboard',
        href: '/admin',

        icon: (
          <LayoutDashboard
            className="h-4 w-4"
          />
        ),
      },

      {
        label: 'Prescripciones',
        href:
          '/admin/prescriptions',

        icon: (
          <FileText className="h-4 w-4" />
        ),
      },
    ];
  }
  if (role === 'doctor') {
    items = [{ label: 'Prescripciones', href: '/doctor/prescriptions', icon: <FileText className="h-5 w-5" /> }];
  }
  if (role === 'patient') {
    items = [{ label: 'Mis Prescripciones', href: '/patient/prescriptions', icon: <Pill className="h-5 w-5" /> }];
  }

  return (
    <aside className="h-full w-64 border-r bg-white">
      {/* LOGO */}
      <div className="border-b px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
            <Pill className="h-5 w-5 text-violet-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">MedPrescriptions</h2>
        </div>
      </div>

      {/* USER INFO */}
      <div className="border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-white font-semibold text-sm">
            {user?.email?.[0]?.toUpperCase() ?? 'U'}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-900">{user?.email}</p>
            <span className="inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold uppercase text-slate-500 tracking-wide">
              {role}
            </span>
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav className="flex-1 space-y-1 p-4">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all',
                active
                  ? 'bg-violet-50 text-violet-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div className="border-t p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-slate-600 hover:text-slate-900"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Cerrar sesión
        </Button>
      </div>
    </aside>
  );
}