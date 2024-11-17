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
  orderEmployeeId: number;
  clientUsername: string;
  addressId: number;
  employeeUsername: string;
  dateCreated: string;
  employeeApproved: boolean;
}

interface BrandSatisticsProps {
  brands: { brand: string; _count: { brand: number } }[];
}

export default async function Page() {
  await verifyRestriction("EMPLOYEE");

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
            value: brand._count.brand,
            label: `${brand.brand} - ${brand._count.brand}`,
          }))}
          width={1000}
          height={400}
        />
      </div>
    </div>
  );
}
