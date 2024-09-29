export default function Header({
  text = "Bine ati venit la Magazinul nostru, ElectroniX",
}: {
  text?: string;
}) {
  return (
    <header className="bg-gray-400 flex justify-center items-center p-5 border-b border-gray-200">
      <div className="text-xl font-semibold">{text}</div>
    </header>
  );
}
