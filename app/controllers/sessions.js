import redirect from "../redirect.js";
import render from "../render.js";
import { loginFormView } from "../views/auth.js";

export function loginFormController({ request }) {
    return render(loginFormView, {}, request);
}

export async function addSessionController({ request }) {
    const formData = await request.formData();
    const email = formData.get('email');
    const _password = formData.get('password');

    // validate the incoming data here
    const validCredentials = true;

    const headers = new Headers();
    if (validCredentials) {
        //create the session here
        console.log("session created for user: ", email);
        return redirect(headers, "/", `Logged in as '${email}'`)

    }
    
}