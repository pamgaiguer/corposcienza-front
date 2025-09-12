export default function Loading() {
  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando formulário de edição...</p>
        </div>
      </div>
    </div>
  );
}
