import TTSForm from '@/components/TTSForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Text to Speech</h1>
        <TTSForm />
      </div>
    </div>
  );
}