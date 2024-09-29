import Header from "@/app/_components/Header";
export const metadata = {
  title: "Electronix - Privacy & terms",
  description: "Electronix - Privacy & terms",
};

export default async function Page() {
  return (
    <>
      <Header text="Privacy & terms" />
      <div className="p-16 px-20 pb-24 bg-gray-100 w-auto h-[800px]">
        <br />
        <div>
          This section details our privacy policies and terms of use for the
          website. It is important to read them carefully to understand how your
          personal information is used and what your rights are regarding our
          services.
        </div>
        <div>
          For any questions or concerns related to these policies, please
          contact us.
        </div>
      </div>
    </>
  );
}
