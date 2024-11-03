import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Home</h1>
          <nav className="flex flex-col space-y-4">
            <Link href="/tts" className="text-blue-600 hover:text-blue-800">
              Text to Speech
            </Link>
            <Link href="/login" className="text-blue-600 hover:text-blue-800">
              Login
            </Link>
          </nav>
        </div>
      </main>
    </div>
  );
}