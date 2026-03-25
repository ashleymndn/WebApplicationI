import { deleteCookie, getCookies, setCookie } from "@std/http/cookie";
import { createSession, deleteSession, getSession } from "./models/sessions.js";

export function login(headers, email) {
    //create session record
    const sessionId = createSession(email);

    
    // add cookie to response
    setCookie(headers, {
        name: "sessionId",
        value: sessionId,
        path: "/"
    })
    console.log("created session");
    
    
}

export function currentSession(headers) {
    const { sessionId } = getCookies(headers);
    return sessionId && getSession(sessionId);
}

export function logout(headers, sessionId) {
    deleteSession(sessionId);
    deleteCookie(headers, "sessionId", { path: "/" });
}

export function getUser(request) {
    const cookie = request.headers.get("cookie");

    if (!cookie) return null;

    const sessionId = cookie
        .split("; ")
        .find(c => c.startsWith("sessionId="))
        ?.split("=")[1];

    if (!sessionId) return null;

    const session = getSession(sessionId);

    return session ? { email: session.email } : null;
}