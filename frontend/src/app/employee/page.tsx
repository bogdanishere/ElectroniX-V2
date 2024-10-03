import { addProvider, getBrandCount, getOrdersEmployee } from "../_lib/actions";
import { formatDate } from "@/utils/formatDate";
import AcceptRejectCommandsByEmployee from "../_components/AcceptRejectCommandsByEmployee";
import SatisticsForEmployee from "../_components/SatisticsForEmployee";
import { verifyRestriction } from "@/helpers/verifyRestriction";
import { getTokenUsernameProfilePic } from "@/helpers/getUserDetails";
import InputField from "@/utils/InputField";
import Button from "@/utils/Button";

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
      <div className="grid grid-cols-7 font-bold bg-gray-200 p-5">
        <div className="flex justify-center">Order ID</div>
        <div className="flex justify-center">Client Username</div>
        <div className="flex justify-center">Address ID</div>
        <div className="flex justify-center">Employee Username</div>
        <div className="flex justify-center">Date Created</div>
        <div className="flex justify-center">Employee Approved</div>
        <div className="flex justify-center">Actions</div>
      </div>
      {orders.orders.length > 0 ? (
        orders.orders.map((order) => (
          <div
            key={order.order_id}
            className="grid grid-cols-7 border-b p-2 items-center"
          >
            <div className="flex justify-center">{order.order_id}</div>
            <div className="flex justify-center">{order.client_username}</div>
            <div className="flex justify-center">{order.address_id}</div>
            <div className="flex justify-center">{order.employee_username}</div>
            <div className="flex justify-center">
              {formatDate(order.date_created)}
            </div>
            <div className="flex justify-center">
              {order.employee_approved ? "Yes" : "No"}
            </div>

            <AcceptRejectCommandsByEmployee orderId={order.order_id} />
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center p-2">
          There are no orders needed to be verified.
        </div>
      )}

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
