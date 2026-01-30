'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { checkSession, logout } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

const privateRoutes = ['/profile', '/notes'];

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const user = await checkSession();

        if (user) {
          setUser(user);
        } else if (privateRoutes.some((route) => pathname.startsWith(route))) {
          await logout();
          clearIsAuthenticated();
          router.replace('/sign-in');
          return;
        }
      } catch {
        clearIsAuthenticated();
        router.replace('/sign-in');
        return;
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
