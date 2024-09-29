import Header from "@/app/_components/Header";

export const metadata = {
  div: "Electronix - About us",
  description: "Electronix - About us",
};

export default async function Page() {
  return (
    <>
      <Header text="About us" />
      <div className="p-16 px-20 pb-24 bg-gray-100 w-auto h-[800px]">
        <br />
        ElectroniX represents the culmination of our efforts to bring technology
        closer to consumers in Romania, offering an intuitive and accessible
        online platform for purchasing a wide range of electronic and household
        products. Launched in 2024, our website stands out for its ease of
        navigation, modern design, and simplified search and purchase process,
        making it easier for users to access the latest innovations in the tech
        world. With an impressive variety of products, from laptops and
        smartphones to refrigerators and washing machines, ElectroniX aims to
        meet the technological needs of every customer. Our products are
        carefully selected, ensuring that every item listed on the site meets
        high standards of quality and performance. The advanced search
        functionality allows users to filter products based on various criteria,
        including price, manufacturer, technical specifications, and customer
        reviews, ensuring a personalized and efficient shopping experience. In
        addition, ElectroniX provides detailed descriptions and high-quality
        images for each product, making it easier to make informed purchasing
        decisions. Aware of the importance of post-sale support, ElectroniX
        offers a dedicated support team ready to address any questions or
        concerns regarding our products. Our return process is also simple and
        fast, ensuring that every customer remains fully satisfied with their
        shopping experience. Through our commitment to innovation and excellence
        in customer service, ElectroniX aspires to become the leader in
        Romania&apos;s e-commerce market, transforming each purchase into a
        pleasant and memorable experience.
      </div>
    </>
  );
}
