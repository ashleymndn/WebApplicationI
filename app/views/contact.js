import { fragments } from "./errors.js"

export function contactFormView({ errors = {}, values = {} }) {
    const errorDetails = fragments(errors);

    return `
    <h1>Contact Rindo Tea</h1>

    <form class="contact" method="POST" action="/contact">
        
        <input type="text" name="firstName" placeholder="First Name"
        value="${values.firstName || ""}"> ${errorDetails.firstName?.message || ""} <br>

        <input type="text" name="lastName" placeholder="Last Name"
            value="${values.lastName || ""}"> ${errorDetails.lastName?.message || ""} <br>

        <input type="email" name="email" placeholder="Email"
            value="${values.email || ""}"> ${errorDetails.email?.message || ""} <br>

        <input type="message" placeholder="Your Message"
            value="${values.message || ""}"> ${errorDetails.message?.message || ""} <br>

        <button type="submit">Send Message</button>
    </form>
  `;
}