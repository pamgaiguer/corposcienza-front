export default function Loading() {
  return (
    <div className="min-h-screen flex-1 bg-gray-50 p-8">
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Carregando formulário de edição...</p>
        </div>
      </div>
    </div>
  );
}
