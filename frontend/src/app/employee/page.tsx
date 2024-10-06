import { addProvider, getBrandCount, getOrdersEmployee } from "../_lib/actions";

import SatisticsForEmployee from "../_components/SatisticsForEmployee";
import { verifyRestriction } from "@/helpers/verifyRestriction";
import { getTokenUsernameProfilePic } from "@/helpers/getUserDetails";
import InputField from "@/utils/InputField";
import Button from "@/utils/Button";
import OrderEmployeeList from "../_components/OrderEmployeeList";

interface OrdersProps {
  orders: OrdersProp[];
  message: string;
}

interface OrdersProp {
  order_id: number;
  client_username: string;
  address_id: number;
  employee_username: string;
  date_created: string;
  employee_approved: boolean;
}

interface BrandSatisticsProps {
  brands: { brand: string; numar_produse: number }[];
}

export default async function Page() {
  await verifyRestriction("employee");

  const { username, token } = await getTokenUsernameProfilePic();

  const orders: OrdersProps = (await getOrdersEmployee(username, token)) || [];

  const brandSatistics: BrandSatisticsProps = (await getBrandCount(3)) || [];

  return (
    <div className="p-9">
      <OrderEmployeeList orders={orders} />

      <div className="pt-7 flex justify-center items-center">
        <AddProvider />
      </div>

      <div className="pt-9 flex justify-center items-center">
        <SatisticsForEmployee
          dataStatistics={brandSatistics.brands.map((brand) => ({
            name: brand.brand,
            value: brand.numar_produse,
            label: `${brand.brand} - ${brand.numar_produse}`,
          }))}
          width={1000}
          height={400}
        />
      </div>
    </div>
  );
}

function AddProvider() {
  return (
    <div className="max-w-md mx-auto mt-10 p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
        Add Provider
      </h2>
      <form action={addProvider} className="w-72">
        <InputField name="providerName" label="Provider Name" type={"text"} />
        <InputField name="providerEmail" label="Provider Email" type={"text"} />
        <InputField
          name="providerPassword"
          label="Provider Password"
          type={"password"}
        />
        <InputField
          name="confirmPassword"
          label="Confirm Password"
          type={"password"}
        />
        <Button type="submit">Add Provider</Button>
      </form>
    </div>
  );
}
