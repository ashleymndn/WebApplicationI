import redirect from "../redirect.js";
import {
    createUserDetails,
    deleteUserDetails,
    setDefaultAddress,
    updateAddress,
} from "../models/userDetails.js";

// ADD ADDRESS
export async function addAddressController(ctx) {
    const { session, request, headers } = ctx;

    if (!session) return redirect(headers, "/login");

    const formData = await request.formData();

    await createUserDetails({
        email: session.email,
        phone: formData.get("phone"),
        address: formData.get("address"),
        city: formData.get("city"),
        country: formData.get("country"),
        isDefault: 0
    });

    return redirect(headers, "/cart");
}

// DELETE ADDRESS
export async function deleteAddressController(ctx) {
  const { session, request, headers } = ctx;
  if (!session) return redirect(headers, "/login");

  const formData = await request.formData();
  const id = formData.get("id");
  const action = formData.get("action");

  if (action === "remove")  {
    return redirect(headers, "/cart");
  }

  await deleteUserDetails(id, session.email);

  return redirect(headers, "/cart");
}

// SET DEFAULT ADDRESS
export async function setDefaultController(ctx) {
    const { session, request, headers } = ctx;

    if (!session) return redirect(headers, "/login");

    const formData = await request.formData();

    await setDefaultAddress(formData.get("id"), session.email);

    return redirect(headers, "/cart");
}

export async function editAddressController(ctx) {
    const { session, request, headers } = ctx;
    if (!session) return redirect(headers, "/login");

    const formData = await request.formData();
    const id = formData.get("id");

    if (!id) return redirect(headers, "/cart");

    await updateAddress(id, session.email, {
        phone: formData.get("phone"),
        address: formData.get("address"),
        city: formData.get("city"),
        country: formData.get("country")
    });

    return redirect(headers, "/cart");
}