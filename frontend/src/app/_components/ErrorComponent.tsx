interface ErrorComponentProps {
  error: string;
  children: React.ReactNode;
}

export default function ErrorComponent({
  error,
  children,
}: ErrorComponentProps) {
  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center p-[4.8rem]">
      <div className="bg-gray-50 border border-grey-100 rounded-md p-12 flex-shrink-0 flex-grow-0 max-w-6xl text-center flex flex-col gap-9">
        <div className="font-bold text-5xl">{error} </div>
        {children}
      </div>
    </div>
  );
}
