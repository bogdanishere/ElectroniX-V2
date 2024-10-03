export default function ErrorField({ error }: { error?: string }) {
  return (
    <>{error && <div className="text-red-600 mb-4 text-3xl">{error}</div>}</>
  );
}
