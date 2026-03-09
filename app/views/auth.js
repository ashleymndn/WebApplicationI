import { escape } from "@std/html/entities";

export function loginFormView({ errors = { email: {} , password: {}} }) {
    console.log(errors);
    
    const {email, password} = Object.fromEntries(Object.keys(errors).map(key => {
        const { error, value, message } = errors[key] || {};
        return [key, {
            value: value ? `value="${escape(value)}"` : "",
            message: error ?`<p class="error">${escape(message)}</p>` : ""
        }];
    }));
    
    console.log(email);
    console.log(password);
    
    
    
    return `
    <section aria-labelledby="login-heading" class="center">
        <h2 id="login-heading">Sign in to your account</h2>
        <p>Don't have an account? <a href="/register">Register Here</a> </p>
        <form method="POST" class="auth">
            <label for="loginS" class="center">Login</label>
            <br>
            <div class="Form_Item">       
            <input id="email" name="email" placeholder="Email"${email.value}><br>
            ${email.message}
            <input id="password" name="password" type="password" placeholder="Password"${password.value}><br>
            ${password.message}
            <button>Sign in</button>
        </form>
    </section>
    `
}

export function registrationFormView({ errors } ) {
    console.log(errors);
    
    return `
    <section aria-labelledby="register-heading" class="center">
        <h2 id="register-heading">Create an account</h2>
        <p>Already have an account? <a href="/login">Login Here</a> </p>
        <form method="POST" class="auth">
            <label for="signup" class="center">Sign up</label>
            <br>   
            <input id="text" name="firstname" placeholder="First Name"><br>
            <input id="text" name="lastname" placeholder="Last Name"><br>
            <input id="email" name="email" placeholder="Email" ><br>
            <input id="password" name="password" type="password" placeholder="Password"><br>
            <input id="password" name="password" type="password" placeholder="Re-Enter Password">
            <button>Create my Account</button>
        </form>
    </section>
    `
}