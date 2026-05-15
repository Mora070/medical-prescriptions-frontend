'use client';

import {
  useEffect,
} from 'react';

import {
  useRouter,
} from 'next/navigation';

import {
  useAuthStore,
} from '@/store/auth.store';

type Role =
  | 'admin'
  | 'doctor'
  | 'patient';

export function useProtectedRoute(
  allowedRoles: Role[],
) {
  const router = useRouter();

  const { user } =
    useAuthStore();

  useEffect(() => {
    // NO SESSION

    if (!user) {
      router.push('/login');

      return;
    }

    // INVALID ROLE

    if (
      !allowedRoles.includes(
        user.role,
      )
    ) {
      router.push('/login');
    }
  }, [user]);
}