'use client';

import { ReactNode } from 'react';

import {
  Bell,
  Menu,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import {
  DashboardSidebar,
} from './dashboard-sidebar';

import {
  useAuthStore,
} from '@/store/auth.store';

interface DashboardLayoutProps {
  title: string;

  children: ReactNode;
}

export function DashboardLayout({
  title,
  children,
}: DashboardLayoutProps) {
  const { user } =
    useAuthStore();

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">

      {/* DESKTOP SIDEBAR */}

      {user && (
        <div className="hidden lg:block">
          <DashboardSidebar
            role={
              user?.role as
                | 'admin'
                | 'doctor'
                | 'patient'
            }
          />
        </div>
      )}

      {/* MAIN */}

      <div className="flex min-w-0 flex-1 flex-col">

        {/* HEADER */}

        <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-4 md:px-8">

            {/* LEFT */}

            <div className="flex min-w-0 items-center gap-3">

              {/* MOBILE SIDEBAR */}

              {user && (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="shrink-0 lg:hidden"
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>

                  <SheetContent
                    side="left"
                    className="w-72 p-0"
                  >
                    {/* ACCESSIBILITY */}

                    <div className="sr-only">
                      <SheetTitle>
                        Menú de navegación
                      </SheetTitle>

                      <SheetDescription>
                        Sidebar principal del dashboard
                      </SheetDescription>
                    </div>

                    {/* SIDEBAR */}

                    <DashboardSidebar
                      role={
                        user?.role as
                          | 'admin'
                          | 'doctor'
                          | 'patient'
                      }
                    />
                  </SheetContent>
                </Sheet>
              )}

              {/* TITLE */}

              <div className="min-w-0">
                <h1 className="truncate text-base font-semibold text-slate-900 md:text-lg">
                  {title}
                </h1>

                <p className="hidden truncate text-xs text-slate-500 sm:block">
                  
                </p>
              </div>
            </div>

            {/* RIGHT */}

            <div className="flex shrink-0 items-center gap-2 md:gap-3">

              {/* NOTIFICATIONS */}

              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex"
              >
                <Bell className="h-5 w-5" />
              </Button>

              {/* AVATAR */}

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white">
                {user?.email?.[0]?.toUpperCase() ??
                  'U'}
              </div>

              {/* USER EMAIL */}

              <span className="hidden max-w-[180px] truncate text-sm text-slate-700 md:block">
                {user?.email}
              </span>
            </div>
          </div>
        </header>

        {/* CONTENT */}

        <main className="flex-1 overflow-x-hidden p-4 md:p-8">
          <div className="mx-auto w-full max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}