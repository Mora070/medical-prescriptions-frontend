import { useAuthStore } from '@/store/auth.store';

export function getAuthUser() {
  return useAuthStore.getState().user;
}

export function logout() {
  useAuthStore.getState().logout();
}