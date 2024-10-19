"use server";

import { signIn, signOut } from "@/auth";
import * as authentification from "@/network/api/authApi";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import * as address from "@/network/api/address";

import * as command from "@/network/api/command";

import * as reviewApi from "@/network/api/review";

import * as search from "@/network/api/search";

import * as employeeRequests from "@/network/api/employee";
import * as providerRequests from "@/network/api/provider";

import * as update from "@/network/api/updateProfile";

import { revalidatePath } from "next/cache";
import { getTokenUsernameProfilePic } from "@/helpers/getUserDetails";
import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from "@/network/http-errors";

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
    return redirect(`/login?error=${"Email and password are mandatory"}`);
  }

  try {
    const res: ResponseLogin = await authentification.loginClient(
      email,
      password
    );
    cookies().set("login", JSON.stringify(res), {
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
    });

    return redirect("/electronix/1");
  } catch (error) {
    if (error instanceof NotFoundError) {
      return redirect(`/login?error=${"Invalid email or password"}`);
    }
  }
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

  if (!username || !password || !email || !firstName || !lastName) {
    return redirect(
      `/register?error=${"There is one field missing.Please retry again"}`
    );
  }

  try {
    const res = await authentification.registerClient(
      username,
      password,
      email,
      firstName,
      lastName
    );
    cookies().set("login", JSON.stringify(res), {
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });

    return redirect("/electronix/1");
  } catch (error) {
    if (error instanceof ConflictError) {
      return redirect(
        `/register?error=${"Username already exists. Please use another one."}`
      );
    }
    return redirect(
      `/errorpage?error=${"Something went wrong. Please retry again later."}`
    );
  }
}

export async function addAddress(data: FormData) {
  const street = data.get("street") as string;
  const city = data.get("city") as string;
  const country = data.get("country") as string;
  const postal_code = data.get("postal_code") as string;
  const state = data.get("state") as string;

  if (!street || !city || !country || !postal_code || !state) {
    return redirect(`/address?error=${"Missing fields"}`);
  }

  const { token, username } = await getTokenUsernameProfilePic();

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
    return redirect(
      `/errorpage?error=${"Something went wrong. Please retry again later."}`
    );
  }

  redirect("/commands");
}

export async function checkAddress() {
  const { token, username } = await getTokenUsernameProfilePic();

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

  if (!res.address) {
    return false;
  }

  return true;
}

export async function paymentStripe(price: number, currency: string) {
  const { token, username } = await getTokenUsernameProfilePic();

  if (!username || !token) {
    return redirect("/login");
  }

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
  const { token, username } = await getTokenUsernameProfilePic();

  if (!username || !token) {
    return redirect("/login");
  }

  await command.addCommand(username, products, sessionId, token, username);

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
  const { token, username } = await getTokenUsernameProfilePic();

  const res = await command.getOrders(username, token);

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

  const { token, username } = await getTokenUsernameProfilePic();
  if (!username || !token) {
    return redirect(`/login`);
  }

  try {
    const res = await reviewApi.addReview({
      productID,
      title,
      review,
      username,
      rating,
      token,
    });

    revalidatePath(`/product/${productID}`);

    return res;
  } catch (error) {
    return redirect(`/errorpage?error=${"InvalidData"}`);
  }
}

export async function getOrdersEmployee() {
  const { token, username: employee } = await getTokenUsernameProfilePic();

  try {
    const res = await employeeRequests.getOrders({ employee, token });

    return res;
  } catch (error) {
    if (error instanceof ForbiddenError) {
      return redirect(`/errorpage?error=${"You need to reconnect to the app"}`);
    }
    throw error;
  }
}

export async function getBrandCount(numberOfBrands: number) {
  const { token, username: employee } = await getTokenUsernameProfilePic();
  const res = await employeeRequests.getBrandCount({
    numberOfBrands,
    employee,
    token,
  });

  return res;
}

export async function confirmOrder({ orderID }: { orderID: number }) {
  const { token, username: employee } = await getTokenUsernameProfilePic();
  const res = await employeeRequests.confirmOrder({ orderID, employee, token });

  revalidatePath("/employee");

  return res;
}

export async function deleteOrder({ orderID }: { orderID: number }) {
  const { username: username, token } = await getTokenUsernameProfilePic();

  const res = await employeeRequests.deleteOrder({ orderID, token, username });

  revalidatePath("/employee");

  return res;
}

export async function addProvider(data: FormData) {
  const { token, username: employeeUsername } =
    await getTokenUsernameProfilePic();

  const providerName = data.get("providerName") as string;
  const providerEmail = data.get("providerEmail") as string;
  const providerPassword = data.get("providerPassword") as string;
  const confirmPassword = data.get("confirmPassword") as string;

  if (
    !providerName ||
    !providerEmail ||
    !providerPassword ||
    !confirmPassword
  ) {
    return { success: false, error: "Add all fields" };
  }

  if (providerPassword !== confirmPassword) {
    return { success: false, error: "Passwords do not match" };
  }

  return await employeeRequests.addProvider(
    providerName,
    providerEmail,
    providerPassword,
    employeeUsername,
    token
  );
}

export async function addProviderProduct(formData: FormData) {
  const { username: providerUsername, token } =
    await getTokenUsernameProfilePic();

  if (!providerUsername || !token) {
    return redirect("/login");
  }

  if (
    !formData.get("productName") ||
    !formData.get("price") ||
    !formData.get("quantity") ||
    !formData.get("categories") ||
    !formData.get("description") ||
    !formData.get("brand") ||
    !formData.get("weight") ||
    !formData.get("currency")
  ) {
    return redirect(`/errorpage?error=${"InvalidData"}`);
  }

  try {
    await providerRequests.addProviderProduct(
      formData,
      token,
      providerUsername
    );
  } catch (error) {
    redirect(`/errorpage?error=${"InvalidData"}`);
  }

  revalidatePath(`/provider/${formData.get("page")}`);
}

export async function showOrdersProvider() {
  try {
    const { username, token } = await getTokenUsernameProfilePic();

    if (!username || !token) {
      return redirect("/login");
    }

    const res = await providerRequests.getProviderOrders(username, token);

    return res;
  } catch (error) {
    if (error instanceof ForbiddenError) {
      return redirect(`/errorpage?error=${"You need to reconnect to the app"}`);
    }
    throw error;
  }
}

export async function confirmProviderOrder(
  orderDetailId: number,
  page: number | string
) {
  const { username, token } = await getTokenUsernameProfilePic();
  if (!username || !token) {
    return redirect("/login");
  }

  const res = await providerRequests.confirmProviderOrder(
    orderDetailId,
    token,
    username
  );

  revalidatePath(`/provider/${page}`);

  return res;
}

export async function deleteProviderOrder(
  orderDetailId: number,
  page: number | string
) {
  const { username, token } = await getTokenUsernameProfilePic();

  if (!username || !token) {
    return redirect("/login");
  }

  try {
    const res = await providerRequests.deleteProviderOrder(
      orderDetailId,
      token,
      username
    );

    revalidatePath(`/provider/${page}`);

    return res;
  } catch (error) {
    return redirect(`/errorpage?error=${"InvalidData"}`);
  }
}

export async function getProviderProducts(page: number) {
  try {
    const { username, token } = await getTokenUsernameProfilePic();

    if (!username || !token) {
      return redirect("/login");
    }

    const res = await providerRequests.getProviderProducts(
      username,
      token,
      page
    );

    return res;
  } catch (error) {
    if (error instanceof ForbiddenError) {
      return redirect(`/errorpage?error=${"You need to reconnect to the app"}`);
    }
    throw error;
  }
}

export async function deleteProviderProduct(
  productId: string,
  page: number | string
) {
  const { username, token } = await getTokenUsernameProfilePic();

  if (!username || !token) {
    return redirect("/login");
  }

  const res = await providerRequests.deleteProviderProduct(
    productId,
    token,
    username
  );

  revalidatePath(`/provider/${page}`);

  return res;
}

export async function updateProfile(profileImage: FormData) {
  const { username, token } = await getTokenUsernameProfilePic();

  if (!username || !token) {
    return redirect("/login");
  }

  const res = await update.updateProfile(username, token, profileImage);

  const loginCookies = cookies().get("login");

  const loginCookiesValue = loginCookies?.value || "{}";

  cookies().set(
    "login",
    JSON.stringify({
      ...JSON.parse(loginCookiesValue),
      image: res.image_profile,
    }),
    {
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    }
  );
}
