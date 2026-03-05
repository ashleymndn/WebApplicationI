export function loginFormView() {
    return `
    <section aria-labelledby="login-heading" class="center">
        <h2 id="login-heading">Sign in to your account</h2>
        <p>Don't have an account? <a href="/register">Register Here</a> </p>
        <form method="POST" class="auth">
            <label for="loginS" class="center">Login</label>
            <br>
            <input id="email" name="email" placeholder="Email">
            <label for="email" class="center"></label>
            <input id="password" name="password" type="password" placeholder="Password">
            <label for="password" class="center"></label>
            <button>Sign in</button>
        </form>
    </section>
    `
}

export function registrationFormView() {
    return `
    <section aria-labelledby="register-heading" class="center">
        <h2 id="register-heading">Create an account</h2>
        <p>Already have an account? <a href="/login">Login Here</a> </p>
        <form method="POST" class="auth">
            <label for="signup" class="center">Sign up</label>
            <br>   
            <input id="firstname" name="firstname" placeholder="First Name">
            <label for="firstname" class="center"></label>
            <input id="lastname" name="lastname" placeholder="Last Name">
            <label for="lastname" class="center"></label>
            <input id="email" name="email" placeholder="Email" >
            <label for="email" class="center"></label>
            <input id="password" name="password" type="password" placeholder="Password">
            <label for="password" class="center"></label>
            <input id="password" name="password" type="password" placeholder="Re-Enter Password">
            <label for="password" class="center"></label>
            <button>Create my Account</button>
        </form>
    </section>
    `
}