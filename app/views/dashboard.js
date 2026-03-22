export function dashboardView({ session }) {

    const message = session 
        ? `Welcome ${session.email}, this is your account page`
        : `Welcome to the home page,  sign in to get personalized content`

    return`
        <h2>User:</h2>
        <p>${message}</p>

    
    `
}