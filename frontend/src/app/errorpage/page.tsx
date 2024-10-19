import ErrorPage from "../_components/ErrorPage";

export default async function Page({
  searchParams,
}: {
  searchParams: { error: string };
}) {
  return (
    <div>
      <ErrorPage
        error={
          searchParams.error || "There is an problem. PLease retry again later"
        }
      />
    </div>
  );
}
