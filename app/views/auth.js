import { fragments } from "./errors.js";

export function loginFormView({ errors = { email: {} , password: {}} }) {   
    const {email, password} =  fragments(errors);
    
    
    return `
    <section aria-labelledby="login-heading" class="center">
        <h2 id="login-heading">Sign in to your account</h2>
        <p>Don't have an account? <a href="/register">Register Here</a> </p>
        <form method="POST" class="auth">
            <label for="login" class="center">Login</label>
            <br>
            <div class="Form_Item">       
            <input id="email" name="email" placeholder="Email"${email.value} required><br>
            ${email.message}
            <input id="password" name="password" type="password" placeholder="Password"${password.value} required><br>
            ${password.message}
            <button>Sign in</button>
        </form>
    </section>
    `
}

export function registrationFormView({ errors = { firstname: {} , lastname: {}, email: {}, password: {}}} ) {
    const {firstname, lastname, email, password} =  fragments(errors);
    
    return `
    <section aria-labelledby="register-heading" class="center">
        <h2 id="register-heading">Create an account</h2>
        <p>Already have an account? <a href="/login">Login Here</a> </p>
        <form method="POST" class="auth">
            <label for="signup" class="center">Sign up</label>
            <br>   
            <input id="text" name="firstname" placeholder="First Name"${firstname.value} required minLength="2"><br>
            ${firstname.message}
            <input id="text" name="lastname" placeholder="Last Name"${password.value} required minLength="2"><br>
            ${lastname.message}
            <input id="email" name="email" placeholder="Email"${email.value} required minLength="5"><br>
            ${email.message}
            <input id="password" name="password" type="password" placeholder="Password"${password.value} required minLength="8"><br>
            ${password.message}
            <input id="confirm" name="confirm_password" type="password" placeholder="Password">
            <button>Create my Account</button>
        </form>
        <script type="module" src="/assets/js/confirmPassword.js"></script>
    </section>
    `
}