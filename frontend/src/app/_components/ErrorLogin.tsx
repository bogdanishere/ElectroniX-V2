export default function ErrorLogin({ error }: { error?: string }) {
  return <>{error && <div className="text-red-600 mb-4">{error}</div>}</>;
}
