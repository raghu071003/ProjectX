export default function ErrorBanner({ message }) {
  if (!message) return null;

  return (
    <div className="mb-4 p-3 border border-red-400 bg-red-50 text-red-800 rounded">
      {message}
    </div>
  );
}
