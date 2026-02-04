'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { checkSession } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

const PRIVATE_ROUTES = ['/profile', '/notes'];

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isPrivateRoute = PRIVATE_ROUTES.some((route) =>
      pathname.startsWith(route)
    );

    if (!isPrivateRoute) {
      setIsLoading(false);
      return;
    }

    const verifySession = async () => {
      try {
        const user = await checkSession();

        if (!user) {
          clearIsAuthenticated();
          router.replace('/sign-in');
          return;
        }

        setUser(user);
      } catch {
        clearIsAuthenticated();
        router.replace('/sign-in');
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, [pathname, router, setUser, clearIsAuthenticated]);

  if (isLoading) {
    return <p style={{ textAlign: 'center' }}>Loading...</p>;
  }

  return <>{children}</>;
}
