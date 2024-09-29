import Header from "@/app/_components/Header";

export const metadata = {
  title: "Electronix - For Business",
  description: "Electronix - For Business",
};

export default async function Page() {
  return (
    <>
      <Header text="For Business" />
      <div className="p-16 px-20 pb-24 bg-gray-100 w-auto h-[800px]">
        <div className="my-2 leading-6">
          ElectroniX introduces the &quot;For Business&quot; section,
          exclusively designed for companies and professionals seeking
          customized technological solutions to maximize efficiency and
          productivity.
        </div>
        <div className="my-2 leading-6">
          Our offerings include a wide range of products and services, from IT
          equipment and storage solutions to smart devices and cybersecurity
          solutions.
        </div>
        <div className="text-gray-900">
          Customized Solutions and Technical Support
        </div>
        <div className="my-2 leading-6">
          Benefit from specialized consulting and technical support to choose
          the best solutions for your business.
        </div>
      </div>
    </>
  );
}
