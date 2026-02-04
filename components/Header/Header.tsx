'use client';

import Link from 'next/link';
import css from './Header.module.css';

import AuthNavigation from '@/components/AuthNavigation/AuthNavigation';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const { user, isAuthenticated, clearIsAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.replace('/sign-in');
  };

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>

      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <Link href="/notes/filter/all">Notes</Link>
          </li>

          <AuthNavigation
            isAuthenticated={isAuthenticated}
            userEmail={user?.email}
            onLogout={handleLogout}
          />
        </ul>
      </nav>
    </header>
  );
}
