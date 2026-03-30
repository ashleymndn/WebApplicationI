import { fragments } from "./errors.js"

export function contactFormView({ errors = {}, values = {} }) {
    const errorDetails = fragments(errors);

    return `
    <h1>Contact Rindo Tea</h1>

    <form class="contact" method="POST" action="/contact">
        
        <input type="text" name="firstName" placeholder="First Name"
        value="${values.firstName || ""}">
        ${errorDetails.firstName?.message || ""}

        <input type="text" name="lastName" placeholder="Last Name"
            value="${values.lastName || ""}">
        ${errorDetails.lastName?.message || ""}

        <input type="email" name="email" placeholder="Email"
            value="${values.email || ""}">
        ${errorDetails.email?.message || ""}

        <textarea name="message" placeholder="Your Message">${values.message || ""}</textarea>
        ${errorDetails.message?.message || ""}
        <button type="submit">Send Message</button>
    </form>
  `;
}