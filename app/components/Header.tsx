'use client';
import { useCorbado } from '@corbado/react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { logout, isAuthenticated } = useCorbado();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">My App</h1>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              ログアウト
            </button>
          )}
        </div>
      </div>
    </header>
  );
} 