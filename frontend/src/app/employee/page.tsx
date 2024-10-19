import { getBrandCount, getOrdersEmployee } from "../_lib/actions";

import SatisticsForEmployee from "../_components/SatisticsForEmployee";
import { verifyRestriction } from "@/helpers/verifyRestriction";
import OrderEmployeeList from "../_components/OrderEmployeeList";
import AddProvider from "../_components/AddProvider";

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

  const orders: OrdersProps = (await getOrdersEmployee()) || [];

  const brandSatistics: BrandSatisticsProps = (await getBrandCount(3)) || [];

  return (
    <div className="p-9">
      <OrderEmployeeList orders={orders} />

      <AddProvider />

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
