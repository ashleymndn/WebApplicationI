import redirect from "../redirect.js";
import render from "../render.js";
import { cartView } from "../views/cart.js";
import {
  createUserDetails,
  deleteUserDetails,
  getUserDetailsByEmail,
  setDefaultAddress,
  updateAddress
} from "../models/userDetails.js";
import { getCartByEmail, getCartItems } from "../models/cart.js";


export async function addAddressController(ctx) {
  const { session, headers, validated, isValid, errors } = ctx;

  if (!session) return redirect(headers, "/login");

  const email = session.email;
  const cart = getCartByEmail(email);
  const items = cart ? getCartItems(cart.id) : [];
  const details = getUserDetailsByEmail(email) || [];

  if (!isValid) {
    return render(cartView, {
      cart: items,
      addresses: details,
      errors
    }, ctx);
  }

  await createUserDetails({
    email,
    phone: validated.phone,
    address: validated.address,
    city: validated.city,
    country: validated.country,
    isDefault: 0
  });

  return redirect(headers, "/cart");
}


export async function deleteAddressController(ctx) {
  const { session, request, headers } = ctx;

  if (!session) return redirect(headers, "/login");

  const formData = await request.formData();
  const id = formData.get("id");

  if (!id) return redirect(headers, "/cart");

  await deleteUserDetails(id, session.email);

  return redirect(headers, "/cart");
}


export async function setDefaultController(ctx) {
  const { session, request, headers } = ctx;

  if (!session) return redirect(headers, "/login");

  const formData = await request.formData();
  const id = formData.get("id");

  if (!id) return redirect(headers, "/cart");

  await setDefaultAddress(id, session.email);

  return redirect(headers, "/cart");
}


export async function editAddressController(ctx) {
  const { session, headers, validated, isValid, errors } = ctx;

  if (!session) return redirect(headers, "/login");

  const email = session.email;
  const cart = getCartByEmail(email);
  const items = cart ? getCartItems(cart.id) : [];
  const details = getUserDetailsByEmail(email) || [];

  if (!isValid) {
    return render(cartView, {
      cart: items,
      addresses: details,
      errors
    }, ctx);
  }

  const id = validated.id;
  if (!id) return redirect(headers, "/cart");

  console.log(validated);

  await updateAddress(id, email, {
    phone: validated.phone,
    address: validated.address,
    city: validated.city,
    country: validated.country
  });

  return redirect(headers, "/cart");
}