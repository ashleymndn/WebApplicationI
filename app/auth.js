import { setCookie } from "@std/http/cookie";
import { createSession } from "./models/sessions.js";

export function login(headers, email) {
    //create session record
    const sessionId = createSession(email);

    
    // add cookie to response
    setCookie(headers, {
        name: "sessionId",
        value: sessionId,
        path: "/"
    })
}