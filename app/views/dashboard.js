export function dashboardView({ session }) {

    const message = session 
        ? `Welcome ${session.email}, this is your account page`
        : `Welcome to the home page,  sign in to get personalized content`

    return`
        <h2>User:</h2>
        <p>${message}</p>

        <h2>User:</h2>
        <p>Welcome ${user.firstname} ${user.lastname} (${user.email})</p>

        <h3>Phone Numbers:</h3>
        <ul>
            ${phones.map(p => `<li>${p.phone}</li>`).join("")}
        </ul>

        <h3>Addresses:</h3>
        <ul>
            ${addresses.map(a => `<li>${a.address}</li>`).join("")}
        </ul>
    `
}