'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { Card } from '@/components/ui/card';

import { Input } from '@/components/ui/input';

import {
  loginRequest,
  profileRequest,
} from '@/services/auth.service';

import { useAuthStore } from '@/store/auth.store';

interface LoginFormData {
  email: string;

  password: string;
}

export default function LoginPage() {
  const router = useRouter();

  const { setAuth } = useAuthStore();

  const [loading, setLoading] =
    useState(false);

  const {
    register,

    handleSubmit,
  } = useForm<LoginFormData>();

  async function onSubmit(
    data: LoginFormData,
  ) {
    try {
      setLoading(true);

      const loginResponse =
        await loginRequest(
          data.email,
          data.password,
        );

      const profile =
        await profileRequest(
          loginResponse.accessToken,
        );

      setAuth(
        loginResponse.accessToken,
        loginResponse.refreshToken,
        profile,
      );

      toast.success(
        'Inicio de sesión exitoso',
      );

      // =========================
      // REDIRECT POR ROL
      // =========================

      if (profile.role === 'admin') {
        router.push('/admin');
      }

      else if (
        profile.role === 'doctor'
      ) {
        router.push(
          '/doctor/prescriptions',
        );
      }

      else {
        router.push(
          '/patient/prescriptions',
        );
      }
    }

    catch {
      toast.error(
        'Credenciales inválidas',
      );
    }

    finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <Card className="w-full max-w-md p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            Medical Prescriptions
          </h1>

          <p className="text-sm text-slate-500">
            Inicia sesión para continuar
          </p>
        </div>

        <form
          onSubmit={handleSubmit(
            onSubmit,
          )}
          className="space-y-4"
        >
          <div>
            <Input
              type="email"
              placeholder="Correo electrónico"
              {...register('email')}
            />
          </div>

          <div>
            <Input
              type="password"
              placeholder="Contraseña"
              {...register('password')}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? 'Ingresando...'
              : 'Ingresar'}
          </Button>
        </form>
      </Card>
    </main>
  );
}