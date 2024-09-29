"use server";

import { signIn, signOut } from "@/auth";
import * as authentification from "@/network/api/authApi";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import * as address from "@/network/api/address";
import { NotFoundError } from "@/network/http-errors";

import * as command from "@/network/api/command";

import * as reviewApi from "@/network/api/review";

import * as search from "@/network/api/search";

import * as employeeRequests from "@/network/api/employee";
import * as providerRequests from "@/network/api/provider";

import { revalidatePath } from "next/cache";
import { getTokenUsername } from "@/helpers/getTokenUsername";

export async function loginGoogle() {
  await signIn("google", {
    redirectTo: "/electronix/1",
  });
}

interface ResponseLogin {
  token: string;
  username: string;
  type: string;
}

export async function loginEmail(data: FormData) {
  const email = data.get("email") as string;
  const password = data.get("password") as string;

  if (!email || !password) {
    return redirect(`/errorpage?error=${"Email and password are mandatory"}`);
  }

  const res: ResponseLogin = await authentification.loginClient(
    email,
    password
  );

  if (!res) {
    return redirect(`/errorpage?error=${"InvalidCredentials"}`);
  }

  cookies().set("login", JSON.stringify(res), {
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
  });

  if (res.type === "employee") {
    return redirect("/employee");
  }

  redirect("/electronix/1");
}

export async function logout() {
  cookies().delete("login");
  await signOut({
    redirectTo: "/electronix/1",
  });
}

export async function register(data: FormData) {
  const username = data.get("username") as string;
  const password = data.get("password") as string;
  const email = data.get("email") as string;
  const firstName = data.get("firstName") as string;
  const lastName = data.get("lastName") as string;

  const res = await authentification.registerClient(
    username,
    password,
    email,
    firstName,
    lastName
  );

  if (!username || !password || !email || !firstName || !lastName) {
    return redirect(`/errorpage?error=${"Add all fields"}`);
  }

  if (!res) {
    return redirect(`/errorpage?error=${"InvalidData"}`);
  }

  cookies().set("login", JSON.stringify(res), {
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });

  redirect("/electronix/1");
}

export async function addAddress(data: FormData) {
  const street = data.get("street") as string;
  const city = data.get("city") as string;
  const country = data.get("country") as string;
  const postal_code = data.get("postal_code") as string;
  const state = data.get("state") as string;

  if (!street || !city || !country || !postal_code || !state) {
    return redirect(`/errorpage?error=${"InvalidData"}`);
  }

  const { token, clientUsername: username } = await getTokenUsername();

  if (!username) {
    redirect("/login");
  }

  const res = await address.addAddress({
    username,
    street,
    city,
    country,
    postal_code,
    token,
    state,
  });

  if (!res) {
    return redirect(`/errorpage?error=${"InvalidData"}`);
  }

  redirect("/commands");
}

export async function checkAddress() {
  const { token, clientUsername: username } = await getTokenUsername();

  if (!username) {
    redirect("/login");
  }

  const res = await address.checkAddress({
    username,
    token,
  });

  if (!res) {
    return redirect(
      `/errorpage?error=${"There is a problem with the address"}`
    );
  }

  if (res instanceof NotFoundError || !res) {
    return false;
  }

  return true;
}

export async function paymentStripe(price: number, currency: string) {
  const { token, clientUsername: username } = await getTokenUsername();

  const res = await command.paymentStripe(+price, currency, token, username);

  redirect(res.url);
}

interface ObjectProducts {
  products: ProductsProp[];
}

interface ProductsProp {
  productId: string;
  providerUsername: string;
  quantity: number;
}

export async function commandConfirm(
  products: ObjectProducts,
  sessionId: string
) {
  const { token, clientUsername } = await getTokenUsername();

  const res = await command.addCommand(
    clientUsername,
    products,
    sessionId,
    token,
    clientUsername
  );

  if (!res) {
    return redirect(`/fatalerrorpage`);
  }

  revalidatePath("/orders");
}

export async function searchProducts(
  page: string,
  productName: string,
  sort: string
) {
  const res = await search.searchProducts(page, productName, sort);

  if (!res) {
    return redirect(`/search/${page}?error=${"InvalidData"}`);
  }

  return res;
}

export async function getOrders() {
  const { token, clientUsername } = await getTokenUsername();

  const res = await command.getOrders(clientUsername, token);

  if (!res) {
    return redirect(`/fatalerrorpage`);
  }

  return res;
}

export async function postReview({
  productID,
  title,
  review,
  rating,
}: {
  productID: string;
  title: string;
  review: string;
  rating: number;
}) {
  if (!productID || !title || !review || !rating) {
    return;
  }

  const { token, clientUsername } = await getTokenUsername();
  if (!clientUsername || !token) {
    return redirect(`/login`);
  }

  const res = await reviewApi.addReview({
    productID,
    title,
    review,
    clientUsername,
    rating,
    token,
  });

  if (!res) {
    return;
  }

  revalidatePath(`/product/${productID}`);

  return res;
}

export async function getOrdersEmployee(employee: string, token: string) {
  const res = await employeeRequests.getOrders({ employee, token });

  if (!res) {
    return redirect(`/fatalerrorpage`);
  }

  return res;
}

export async function getBrandCount(numberOfBrands: number) {
  const { token, clientUsername: employee } = await getTokenUsername();
  const res = await employeeRequests.getBrandCount({
    numberOfBrands,
    employee,
    token,
  });

  if (!res) {
    return redirect(`/fatalerrorpage`);
  }

  return res;
}

export async function confirmOrder({ orderID }: { orderID: number }) {
  const { token, clientUsername: employee } = await getTokenUsername();
  const res = await employeeRequests.confirmOrder({ orderID, employee, token });

  if (!res) {
    return redirect(`/fatalerrorpage`);
  }

  revalidatePath("/employee");

  return res;
}

export async function deleteOrder({ orderID }: { orderID: number }) {
  const { clientUsername: username, token } = await getTokenUsername();

  const res = await employeeRequests.deleteOrder({ orderID, token, username });

  if (!res) {
    return redirect(`/fatalerrorpage`);
  }

  revalidatePath("/employee");

  return res;
}

export async function addProviderProduct(formData: FormData) {
  const { clientUsername: providerUsername, token } = await getTokenUsername();
  const res = await providerRequests.addProviderProduct(
    formData,
    token,
    providerUsername
  );

  if (!res) {
    return redirect(`/fatalerrorpage`);
  }

  revalidatePath(`/provider/${formData.get("page")}`);
}

export async function showOrdersProvider() {
  const { clientUsername: username, token } = await getTokenUsername();

  const res = await providerRequests.getProviderOrders(username, token);

  if (!res) {
    return redirect(`/fatalerrorpage`);
  }

  return res;
}

export async function confirmProviderOrder(
  orderDetailId: number,
  page: number | string
) {
  const { clientUsername: username, token } = await getTokenUsername();
  const res = await providerRequests.confirmProviderOrder(
    orderDetailId,
    token,
    username
  );

  if (!res) {
    return redirect(`/fatalerrorpage`);
  }

  revalidatePath(`/provider/${page}`);

  return res;
}

export async function deleteProviderOrder(
  orderDetailId: number,
  page: number | string
) {
  const { clientUsername: username, token } = await getTokenUsername();
  const res = await providerRequests.deleteProviderOrder(
    orderDetailId,
    token,
    username
  );

  if (!res) {
    return redirect(`/fatalerrorpage`);
  }

  revalidatePath(`/provider/${page}`);

  return res;
}

export async function getProviderProducts(page: number) {
  const { clientUsername: username, token } = await getTokenUsername();

  const res = await providerRequests.getProviderProducts(username, token, page);

  if (!res) {
    return redirect(`/fatalerrorpage`);
  }

  return res;
}

export async function deleteProviderProduct(
  productId: string,
  page: number | string
) {
  const { clientUsername: username, token } = await getTokenUsername();

  const res = await providerRequests.deleteProviderProduct(
    productId,
    token,
    username
  );

  if (!res) {
    return redirect(`/fatalerrorpage`);
  }

  revalidatePath(`/provider/${page}`);

  return res;
}
