import redirect from "../redirect.js";
import render from "../render.js";
import { userSchemaRegister } from "../schema/user.js";
import { validateSchema } from "../validation.js";
import { registrationFormView } from "../views/auth.js";

export function registrationFormController({ request }) {
    return render(registrationFormView, {}, request);
}

export async function addUserController({ request }) {
    const formData = await request.formData();

    const {isValid, errors} = validateSchema(formData, userSchemaRegister);
    if (!isValid) {
        return render(registrationFormView, { errors }, request, 400);
    }

    const firstname = formData.get('firstname');
    const lastname = formData.get('lastname');
    const email = formData.get('email');
    const password = formData.get('password');


    // validate the incoming data here
    const validUser = true;

    const headers = new Headers();
    if (validUser) {
        //create the user record here
        console.log("firstname: ", firstname);
        console.log("lastname: ", lastname);
        console.log("email: ", email);
        console.log("password: ", password);
        return redirect(headers, "/", `User with '${email}' account created`)

    }
}